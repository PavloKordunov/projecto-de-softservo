package com.proj.forum.h2.repository;

import com.proj.forum.h2.model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface MovieRepository extends JpaRepository<Movie, UUID> {
    List<Movie> findByReleaseDateBetweenAndLanguageContaining(String releaseDateAfter, String releaseDateBefore, String language);
}
