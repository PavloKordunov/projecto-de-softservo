package com.proj.forum.entity;


import com.proj.forum.enums.TopicType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.time.LocalDate;
import java.util.List;
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

    @ManyToMany
    @JoinTable(
            name = "tag_topic",
            joinColumns = @JoinColumn(name = "topic_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private List<Tag> tags;

    @Column(nullable = false)
    private UUID author_id;

    private UUID group_id;

    @Column(nullable = false)
    private String title;

    @Column(length = 500, nullable = false)
    private String description;

    @NotNull
    private TopicType type;

    //@NotNull
    private Integer viewCount;

    @Column(nullable = false)
    private String limitAge;

    @Column(nullable = false)
    private String country;

    @Column(nullable = false)
    private String duration;

    @Column(nullable = false)
    private String genre;

    @Column(nullable = false)
    private String IMDB;

    @Column(nullable = false)
    private String actor;

    @Column(nullable = false)
    private String director;

    @Column(nullable = false)
    private LocalDate releaseDate;

    @Lob
    @Column(nullable = false)
    private String image;

    @OneToMany(mappedBy = "topic")
    @OrderBy("createdAt DESC")
    private List<Comment> comments;

    private String trailerURL;
}
