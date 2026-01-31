package com.example.efootball.tourneys.manager;

import com.example.efootball.tourneys.manager.Entities.*;
import com.example.efootball.tourneys.manager.Repositories.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@SpringBootApplication
@RequiredArgsConstructor // Cleaner way to inject final repositories
public class EffootballTourneyManagementApplication implements CommandLineRunner {

	private static final Logger logger = LoggerFactory.getLogger(EffootballTourneyManagementApplication.class);

	private final PlayerRepo playerRepo;
	private final TeamRepo teamRepo;
	private final TournamentRepo tournamentRepo;
	private final RegistrationRepo registrationRepo;
	private final MatchRepo matchRepo;
	private final PlayerMatchStatsRepo statsRepo;

	public static void main(String[] args) {
		SpringApplication.run(EffootballTourneyManagementApplication.class, args);
	}

	@Override
	@Transactional
	public void run(String... args) throws Exception {
		if (tournamentRepo.count() > 0) {
			logger.info("Database already populated. Skipping initialization.");
			return;
		}
		logger.info("--- Starting Database Initialization ---");

		// 1. Create Tournament
		Tournament worldCup = new Tournament();
		worldCup.setName("eFootball World Cup 2026");
		worldCup.setTeams(new ArrayList<>()); // Ensure it's not null
		tournamentRepo.save(worldCup);

		// 2. Create Teams and MANUALLY add to the tournament list
		Team teamA = new Team(null, "FC Barcelona", 11, worldCup, new ArrayList<>(), new ArrayList<>(), new ArrayList<>());
		Team teamB = new Team(null, "Real Madrid", 11, worldCup, new ArrayList<>(), new ArrayList<>(), new ArrayList<>());

		// This part is crucial for the in-memory check to work!
		worldCup.getTeams().add(teamA);
		worldCup.getTeams().add(teamB);

		teamRepo.saveAll(List.of(teamA, teamB));

		// 3. Verification
		logger.info("--- Fetching Tournament Data ---");
		tournamentRepo.findById(worldCup.getId()).ifPresent(t -> {
			logger.info("Tournament: {}", t.getName());
			// Now t.getTeams() won't be null
			if (t.getTeams() != null) {
				logger.info("Number of teams enrolled: {}", t.getTeams().size());
				t.getTeams().forEach(team -> logger.info("Enrolled Team: {}", team.getName()));
			}
		});
	}
}