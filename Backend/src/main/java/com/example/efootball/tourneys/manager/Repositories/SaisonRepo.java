package com.example.efootball.tourneys.manager.Repositories;

import com.example.efootball.tourneys.manager.Entities.Saison;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface SaisonRepo  extends CrudRepository<Saison,Long>{
    List<Saison> findAll();
}






