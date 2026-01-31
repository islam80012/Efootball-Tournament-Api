package com.example.efootball.tourneys.manager.Repositories;

import org.springframework.data.repository.CrudRepository;
import com.example.efootball.tourneys.manager.Entities.Team;

import java.util.List;

public interface TeamRepo  extends CrudRepository<Team,Long> {
    List<Team> findAll();
}