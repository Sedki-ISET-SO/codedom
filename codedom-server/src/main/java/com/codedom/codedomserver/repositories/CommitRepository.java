package com.codedom.codedomserver.repositories;

import com.codedom.codedomserver.models.Commit;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommitRepository extends JpaRepository<Commit, Long> {

    Page<Commit> findByRepositoryId(Long repositoryId, Pageable pageable);
}
