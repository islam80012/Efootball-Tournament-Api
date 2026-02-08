package com.example.efootball.tourneys.manager.Repositories;

import com.example.efootball.tourneys.manager.Entities.Saison;
import org.springframework.data.repository.CrudRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
public interface SaisonRepo  extends CrudRepository<Saison,Long>{
    List<Saison> findAll();
}






