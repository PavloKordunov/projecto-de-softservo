package com.proj.forum.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Data
@Builder
@Table(name = "statistics")
@NoArgsConstructor
@AllArgsConstructor
public class Statistic {

    @Id
    @GeneratedValue
    private UUID id;

    @NotNull
    private UUID userId;

    @NotNull
    private UUID objectId;

    @Min(0)
    @Max(5)
    private Short rate;

    private Boolean liked;

    private Boolean saved;
}
