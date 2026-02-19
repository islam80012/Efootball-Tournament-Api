import axios from 'axios';
import type{ SaisonResponse,Saison,TournamentResponse,Tournament, Team,Player}from '../types/types';

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
    // 1. Create the Player first
    const playerResponse = await axios.post('http://localhost:8080/api/players', player);
    
    // This is the link to the player we just made (e.g., http://localhost:8080/api/players/5)
    const playerUrl = playerResponse.data._links.self.href;

    // 2. Create the Registration and LINK them using URIs
    const registrationData = {
        role: role,
        // IMPORTANT: Spring Data REST uses these URIs to set the Foreign Keys
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


