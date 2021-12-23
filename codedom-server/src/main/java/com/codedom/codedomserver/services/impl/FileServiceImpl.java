package com.codedom.codedomserver.services.impl;

import com.codedom.codedomserver.exceptions.FileException;
import com.codedom.codedomserver.exceptions.FileResponse;
import com.codedom.codedomserver.models.File;
import com.codedom.codedomserver.properties.FileProperties;
import com.codedom.codedomserver.repositories.CommitRepository;
import com.codedom.codedomserver.repositories.FileRepository;
import com.codedom.codedomserver.services.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Objects;
import java.util.stream.Stream;

@Service
public class FileServiceImpl implements FileService {

    @Autowired
    private FileRepository fileRepository;

    @Autowired
    private CommitRepository commitRepository;

    private final Path rootLocation;

    public FileServiceImpl(FileProperties fileProperties) {
        this.rootLocation = Paths.get(fileProperties.getLocation());    }

    @Override
    public void init() {
        try {
            Files.createDirectory(rootLocation);
        } catch (IOException e) {
            throw new FileException("Could not initialize file storage directory", e);
        }
    }

    public ResponseEntity<FileResponse> uploadFiles(MultipartFile[] files, Long commitId) {
        try {
            for (MultipartFile file : files) {
                try {
                    Files.copy(file.getInputStream(),
                            this.rootLocation.resolve(Objects.requireNonNull(file.getOriginalFilename())));
                } catch (IOException e) {
                    throw new FileException("Failed to store file " + file.getOriginalFilename(), e);
                }
                File fileEntity = new File();
                fileEntity.setName(file.getOriginalFilename());
                fileEntity.setPath(this.rootLocation.resolve(Objects.requireNonNull(file.getOriginalFilename())).toString());
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
    public Stream<Path> getAllFilesPaths() {
        return null;
    }

    @Override
    public Path loadFilePathByName(String filename) {
        return null;
    }

    @Override
    public Resource loadAsResource(String filename) {
        return null;
    }

    @Override
    public void deleteAll() {
        FileSystemUtils.deleteRecursively(rootLocation.toFile());
    }
}
