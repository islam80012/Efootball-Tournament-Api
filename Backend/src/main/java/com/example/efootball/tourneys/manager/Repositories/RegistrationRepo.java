package com.example.efootball.tourneys.manager.Repositories;

import com.example.efootball.tourneys.manager.Entities.Player;
import com.example.efootball.tourneys.manager.Entities.Registration;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface RegistrationRepo extends CrudRepository<Registration,Long> {
    List<Registration> findAll();
}
