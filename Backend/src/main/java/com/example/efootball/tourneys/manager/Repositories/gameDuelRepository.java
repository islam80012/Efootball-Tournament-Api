package com.example.efootball.tourneys.manager.Repositories;
import com.example.efootball.tourneys.manager.Entities.GameDuel;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface gameDuelRepository extends CrudRepository<GameDuel,Long>{
    List<GameDuel> findByMatchId(@Param("id") Long id);
}
