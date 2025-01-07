package com.proj.forum.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Table(name ="topics")
public class Topic {
    @Id
    @GeneratedValue
    private UUID id;

    private UUID tag_id;

    @ManyToOne
    @JoinColumn(name = "author_id") // Specifies the foreign key column
    private User author;

    @Column(nullable = false)
    private String title;

    @Column(length = 500)
    private String description;

    @Column
    private Integer limitAge;

    private String country;

    private String duration;

    private String genre;

    private String IMBD;

    private String actor;

    private String director;

    private String image;
}
