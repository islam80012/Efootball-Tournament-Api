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
@AllArgsConstructor @NoArgsConstructor @Setter  @Getter
public class Saison {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private Date saisonStartDate;
    @Enumerated(EnumType.STRING)
    private AppEnum.Status status;

    //Association 1: one saison to many tournaments
    @OneToMany(cascade=CascadeType.ALL, mappedBy="saison" , fetch=FetchType.EAGER)
    @JsonIgnore
    private List<Tournament> tournaments = new ArrayList<>();

}
