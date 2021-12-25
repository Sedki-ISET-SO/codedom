package com.codedom.codedomserver.services;

import com.codedom.codedomserver.models.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface RepositoryService {

    Repository createNewRepository(Repository repository);

    Optional<Repository> getRepositoryById(Long repositoryId);

    Page<Repository> getAllRepositories(Pageable pageable);

    Optional<Repository> updateRepositorySize(Long repositoryId, Repository repositoryRequest);
}
