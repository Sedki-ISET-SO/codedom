package com.codedom.codedomserver.controllers;

import com.codedom.codedomserver.exceptions.FileResponse;
import com.codedom.codedomserver.services.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:3000/")
public class FileController {

    @Autowired
    private FileService fileService;

    @PostMapping("/file/{commitId}")
    public ResponseEntity<FileResponse> createNewCommit(@RequestParam("files") MultipartFile[] files,
                                                        @PathVariable (value = "commitId") Long commitId) {
        return fileService.uploadFiles(files, commitId);
    }
}
