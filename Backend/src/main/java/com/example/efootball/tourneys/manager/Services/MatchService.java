package com.example.efootball.tourneys.manager.Services;

import com.example.efootball.tourneys.manager.Entities.*;
import com.example.efootball.tourneys.manager.Repositories.gameDuelRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;


import java.util.List;

@AllArgsConstructor
@Service
public class MatchService {

    private final gameDuelRepository gameDuelRepository;

    public void generateInitialDuels(Match match) {

        List<Registration> homeListReg = match.getHometeam().getRegistrations();
        List<Registration> awayListReg = match.getAwayteam().getRegistrations();

        Player capHome = homeListReg.stream()
                .filter(r -> r.getRole().equals(AppEnum.Role.CAPTAIN))
                .map(Registration::getPlayer).findFirst().orElse(null);

        Player capAway = awayListReg.stream()
                .filter(r -> r.getRole().equals(AppEnum.Role.CAPTAIN))
                .map(Registration::getPlayer).findFirst().orElse(null);

        // Créer le duel des capitaines
        if (capHome != null && capAway != null) {
            gameDuelRepository.save(new GameDuel(null, match, capHome, capAway, 0, 0, true));
        }

        // Extraire les membres (ceux qui ne sont pas capitaines)
        List<Player> membersHome = homeListReg.stream()
                .filter(r -> !r.getRole().equals(AppEnum.Role.CAPTAIN))
                .map(Registration::getPlayer).toList();

        List<Player> membersAway = awayListReg.stream()
                .filter(r -> !r.getRole().equals(AppEnum.Role.CAPTAIN))
                .map(Registration::getPlayer).toList();


        // On utilise une boucle for classique car on doit avancer dans les deux listes en même temps
        int nbMembres = Math.min(membersHome.size(), membersAway.size());
        for (int i = 0; i < nbMembres; i++) {
            gameDuelRepository.save(new GameDuel(
                    null,
                    match,
                    membersHome.get(i),
                    membersAway.get(i),
                    0, 0, false
            ));
        }
    }
}
