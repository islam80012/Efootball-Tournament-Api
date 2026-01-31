package com.example.efootball.tourneys.manager.Entities;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@AllArgsConstructor @NoArgsConstructor @Setter @Getter
public class Tournament {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name ;
    private int maxsTeams, playersPerTeam;
    private Date startDate;
    @Enumerated(EnumType.STRING)
    private AppEnum.Status status;

    // Association 1 : one Tourney to many teams
    @OneToMany(cascade=CascadeType.ALL, mappedBy="tourney" , fetch=FetchType.EAGER)
    @JsonIgnore
    private List<Team> teams= new ArrayList<>();

}
