package com.codedom.codedomserver.services.impl;

import com.codedom.codedomserver.exceptions.FileException;
import com.codedom.codedomserver.exceptions.FileResponse;
import com.codedom.codedomserver.models.Commit;
import com.codedom.codedomserver.models.File;
import com.codedom.codedomserver.repositories.CommitRepository;
import com.codedom.codedomserver.repositories.FileRepository;
import com.codedom.codedomserver.repositories.RepositoryRepository;
import com.codedom.codedomserver.services.CommitService;
import com.codedom.codedomserver.services.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.function.Function;

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

            for (MultipartFile file : files) {
                try {
                    Files.copy(file.getInputStream(),
                            commitFilesPath.resolve(Objects.requireNonNull(file.getOriginalFilename())));
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
}
