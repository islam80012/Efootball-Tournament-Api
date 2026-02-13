import Button from '@mui/material/Button';
import  {Box,TextField,MenuItem}  from '@mui/material';
import {useNavigate,useParams} from 'react-router-dom';
import { useMutation, useQueryClient,useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { addTeamToTournament,getTournamentByTournamentId } from '../../api/saisonApi';
import type { Team } from '../../types/types';
import type { AxiosError } from 'axios';


export default function CreateTeamForm() {
    
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [capacity, setCapacity] = useState(1);
    const {id} = useParams();
    
    const queryClient = useQueryClient();
    // define the mutation for adding a new team
    const { mutate, isPending, isError, error } = useMutation({
      mutationFn: (newTeam: Omit<Team, '_links'>) => addTeamToTournament(newTeam),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['teams'] });
        alert('Team created successfully!');
        navigate((-1));
      }

    })
    const {data} = useQuery({
        queryKey: ['tourneys', id ] ,
        queryFn : () => getTournamentByTournamentId(Number(id)),
    });

    // const maxTeams = data?.maxsTeams || 0;
    const maxPlayersPerTeam = data?.playersPerTeam || 0;
    // define capacity options 
    const capaciteTable = []; 
    for (let i=1 ; i<= maxPlayersPerTeam ; i++){
        capaciteTable.push(i);
    }





    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      mutate({
        name: name,
        capacite: Number(capacity),
        tourney: `http://localhost:8080/api/tournaments/${id}`
      } as Omit<Team, '_links'>); 
    }


    return (
        <Box component="form"  className="team-form-box"  onSubmit={handleSubmit} >
            <TextField label="Team Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth 
                error={isError} 
                helperText={isError ? "Please check this field" : ""}  />
           <TextField select label="Capacity" type="number" value={capacity}onChange={(e) => setCapacity(Number(e.target.value))} fullWidth
                error={isError}  
                helperText={isError ? "Please check this field" : ""} >
            {capaciteTable.map((option) => (
                <MenuItem key={option} value={option}>
                    {option}
                 </MenuItem>)) 
            }
           </TextField>
             <Button color="primary" type="submit" disabled={isPending}>
                    {isPending ? 'Saving...' : 'Create Team'}
            </Button>
            {isError && (
              <p style={{ color: 'red', fontSize: '0.8rem', margin: '10px 0' }}>
                Error: {(error as AxiosError<{message: string}>)?.response?.data?.message || "Failed to create Team"}
            </p> )}
            <Button onClick={() => navigate(-1)}>
                Close
            </Button>
        </Box>
    )


};
    