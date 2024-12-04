package com.proj.forum.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
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

//    @ManyToOne
//    private User author;
    private String title;
    private String description;

//    @ManyToMany
//    @JoinTable(
//            name = "topic_tag",
//            joinColumns = @JoinColumn(name = "topic_id"),
//            inverseJoinColumns = @JoinColumn(name = "tag_id")
//    )
//    private List<Tag> tags;
    private String image;
}
