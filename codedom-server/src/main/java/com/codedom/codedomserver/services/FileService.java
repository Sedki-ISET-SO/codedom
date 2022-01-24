package com.codedom.codedomserver.services;

import com.codedom.codedomserver.exceptions.FileResponse;
import com.codedom.codedomserver.models.File;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.util.Optional;
import java.util.stream.Stream;

public interface FileService {

    ResponseEntity<FileResponse> uploadFiles(MultipartFile[] files, Long commitId);

    Optional<File> getFileById(Long fileId);

    Page<String> getFilesByCommitId(Long commitId, Pageable pageable);

    Page<String> getFilesOfLastAddedCommit(Long repositoryId, Pageable pageable);

    void init();

    Stream<Path> loadAll();

    Path load(String filename);

    Resource loadAsResource(String filename);

    void deleteAll();
}
