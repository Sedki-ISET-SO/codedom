package com.codedom.codedomserver.services.impl;

import com.codedom.codedomserver.models.Commit;
import com.codedom.codedomserver.repositories.CommitRepository;
import com.codedom.codedomserver.repositories.RepositoryRepository;
import com.codedom.codedomserver.services.CommitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CommitServiceImpl implements CommitService {

    @Autowired
    private CommitRepository commitRepository;

    @Autowired
    private RepositoryRepository repositoryRepository;

    public Optional<Commit> createNewCommit(Commit commit, Long repositoryId) {
        return repositoryRepository.findById(repositoryId).map(repo -> {
            commit.setRepository(repo);
            return commitRepository.save(commit);
        });
    }

    @Override
    public Optional<Commit> getCommitById(Long commitId) {
        return commitRepository.findById(commitId);
    }

    @Override
    public Page<Commit> getAllCommits(Pageable pageable) {
        return commitRepository.findAll(pageable);
    }
}
