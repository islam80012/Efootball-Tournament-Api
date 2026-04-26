package com.example.efootball.tourneys.manager.Entities;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@AllArgsConstructor @NoArgsConstructor @Setter @Getter
public class Player {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String discordname,pseudonyme;


   // Association 1  :one Player to many Registration
    @OneToMany (cascade=CascadeType.ALL, mappedBy="player" , fetch=FetchType.LAZY)
    private List<Registration> registrations ;

    // Association 2 :one Player to many PlayerMatchStats
    @OneToMany (cascade=CascadeType.ALL, mappedBy="player" , fetch=FetchType.LAZY)
    private List<PlayerMatchStats> playerMatchStatsList;

    //Association 3 :  one player (home team member ) to many gameduels
    @OneToMany (cascade=CascadeType.ALL, mappedBy="playerHome" , fetch=FetchType.LAZY)
    private List<GameDuel> homeGameDuels;

    //Association 4 :  one player (away team member ) to many gameduels
    @OneToMany (cascade=CascadeType.ALL, mappedBy="playerAway" , fetch=FetchType.LAZY)
    private List<GameDuel> awayGameDuels;
}
