package com.proj.forum.h2.repository;

import com.proj.forum.h2.model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface MovieRepository extends JpaRepository<Movie, UUID> {

    //@Query("SELECT DISTINCT m FROM Movie m WHERE m.releaseDate BETWEEN :startDate AND :endDate")
    //List<Movie> findDistinctByReleaseDateBetween(@Param("startDate") String startDate, @Param("endDate") String endDate);
    List<Movie> findByReleaseDateBetween(String startDate, String endDate);
}
