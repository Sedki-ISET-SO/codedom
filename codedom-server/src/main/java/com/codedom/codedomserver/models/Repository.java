package com.codedom.codedomserver.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
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

    @NotEmpty(message = "Name may not be empty")
    @NotNull
    @NotBlank
    @Size(min = 2, max = 32, message = "Name must be between 3 and 19 characters long")
    @Column(nullable = false)
    private String name;

    private String description;

    @NotBlank(message = "repo visibility preference must not be empty")
    @NotNull
    @Column(nullable = false)
    private Boolean is_visible;

    private Float repositorySize;

    private Long downloadsNumber;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "repository")
    @JsonIgnore
    private Set<Commit> commits = new HashSet<>();
}
