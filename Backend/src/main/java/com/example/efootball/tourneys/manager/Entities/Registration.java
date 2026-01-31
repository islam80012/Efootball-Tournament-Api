package com.example.efootball.tourneys.manager.Entities;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor @Setter @Getter
public class Registration {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private AppEnum.Role role;

    //Asscociation 1 : many Registration to one team
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="team_id")
    @JsonIgnore
    private Team team;

    // Association 2 : many registration to one player
    @ManyToOne
    @JoinColumn (name="player_id")
    @JsonIgnore
    private Player player;

}
