import Button from '@mui/material/Button';
import  {Box,TextField,MenuItem}  from '@mui/material';
import {useNavigate,useParams} from 'react-router-dom';
import { useMutation, useQueryClient,useQuery } from '@tanstack/react-query';
import { addPlayerToTeam,getTeamById, getTeamRegistrations } from '../../api/saisonApi';
// import type { Player } from '../../types/types';
import { useState } from 'react';


import './tournamentForm.css';
import type { Registration } from '../../types/types';

export default function CreatePlayerForm() {
    const [DiscordName, setDiscName] = useState('');
    const [Pseudonyme, setPseudonyme] = useState(''); 
    const [Role, setRole] = useState('MEMBER');
    const { id: teamId } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    // define the mutation for adding a new player
    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: addPlayerToTeam,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['players'] });
            alert('Player created successfully!');
            navigate((-1));
        }
    });

    const { data: teamData, isLoading: teamLoading } = useQuery({
        queryKey: ['team', teamId],
        queryFn: () => getTeamById(Number(teamId)),
    });

    const { data: registrations, isLoading: regsLoading } = useQuery({
        queryKey: ['registrations', teamId],
        queryFn: () => getTeamRegistrations(Number(teamId)),
    });

    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
        if (!teamId) return;
        if (teamLoading || regsLoading) {
           alert('Data is still loading, please wait...');
        return;  
        }
        const maxCapacity = teamData?.capacite || 0;
        const currentCount = registrations?.length || 0;
        const isCaptainExist = registrations?.some((reg: Registration) => reg.role === 'CAPTAIN') || false;
       if (maxCapacity > 0 && currentCount >= maxCapacity) {
            alert(`Team is full! Max capacity is ${maxCapacity}.`);
            return;
        }
        if (Role === 'CAPTAIN' && isCaptainExist) {
            alert('This team already has a captain!');
            return;
        }
        mutate({ 
            player: { discordname: DiscordName, pseudonyme: Pseudonyme },
            teamId: teamId,
            role: Role
        }); 
    };

    
    return (
        <Box component="form" className="Player-form-box" onSubmit={handleSubmit}>

            <TextField label="Discord Name" required type="text" fullWidth margin="normal" value={DiscordName} onChange={(e) => setDiscName(e.target.value)} />
            <TextField label="Pseudonyme" required type="text" fullWidth margin="normal" value={Pseudonyme} onChange={(e) => setPseudonyme(e.target.value)} />
            <TextField select label="Role" required type="text" fullWidth margin="normal" value={Role} onChange={(e) => setRole(e.target.value)} >
                <MenuItem value="MEMBER">Member</MenuItem>
                <MenuItem value="CAPTAIN">Captain</MenuItem>
            </TextField>
            <Button color="primary" type="submit" disabled={isPending}>
                {isPending ? 'Saving...' : 'Create Player'}
            </Button>
            {isError && (
              <p style={{ color: 'red', fontSize: '0.8rem', margin: '10px 0' }}>
                Error: {error instanceof Error ? error.message : "Failed to create Player"}
              </p>
            )}
            <Button onClick={() => navigate('/')}>  
                Back to Home
            </Button>
        </Box>
    );
}
