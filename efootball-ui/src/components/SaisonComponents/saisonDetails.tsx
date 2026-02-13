import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {Container,Typography, Button,Box } from '@mui/material';
import {List, ListItem, ListItemText, Paper } from '@mui/material';
import { getSaisonById ,getTournamentsBySaisonId} from '../../api/saisonApi';
import type {Tournament} from '../../types/types'
;
import { useNavigate } from 'react-router-dom';

import '../components.css';


export default function SaisonDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { data:saisondata, isLoading:saisonLoading, error:saisonError } = useQuery({
        queryKey: ['saison', id],
        queryFn: () => getSaisonById(Number(id)),
    });

    const {data:tourneyData,isLoading:tourneyLoading}= useQuery({
        queryKey: ['tourneys', id ] ,
        queryFn : () => getTournamentsBySaisonId(Number(id)),

    });

   

    if (saisonLoading) {
        return <div>Loading Season Details...</div>;
    }

    if (saisonError) {
        return <div>Error loading saison details</div>;
    }

    return (
        <Container className="saison-details-container">
            <Typography variant="h4" className="saison-details-title">{saisondata?.name} Details</Typography>
            <p className="saison-details">Start Date: {saisondata?.saisonStartDate}</p>
            <p className="saison-details">Status: {saisondata?.status}</p>
        <Button onClick={() => navigate('/saisonList')} className="back-button">Back to List</Button>
             <Typography variant="h4" className="tournament-list-title">{saisondata?.name} Tournaments </Typography>
       {tourneyLoading && (
          <Box className="loading-container">
            <Typography variant="body1">Loading...</Typography>
          </Box>)}
        {/* {tourneyError &&(
            <Box className="error-container">
            <Typography variant="body1" color="error">Error loading seasons</Typography>
          </Box>
        ) } */}
        {tourneyData && 
            <List component={Paper} elevation={4} className="tournaments-wrapper" > 
                {tourneyData._embedded?.tournaments?.map((tourney: Tournament) => (
                <ListItem key={tourney.id} className="tournament-list-item" component="li"
                      onClick={() => navigate(`/tournamentsDetails/${tourney.id}`)} sx={{ cursor: 'pointer' }}>
                    <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
                        <ListItemText 
                        primary={tourney.name} 
                        primaryTypographyProps={{ className: 'tournament-name' }} 
                        />
                        <ListItemText 
                        primary={`📅 ${tourney.tournamentStartDate}`} 
                        primaryTypographyProps={{ className: 'tournament-dates' }} 
                        />
                        <ListItemText 
                        primary={` ${tourney.maxsTeams}`} 
                        primaryTypographyProps={{ className: 'tournament-Nteams' }} 
                        />
                        <ListItemText 
                        primary={`${tourney.playersPerTeam}`} 
                        primaryTypographyProps={{ className: 'tournament-NplayersPerTeam' }} 
                        />
                        <ListItemText 
                        primary={tourney.status} 
                        primaryTypographyProps={{ className: 'tournament-status' }} 
                        />
                        <ListItemText 
                        primary={tourney.tourneyType} 
                        primaryTypographyProps={{ className: 'tournament-type' }} 
                         />
                    </Box>
                </ListItem>
                ))}
                <ListItem  className="tournament-list-item" component="li">
                   <Button className="add-tournament-button" variant="contained" fullWidth 
                     onClick={() => navigate(`/createTournament/${saisondata?.id}`)} >Add new tournament</Button>
                </ListItem>
                
                 
            </List>
        }
       
       
        </Container>
    )}