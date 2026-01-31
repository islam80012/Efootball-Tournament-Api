package com.example.efootball.tourneys.manager.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@AllArgsConstructor @NoArgsConstructor @Setter @Getter
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private int Capacite;
    // Associations 1 : many Teams to one  Tournament
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="tourney_id")
    private Tournament tourney;

    // Associations 2 many Teams to one Registration
    @OneToMany(cascade=CascadeType.ALL, mappedBy="team" , fetch=FetchType.EAGER)
    private List<Registration> registrations;

    // Association 3 one Team to many Matches X 2 (home & away)
     @OneToMany(cascade=CascadeType.ALL, mappedBy="hometeam" , fetch=FetchType.LAZY)
      private List<Match> homematches;

     @OneToMany(cascade=CascadeType.ALL, mappedBy="awayteam" , fetch=FetchType.LAZY)
      private List<Match> awaymatches;

}
