package com.codedom.codedomserver.repositories;

import com.codedom.codedomserver.models.File;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface FileRepository extends JpaRepository<File, Long> {

    @Query("SELECT f.name, f.path, f.size FROM File f where f.commit.id = :commitId")
    Page<String> findFilesPathsById(@Param("commitId") Long commitId, Pageable pageable);

    @Query("SELECT f.size FROM File f where f.commit.id = :commitId")
    Page<Float> findFilesSizesById(@Param("commitId") Long commitId, Pageable pageable);
}
