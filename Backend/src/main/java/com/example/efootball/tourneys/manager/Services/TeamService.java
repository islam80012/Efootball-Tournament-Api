package com.example.efootball.tourneys.manager.Services;

import com.example.efootball.tourneys.manager.Entities.Team;
import com.example.efootball.tourneys.manager.Repositories.TeamRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class TeamService {

    private final TeamRepo teamRepo;

    public Iterable<Team> getAllTeams() {
        return teamRepo.findAll();
    }
}