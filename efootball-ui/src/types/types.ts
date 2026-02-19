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
    registrations?: Registration[];
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

//Player Types
export interface Player {
    id: number;
    discordname: string;
    pseudonyme: string;
    "_links": {
        self: { href: string };
        player: { href: string };
        registrations: { href: string };
        playerMatchStatsList: { href: string };
    };
}


export interface PlayerResponse {
    "_embedded": {
        "players": Player[];
    };
    "_links": {
        "self": {
            "href": string;
        };
        "profile": {
            "href": string;
        };
    };
}

// Registration Types
export interface Registration {
    id: number;
    role: 'CAPTAIN' | 'MEMBER';
    player?: Player;
    _links: {   
        self: { href: string };
        registration: { href: string };
        player: { href: string };
        team: { href: string };
    };
}



export interface RegistrationResponse {
    "_embedded": {
        "registrations": Registration[];
    };
    "_links": {
        "self": {
            "href": string;
        };
    };
}


    