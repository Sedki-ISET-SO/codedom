package com.codedom.codedomserver.controllers;

import com.codedom.codedomserver.models.Commit;
import com.codedom.codedomserver.services.CommitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:3000/")
public class CommitController {

    @Autowired
    private CommitService commitService;

    @GetMapping("/commits")
    public Page<Commit> getAllCommits(Pageable pageable) {
        return commitService.getAllCommits(pageable);
    }

    @PostMapping("/commit/{repositoryId}")
    public Optional<Commit> createNewCommit(@Valid @RequestBody Commit commit,
                                            @PathVariable(value = "repositoryId") Long repositoryId) {
        return commitService.createNewCommit(commit, repositoryId);
    }

    @GetMapping("/commit/{commitId}")
    public Optional<Commit> getCommitById(@PathVariable(value = "commitId") Long commitId) {
        return commitService.getCommitById(commitId);
    }

    @GetMapping("/commit/newest/{repositoryId}")
    public Long getLastAddedCommitByRepositoryId(@PathVariable(value = "repositoryId") Long repositoryId) {
        return commitService.findCommitIdByRepositoryId(repositoryId);
    }
}
