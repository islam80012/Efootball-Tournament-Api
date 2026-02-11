import axios from 'axios';
import type{ SaisonResponse,Saison,TournamentResponse,Tournament } from '../types/types';

// Saison API functions
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

export const getTournamentsBySaisonId = async (saisonId:number ):Promise<TournamentResponse>=>{
    const response = await axios.get(`http://localhost:8080/api/saisons/${saisonId}/tournaments`);
    return response.data;
}

export const getTournamentByTournamentId = async (saisonId:number,tournamentID : number) : Promise <Tournament>=>{
    const response = await axios.get(`http://localhost:8080/api/saisons/${saisonId}/tournaments/${tournamentID}`);
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