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
import java.util.List;
import java.time.LocalDate;


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
	private final SaisonRepo saisonRepo ;

	public static void main(String[] args) {
		SpringApplication.run(EffootballTourneyManagementApplication.class, args);
	}


	@Override
	@Transactional
	public void run(String... args) throws Exception {
		if (saisonRepo.count() > 0 ) {
			logger.info("Database already populated. Skipping initialization.");
			return;
		}
		logger.info("--- Starting Database Initialization ---");
		//1. Create Saison
		Saison saison1 = new Saison();
		saison1.setName("Saison Number one ");
		saison1.setSaisonStartDate(LocalDate.now());
		saison1.setStatus(AppEnum.Status.OPEN);
		saisonRepo.save(saison1);

		// 2. Create Tournament
		Tournament worldCup = new Tournament();
		worldCup.setName("eFootball World Cup 2026");
		worldCup.setTeams(new ArrayList<>());
		worldCup.setSaison(saison1);
		worldCup.setMaxsTeams(20);
		worldCup.setPlayersPerTeam(3);
		worldCup.setTourneyType(AppEnum.tourneyType.LEAGUE);
		tournamentRepo.save(worldCup);

		// 3. Create Teams
		Team teamA = new Team(null, "FC Barcelona", 11, worldCup, new ArrayList<>(), new ArrayList<>(), new ArrayList<>());
		Team teamB = new Team(null, "Real Madrid", 11, worldCup, new ArrayList<>(), new ArrayList<>(), new ArrayList<>());

		worldCup.getTeams().add(teamA);
		worldCup.getTeams().add(teamB);

		teamRepo.saveAll(List.of(teamA, teamB));

		//4. Create Player
		Player player1 = new Player(null,"islam_0015","islamovic",new ArrayList<>(), new ArrayList<>());
		Player player2 = new Player(null,"wassimAch","messi",new ArrayList<>(), new ArrayList<>());

		//5. Adding the two players to registarions

		Registration worldCupRegistration1 = new Registration(null,AppEnum.Role.CAPTAIN,teamA,player1);
		Registration worldCupRegistration2 = new Registration(null,AppEnum.Role.MEMBER,teamA,player2);

		//6. adding the registrations to the specific players
		player1.getRegistrations().add(worldCupRegistration1);
		player2.getRegistrations().add(worldCupRegistration2);
		playerRepo.saveAll(List.of(player1, player2));


		registrationRepo.saveAll(List.of(worldCupRegistration1, worldCupRegistration2));

		//7. adding the registrations to the teamA
		teamA.getRegistrations().add(worldCupRegistration1);
		teamA.getRegistrations().add(worldCupRegistration2);




		// 8. Verification
		logger.info("--- Fetching Tournament Data ---");
		tournamentRepo.findById(worldCup.getId()).ifPresent(t -> {
			logger.info("Tournament: {}", t.getName());
			if (t.getTeams() != null) {
				logger.info("Number of teams enrolled: {}", t.getTeams().size());
				t.getTeams().forEach(team -> logger.info("Enrolled Team: {}", team.getName()));
				logger.info("Tournament: {} is part of {}", t.getName(), t.getSaison().getName());
			}
		});
	}
}