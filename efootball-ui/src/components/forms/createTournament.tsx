import Button from '@mui/material/Button';
import  {Box,TextField}  from '@mui/material';
import {useNavigate,useParams} from 'react-router-dom';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addTournamentToSaison } from '../../api/saisonApi';
import type { Tournament } from '../../types/types';
import type { AxiosError } from 'axios';

import './tournamentForm.css';


export default function CreateTournmentForm() {
    
const navigate = useNavigate();

const [name, setName] = useState('');
const [teamsNumber, setTeamsNumber] = useState(0);
const [playersPerTeam, setPlayersPerTeam] = useState(0);
const [startDate, setStartDate] = useState('');
// saisonId
const { id } = useParams();

const queryClient = useQueryClient();
// define the mutation for adding a new tournament
const{mutate,isPending,isError,error} = useMutation({
   mutationFn: (newTournament: Omit<Tournament, '_links'>) => addTournamentToSaison(newTournament),
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['tourneys', id]});
        alert('Tournament created successfully!');
        navigate(`/saisonDetails/${id}`);
  }

});

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  mutate({
      name: name,
      maxsTeams: teamsNumber,
      playersPerTeam: playersPerTeam,
      tournamentStartDate: startDate,
      status: "OPEN",
      saison: `http://localhost:8080/api/saisons/${id}`
    } as Omit<Tournament, '_links'>
  );
};

    return (
        <Box component="form" className="tournament-form-box"  onSubmit={handleSubmit}>

            <TextField label="Tournament Name" type="text" fullWidth margin="normal" required value = {name} onChange= {(e) => setName(e.target.value)}
              error={isError} 
              helperText={isError ? "Please check this field" : ""}  />
            
            <TextField label="Number of Teams" type="number" fullWidth margin="normal" required value={teamsNumber} onChange={(e) => setTeamsNumber(Number(e.target.value))} 
              error={isError} 
              helperText={isError ? "Please check this field" : ""}  />
            <TextField label="players per team" type="number" fullWidth margin="normal" required value={playersPerTeam} onChange={(e) => setPlayersPerTeam(Number(e.target.value))} 
              error={isError} 
              helperText={isError ? "Please check this field" : ""}  />
          
            <TextField label="Start Date" type="date" fullWidth margin="normal"InputLabelProps={{ shrink: true }} value={startDate} onChange={(e) => setStartDate(e.target.value)} />
    

            <Button color="primary" type="submit" disabled={isPending}>
                    {isPending ? 'Saving...' : 'Create Tournament'}
            </Button>
             {isError && (
                          <p style={{ color: 'red', fontSize: '0.8rem', margin: '10px 0' }}>
                            Error: {(error as AxiosError<{message: string}>)?.response?.data?.message || "Failed to create Saison"}
                          </p>
            )}
            <Button onClick={() => navigate(-1)}>
                Close
            </Button>
        </Box>
      
    )
}   