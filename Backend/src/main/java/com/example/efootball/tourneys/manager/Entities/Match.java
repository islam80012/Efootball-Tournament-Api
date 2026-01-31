package com.example.efootball.tourneys.manager.Entities;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Entity
@AllArgsConstructor @NoArgsConstructor @Setter  @Getter
public class Match {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Date matchDate;
    private int scoreHome, scoreAway;

    // Association 1 Many matches to one team  X 2 (home & away)
    @ManyToOne(fetch=FetchType.EAGER)
    @JoinColumn(name="hometeam_id")
    @JsonIgnore
    private Team hometeam;

    @ManyToOne(fetch=FetchType.EAGER)
    @JoinColumn(name="awayteam_id")
    @JsonIgnore
    private Team awayteam;

    // Association 2  one Match	to many PlayerMatchStat
    @OneToMany(cascade=CascadeType.ALL, mappedBy="match" , fetch=FetchType.LAZY)
    private List<PlayerMatchStats> playerMatchStatsList;
}
