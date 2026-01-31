package com.example.efootball.tourneys.manager.Controllers;
import com.example.efootball.tourneys.manager.Entities.Team;

import com.example.efootball.tourneys.manager.Repositories.TeamRepo;
import com.example.efootball.tourneys.manager.Services.TeamService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/teams")
@AllArgsConstructor
public class TeamController {

    private final TeamService teamService; // Talk to Service, not Repo

    @GetMapping
    public Iterable<Team> getTeams() {
        return teamService.getAllTeams();
    }
}
