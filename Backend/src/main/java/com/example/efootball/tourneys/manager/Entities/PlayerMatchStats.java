package com.example.efootball.tourneys.manager.Entities;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor @NoArgsConstructor @Setter @Getter
public class PlayerMatchStats {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private int goalsScored, assists, cleanSheet;

    // Association 1 :  many PlayerMatchStatone to one Match
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="match_id")
    private Match match;

    // Association 2 : many PlayerMatchStats to one Player
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="player_id")
    private Player player;
}
