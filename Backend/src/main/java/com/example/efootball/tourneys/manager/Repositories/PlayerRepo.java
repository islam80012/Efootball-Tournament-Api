package com.example.efootball.tourneys.manager.Repositories;

import com.example.efootball.tourneys.manager.Entities.Player;
import org.springframework.data.repository.CrudRepository;
import java.util.List;

public interface PlayerRepo  extends CrudRepository<Player,Long> {
    List<Player> findAll();
}
