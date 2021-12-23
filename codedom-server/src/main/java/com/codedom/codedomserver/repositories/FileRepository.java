package com.codedom.codedomserver.repositories;

import com.codedom.codedomserver.models.File;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FileRepository extends JpaRepository<File, Long> {

    Page<File> findByCommitId(Long commitId, Pageable pageable);
}
