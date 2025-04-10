package com.proj.forum.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Table(name="tags")
public class Tag {

    @Id
    @GeneratedValue
    private UUID id;

    @ManyToMany(mappedBy = "tags")
    private List<Post> posts;

    @ManyToMany(mappedBy = "tags")
    private List<Topic> topics;

    @ManyToMany(mappedBy = "tags")
    private List<Topic> groups;

    @Column(unique = true, nullable = false)
    private String name;
}
