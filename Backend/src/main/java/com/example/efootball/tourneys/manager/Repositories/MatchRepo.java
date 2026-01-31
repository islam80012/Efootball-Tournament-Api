package com.example.efootball.tourneys.manager.Repositories;

import com.example.efootball.tourneys.manager.Entities.Match;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface MatchRepo extends CrudRepository<Match,Long> {
    List<Match> findAll();
}
