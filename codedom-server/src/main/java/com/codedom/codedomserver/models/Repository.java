package com.codedom.codedomserver.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table
@Data
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Repository extends AuditModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "name must not be empty")
    @NotNull
    private String name;

    private String description;

    @NotBlank(message = "repo visibility preference must not be empty")
    @NotNull
    private boolean is_visible;

    private Float repositorySize;

    private Long downloadsNumber;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "repository")
    private Set<Commit> commits = new HashSet<>();
}
