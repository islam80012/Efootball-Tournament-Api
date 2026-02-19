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
}
