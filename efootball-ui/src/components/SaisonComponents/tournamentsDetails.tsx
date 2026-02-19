import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {Container,Typography,Button} from '@mui/material';
import {List, ListItem, ListItemText, Paper,Box } from '@mui/material';
import { getTournamentByTournamentId,getTeamsByTournamentId } from '../../api/saisonApi';
import type {Team} from '../../types/types';


import { useNavigate } from 'react-router-dom';

// const {data,isPending,error} = useQuery({
//     queryKey :['tournament']
// )};


export default function TournamentDetails(){
    const { id } = useParams();
    const navigate = useNavigate();
    const {data:tourneyData,isLoading:tourneyLoading,error:tourneyError}= useQuery({
            queryKey: ['tourneys', id ] ,
            queryFn : () => getTournamentByTournamentId(Number(id)),

        });
    const {data:teamsData,isLoading:teamsLoading} = useQuery({
        queryKey: ['teams', id],
        queryFn: () => getTeamsByTournamentId(Number(id)),
    });


     if (tourneyLoading ) {
        return <div>Loading Tournament Details...</div>;
    }

    if (tourneyError) {
        return <div>Error loading tournament details</div>;
    }
    console.log("Teams Data:", teamsData);
    return (
        <Container className="tournament-details-container">
            <Typography variant="h4" className="tournament-details-title">{tourneyData?.name} : {tourneyData?.maxsTeams} Teams ({tourneyData?.playersPerTeam} Players per team)</Typography>
            <Typography variant="h5" className="Teams-details-title">Teams in Tournament</Typography>
            {teamsLoading && <div>Loading Teams...</div>}
            {/* {teamsError && <div>Error loading teams</div>} */}
           {teamsData && teamsData.length > 0 ? (
               <List component={Paper} elevation={4} className="teams-wrapper" > 
               {teamsData.map((team: Team) => (
                <ListItem key={team.id} className="team-list-item" component="li" 
                onClick={() => navigate(`/teamsDetails/${team.id}`)} sx={{ cursor: 'pointer' }}>
                     <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
                        <ListItemText 
                            primary={`ID: ${team.id}`} 
                            primaryTypographyProps={{ className: 'team-id' }}
                            />
                         <ListItemText 
                            primary={team.name} 
                            primaryTypographyProps={{ className: 'team-name' }} 
                          />
                          <ListItemText 
                            primary={`Players: ${team.capacite}`} 
                            primaryTypographyProps={{ className: 'team-capacity' }}
                            />
                     </Box>
                </ListItem>
                 
                 ))} 
                <ListItem className="team-list-item" component="li">
                    <Button className="add-tournament-button" variant="contained" fullWidth 
                     onClick={() => navigate(`/createTeam/${tourneyData?.id}`)} >Add new team</Button>
                </ListItem>
               </List>
               ) : (
                  <Typography>No teams found for this tournament.</Typography>
               )
        }
             
                
                    
        </Container>
    )
}