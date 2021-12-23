package com.codedom.codedomserver.repositories;

import com.codedom.codedomserver.models.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@org.springframework.stereotype.Repository
public interface RepositoryRepository extends JpaRepository<Repository, Long> {
}
