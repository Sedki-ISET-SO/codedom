package com.codedom.codedomserver.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Entity
@Table
@Data
public class File extends AuditModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "name must not be empty")
    @NotNull
    private String name;

    @NotBlank(message = "path must not be empty")
    @NotNull
    private String path;

    @NotBlank(message = "extension must not be empty")
    @NotNull
    private String extension;

    @NotBlank(message = "size must not be empty")
    @NotNull
    private Float size;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "commit_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Commit commit;
}
