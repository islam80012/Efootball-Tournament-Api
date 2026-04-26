package com.example.efootball.tourneys.manager.Entities;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;
import java.util.List;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class GameDuel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    //Association 1 :  many matches to one gameduel
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "match_id")
    private Match match;

    //Association 2 :  many players (home team members ) to one gameduel
    @ManyToOne
    @JoinColumn(name = "player_home_id")
    private Player playerHome;

    //Association 3 :  many players (away team members ) to one gameduel
    @ManyToOne
    @JoinColumn(name = "player_away_id")
    private Player playerAway;

    private int scoreHome;
    private int scoreAway;


    private boolean isCaptainDuel;
}
