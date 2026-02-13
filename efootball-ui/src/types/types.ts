// Saison Types 
export interface Saison {
    name: string;
    saisonStartDate: string;
    status: string;
    id: number;
    _links: {
        self: { href: string };
        saison: { href: string };
        tournaments: { href: string };
    };
}

export interface SaisonResponse {
    _embedded: {
        saisons: Saison[];
    };
    _links: {
        self: { href: string };
        profile: { href: string };
    };
}

// Tournament Types
export interface Tournament{
    name: string;
    maxsTeams: number;
    playersPerTeam: number;
    tournamentStartDate: string | null;
    status: string | null;
    tourneyType: string ; 
    saison?: string;
    id: number;
    _links: {
        self: { href: string };
        tournament: { href: string };
        teams: { href: string };
        saison: { href: string };
    };
}
export interface TournamentResponse {
    _embedded: {
        tournaments: Tournament[];
    };
    _links: {
        self: { href: string };
    };
}

// Team Types
export interface Team{
    id: number;
    name: string;
    capacite: number;
    tourney?: string;
      "_links": {
                    self: { href: string};
                    team: { href: string};
                    registrations: { href: string};
                    tourney: { href: string};
                    awaymatches: { href: string};
                    homematches: { href: string};
                    },
                  
                
}

export interface TournamentTeamsResponse {
    "_embedded": {
        "teams": Team[];
    };
    "_links": {
        "self": {
            "href": string;
        };
    };
}


    