package com.codedom.codedomserver.services.impl;

import com.codedom.codedomserver.exceptions.FileException;
import com.codedom.codedomserver.exceptions.FileNotFoundException;
import com.codedom.codedomserver.exceptions.FileResponse;
import com.codedom.codedomserver.models.Commit;
import com.codedom.codedomserver.models.File;
import com.codedom.codedomserver.properties.FileProperties;
import com.codedom.codedomserver.repositories.CommitRepository;
import com.codedom.codedomserver.repositories.FileRepository;
import com.codedom.codedomserver.repositories.RepositoryRepository;
import com.codedom.codedomserver.services.CommitService;
import com.codedom.codedomserver.services.FileService;
import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Stream;

@Service
public class FileServiceImpl implements FileService {

    @Autowired
    private FileRepository fileRepository;

    @Autowired
    private CommitRepository commitRepository;

    @Autowired
    private RepositoryRepository repositoryRepository;

    @Autowired
    private CommitService commitService;

    private final Path rootLocation;

    @Autowired
    public FileServiceImpl(FileProperties properties) {
        this.rootLocation = Paths.get(properties.getLocation());
    }

    public ResponseEntity<FileResponse> uploadFiles(MultipartFile[] files, Long commitId) {
        try {
            String commitFootPrint = commitRepository
                    .findById(commitId)
                    .map((Function<Commit, Object>) Commit::getFootPrint)
                    .toString()
                    .replace("Optional", "")
                    .replace("[", "")
                    .replace("]", "");
            Path commitFilesPath = Paths.get(String.format("%s", commitFootPrint));
            Files.createDirectories(commitFilesPath);

            if (!(isEmpty(this.rootLocation)))
                FileUtils.cleanDirectory(this.rootLocation.toFile());

            for (MultipartFile file : files) {
                try {
                    Files.copy(file.getInputStream(),
                            commitFilesPath.resolve(Objects.requireNonNull(file.getOriginalFilename())));

                    Files.copy(file.getInputStream(), this.rootLocation.resolve(file.getOriginalFilename()));
                } catch (IOException e) {
                    throw new FileException("Failed to store file " + file.getOriginalFilename(), e);
                }
                File fileEntity = new File();
                fileEntity.setName(file.getOriginalFilename());
                fileEntity.setPath(commitFilesPath.resolve(Objects.requireNonNull(file.getOriginalFilename())).toString());
                fileEntity.setSize(((float) file.getSize()));
                fileEntity.setExtension(file.getContentType());

                commitRepository.findById(commitId).map(commit -> {
                    fileEntity.setCommit(commit);
                    return fileRepository.save(fileEntity);
                });
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED)
                    .body(new FileResponse("Exception occurred while upload files!"));
        }
        return ResponseEntity.status(HttpStatus.OK)
                .body(new FileResponse("Commit was pushed successfully!"));
    }

    @Override
    public Optional<File> getFileById(Long fileId) {
        return fileRepository.findById(fileId);
    }

    @Override
    public Page<String> getFilesByCommitId(Long commitId, Pageable pageable) {
        return fileRepository.findFilesPathsById(commitId, pageable);
    }

    @Override
    public Page<String> getFilesOfLastAddedCommit(Long repositoryId, Pageable pageable) {
        Long commitId = commitService.findCommitIdByRepositoryId(repositoryId);
        return fileRepository.findFilesPathsById(commitId, pageable);
    }

    @Override
    public Stream<Path> loadAll() {
        try {
            return Files.walk(this.rootLocation, 1)
                    .filter(path -> !path.equals(this.rootLocation))
                    .map(this.rootLocation::relativize);
        } catch (IOException e) {
            throw new FileException("Failed to read stored files", e);
        }
    }

    @Override
    public Path load(String fileName) {
        return rootLocation.resolve(fileName);
    }

    @Override
    public Resource loadAsResource(String fileName) {
        try {
            Path cvFile = load(fileName);
            Resource resource = new UrlResource(cvFile.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new FileNotFoundException("Could not read file: " + fileName);

            }
        } catch (MalformedURLException e) {
            throw new FileNotFoundException("Could not read file: " + fileName, e);
        }
    }

    @Override
    public void deleteAll() {
        FileSystemUtils.deleteRecursively(rootLocation.toFile());
    }

    @Override
    public void init() {
        try {
            Files.createDirectory(rootLocation);
        } catch (IOException e) {
            throw new FileException("Could not initialize storage", e);
        }
    }

    public boolean isEmpty(Path path) throws IOException {
        if (Files.isDirectory(path)) {
            try (DirectoryStream<Path> directory = Files.newDirectoryStream(path)) {
                return !directory.iterator().hasNext();
            }
        }

        return false;
    }
}
