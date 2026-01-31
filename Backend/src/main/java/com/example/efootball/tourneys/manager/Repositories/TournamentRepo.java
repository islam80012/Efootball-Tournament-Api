package com.example.efootball.tourneys.manager.Repositories;

import com.example.efootball.tourneys.manager.Entities.Tournament;
import org.springframework.data.repository.CrudRepository;


import java.util.List;

public interface TournamentRepo extends CrudRepository<Tournament,Long> {
    List<Tournament> findAll();
}
