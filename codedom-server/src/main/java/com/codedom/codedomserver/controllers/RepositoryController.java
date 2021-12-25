package com.codedom.codedomserver.controllers;

import com.codedom.codedomserver.models.Repository;
import com.codedom.codedomserver.services.RepositoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:3000/")
public class RepositoryController {

    @Autowired
    private RepositoryService repositoryService;

    @GetMapping("/repos")
    public Page<Repository> getAllRepositories(Pageable pageable) {
        return repositoryService.getAllRepositories(pageable);
    }

    @PostMapping("/repo")
    public Repository createNewRepository(@Valid @RequestBody Repository repo) {
        return repositoryService.createNewRepository(repo);
    }

    @GetMapping("/repo/{repositoryId}")
    public Optional<Repository> getRepositoryById(@PathVariable(value = "repositoryId") Long repositoryId) {
        return repositoryService.getRepositoryById(repositoryId);
    }

    @PutMapping("/repo/{repositoryId}")
    public Optional<Repository> updateRepositorySize(@PathVariable Long repositoryId,
                                                     @Valid @RequestBody Repository repositoryRequest) {
        return repositoryService.updateRepositorySize(repositoryId, repositoryRequest);
    }
}
