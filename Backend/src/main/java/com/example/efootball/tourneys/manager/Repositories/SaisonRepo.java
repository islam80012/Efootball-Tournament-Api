package com.example.efootball.tourneys.manager.Repositories;

import com.example.efootball.tourneys.manager.Entities.Saison;
import org.springframework.data.repository.CrudRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;


public interface SaisonRepo  extends CrudRepository<Saison,Long>{
    List<Saison> findAll();
}






