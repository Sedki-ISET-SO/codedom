package com.codedom.codedomserver.services;

import com.codedom.codedomserver.models.Commit;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface CommitService {

    Optional<Commit> createNewCommit(Commit commit, Long repositoryId);

    Optional<Commit> getCommitById(Long commitId);

    Page<Commit> getAllCommits(Pageable pageable);
}
