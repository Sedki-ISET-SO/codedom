package com.codedom.codedomserver.services;

import java.nio.file.Path;
import java.util.stream.Stream;

import com.codedom.codedomserver.exceptions.FileResponse;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface FileService {

    void init();

    ResponseEntity<FileResponse> uploadFiles(MultipartFile[] files, Long commitId);

    Stream<Path> getAllFilesPaths();

    Path loadFilePathByName(String filename);

    Resource loadAsResource(String filename);

    void deleteAll();
}
