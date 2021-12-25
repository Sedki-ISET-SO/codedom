package com.codedom.codedomserver.services.impl;

import com.codedom.codedomserver.models.Repository;
import com.codedom.codedomserver.repositories.RepositoryRepository;
import com.codedom.codedomserver.services.RepositoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RepositoryServiceImpl implements RepositoryService {

    @Autowired
    private RepositoryRepository repositoryRepository;

    @Override
    public Repository createNewRepository(Repository repository) {
        return repositoryRepository.save(repository);
    }

    @Override
    public Optional<Repository> getRepositoryById(Long repositoryId) {
        return repositoryRepository.findById(repositoryId);
    }

    @Override
    public Page<Repository> getAllRepositories(Pageable pageable) {
        return repositoryRepository.findAll(pageable);
    }

    @Override
    public Optional<Repository> updateRepositorySize(Long repositoryId, Repository repositoryRequest) {
        return repositoryRepository.findById(repositoryId).map(repository -> {
            repository.setRepositorySize(repositoryRequest.getRepositorySize());
            return repositoryRepository.save(repository);
        });
    }
}
