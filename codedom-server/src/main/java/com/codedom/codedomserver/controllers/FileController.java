package com.codedom.codedomserver.controllers;

import com.codedom.codedomserver.exceptions.FileResponse;
import com.codedom.codedomserver.models.File;
import com.codedom.codedomserver.services.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:3000/")
public class FileController {

    @Autowired
    private FileService fileService;

    @PostMapping("/file/{commitId}")
    public ResponseEntity<FileResponse> createNewCommit(@RequestParam("files") MultipartFile[] files,
                                                        @PathVariable(value = "commitId") Long commitId) {
        return fileService.uploadFiles(files, commitId);
    }

    @GetMapping("/file/{fileId}")
    public Optional<File> getFileById(@PathVariable(value = "fileId") Long fileId) {
        return fileService.getFileById(fileId);
    }

    @GetMapping("/files/{commitId}")
    public Page<String> getFilesByCommitId(@PathVariable (value = "commitId") Long commitId, Pageable pageable) {
        return fileService.getFilesByCommitId(commitId, pageable);
    }

    @GetMapping("/files/newest/{repositoryId}")
    public Page<String> getFilesOfLastAddedCommit(@PathVariable (value = "repositoryId") Long repositoryId, Pageable pageable) {
        return fileService.getFilesOfLastAddedCommit(repositoryId, pageable);
    }
}
