import axios from 'axios';
import type{ SaisonResponse,Saison } from '../types/types';


export const getSaisons = async (): Promise<SaisonResponse> => {
    const response = await axios.get('http://localhost:8080/api/saisons');
    return response.data;
};

export const addSaison = async (newSaison: Omit<Saison, '_links'>): Promise<Saison> => {
    const response = await axios.post('http://localhost:8080/api/saisons', newSaison);
    return response.data;
};
