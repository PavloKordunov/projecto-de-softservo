package com.proj.forum.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Table(name = "privacy_policy")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PrivacyPolicy {

    @Id
    @GeneratedValue
    private UUID id;

    @NotEmpty
    private String version;

    @Lob
    @NotEmpty
    private String privacyContent;

}
