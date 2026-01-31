package com.example.efootball.tourneys.manager.Repositories;

import com.example.efootball.tourneys.manager.Entities.Player;
import com.example.efootball.tourneys.manager.Entities.PlayerMatchStats;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PlayerMatchStatsRepo extends CrudRepository<PlayerMatchStats,Long> {
    List<PlayerMatchStats> findAll();
}
