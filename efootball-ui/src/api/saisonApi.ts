import axios from 'axios';
import type{ SaisonResponse,Saison,TournamentResponse,Tournament, Team,Player,Match}from '../types/types';

// ================ Saison API functions ================
export const getSaisons = async (): Promise<SaisonResponse> => {
    const response = await axios.get('http://localhost:8080/api/saisons');
    return response.data;
};

export const addSaison = async (newSaison: Omit<Saison, '_links'>): Promise<Saison> => {
    const response = await axios.post('http://localhost:8080/api/saisons', newSaison);
    return response.data;
};

export const getSaisonById = async (saisonId:number):Promise<Saison> => {
    const response = await axios.get(`http://localhost:8080/api/saisons/${saisonId}`);
    return response.data;
}

// ================ Tournament API functions ================

export const getTournamentsBySaisonId = async (saisonId:number ):Promise<TournamentResponse>=>{
    const response = await axios.get(`http://localhost:8080/api/saisons/${saisonId}/tournaments`);
    return response.data;
}

// export const getTournamentByTournamentId = async (saisonId:number,tournamentID : number) : Promise <Tournament>=>{
//     const response = await axios.get(`http://localhost:8080/api/saisons/${saisonId}/tournaments/${tournamentID}`);
//     return response.data;

// }
export const getTournamentByTournamentId = async (tournamentID : number) : Promise <Tournament>=>{
    const response = await axios.get(`http://localhost:8080/api/tournaments/${tournamentID}`);
    return response.data;
}

// export const addTournamentToSaison = async (saisonId:number,newTournament: Omit<Tournament, '_links'>):Promise<Tournament> => {
//     const response = await axios.post(`http://localhost:8080/api/saisons/${saisonId}/tournaments`, newTournament);
//     return response.data;
// }
export const addTournamentToSaison = async (newTournament: Omit<Tournament, '_links'>):Promise<Tournament> => {
    const response = await axios.post(`http://localhost:8080/api/tournaments`, newTournament);
    return response.data;
}

// ================ Teams API functions ================

export const getTeamsByTournamentId = async(tournamentId :number ) : Promise<Team[]> =>{
    const response = await axios.get(`http://localhost:8080/api/tournaments/${tournamentId}/teams`);
    return response.data._embedded ? response.data._embedded.teams : [];
}

export const addTeamToTournament = async (newTeam: Omit<Team, '_links'>): Promise<Team> => {
    const response = await axios.post(`http://localhost:8080/api/teams`, newTeam);
    return response.data;
}
export const getTeamById = async (teamId: number): Promise<Team> => {
    const response = await axios.get(`http://localhost:8080/api/teams/${teamId}`);
    return response.data;
}

// ================ Player API functions ================

export const getRegistrationsByTeam = async (teamId: number) => {
    const response = await axios.get(`http://localhost:8080/api/teams/${teamId}/registrations`);
    return response.data._embedded.registrations; 
};


export const fetchByLink = async (link: string) => {
    const response = await axios.get(link);
    return response.data;
};



export const addPlayerToTeam = async ({ player, teamId, role }: { 
    player: Omit<Player, 'id' | '_links'>, 
    teamId: string, 
    role: string 
}) => {
    const playerResponse = await axios.post('http://localhost:8080/api/players', player);
    const playerUrl = playerResponse.data._links.self.href;

    const registrationData = {
        role: role,
        player: playerUrl, 
        team: `http://localhost:8080/api/teams/${teamId}` 
    };

    return axios.post('http://localhost:8080/api/registrations', registrationData);
};

//=============== Registration API functions ================
 export const getTeamRegistrations = async (teamId: number) => {
    const response = await axios.get(`http://localhost:8080/api/teams/${teamId}/registrations`);
    return response.data._embedded.registrations; // This is the array
};

// ================ Match API functions ================
export const addMatches = async (matches: Match[]) => {
    const response = await axios.post('http://localhost:8080/api/matches', matches);
    return response.data;
}
export const createMatch = async (matchData: Omit<Match, 'id' | '_links'>) => {
    const response = await axios.post('http://localhost:8080/api/matches', matchData);
    return response.data;
}
export const getTeamAwayMatches = async (teamId: number) => {
    const response = await axios.get(`http://localhost:8080/api/teams/${teamId}/awaymatches`);
    return response.data._embedded.matches; 
}
export const getTeamHomeMatches = async (teamId: number) => {
    const response = await axios.get(`http://localhost:8080/api/teams/${teamId}/homematches`);
    return response.data._embedded.matches; 
}
export const updateMatchScore = async (matchId: number, scoreHome: number, scoreAway: number) => {
    const response = await axios.patch(`http://localhost:8080/api/matches/${matchId}`, {
        scoreHome,  
        scoreAway
    });
    return response.data;
}



