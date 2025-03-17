package com.proj.forum.h2.model;

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
@Table(name = "Calendar")
public class Calendar {
    @Id
    @GeneratedValue
    private UUID id;

    private String content;
}

//Query to create entity
//create table CALENDAR
//        (
//                ID      UUID not null
//                        primary key,
//                CONTENT CHARACTER VARYING(255)
//);
