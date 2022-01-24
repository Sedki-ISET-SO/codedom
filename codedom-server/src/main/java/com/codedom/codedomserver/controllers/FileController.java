package com.codedom.codedomserver.controllers;

import com.codedom.codedomserver.exceptions.FileResponse;
import com.codedom.codedomserver.models.File;
import com.codedom.codedomserver.services.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:3000/")
public class FileController {

    @Autowired
    private FileService fileService;

    @Autowired
    public FileController(FileService storageService) {
        this.fileService = storageService;
    }

    @PostMapping(value = "/file/{commitId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
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

    @GetMapping("/files/load/getFiles")
    public List<String> listUploadedFiles() {

        return fileService.loadAll().map(
                path -> MvcUriComponentsBuilder.fromMethodName(FileController.class,
                        "serveFile", path.getFileName().toString()).build().toUri().toString())
                .collect(Collectors.toList());
    }

    @GetMapping("/files/load/{fileName:.+}")
    @ResponseBody
    public ResponseEntity<Resource> serveFile(@PathVariable String fileName) {

        Resource file = fileService.loadAsResource(fileName);
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; fileName=\"" + file.getFilename() + "\"").body(file);
    }

    FileService getFileService() {
        return fileService;
    }
}
