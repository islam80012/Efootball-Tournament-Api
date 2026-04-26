package com.example.efootball.tourneys.manager.Listeners;

import  com.example.efootball.tourneys.manager.Entities.Match;
import com.example.efootball.tourneys.manager.Services.MatchService;
import lombok.AllArgsConstructor;
import org.springframework.data.rest.core.annotation.HandleAfterCreate;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.stereotype.Component;

@Component
@RepositoryEventHandler(Match.class)
@AllArgsConstructor
public class MatchEventHandler {

    private final MatchService matchService;

    @HandleAfterCreate // Se déclenche juste APRES l'insertion du Match

    public void handleMatchAfterCreate(Match match) {
        System.out.println("Nouveau match détecté, génération des duels...");
        matchService.generateInitialDuels(match);
    }
}