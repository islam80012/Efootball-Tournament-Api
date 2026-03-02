import { useParams } from 'react-router-dom';
import { useQuery,useQueries } from '@tanstack/react-query';
import {Container,Typography, Button} from '@mui/material';
// import {List, ListItem, ListItemText, Paper } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow,Paper } from '@mui/material';
import { getRegistrationsByTeam,fetchByLink,getTeamAwayMatches,getTeamHomeMatches} from '../../api/saisonApi';
import TeamName from './teamName';
import type {MatchWithSide,Match} from '../../types/types';
// import type {Tournament} from '../../types/types'
;
import { useNavigate } from 'react-router-dom';

import '../components.css';
import type { Player, Registration } from '../../types/types';

export default function TeamsDetails() { 
    const navigate = useNavigate();
    const {id} = useParams();

    //Registration data 
    const { data: registrations, isLoading: regLoading ,error: regError} = useQuery({
        queryKey: ['registrations', id],
        queryFn: () => getRegistrationsByTeam(Number(id)),
    });

    //Player data for each registration  
   const playerQueries = useQueries({
        queries: (registrations || []).map((reg: Registration) => ({
            queryKey: ['player', reg._links.player.href],
            queryFn: () => fetchByLink(reg._links.player.href),
        })),
    });

   //home matches 
   const homeMatchesQuery = useQuery({
    queryKey: ['homeMatches', id],
    queryFn: () => getTeamHomeMatches(Number(id)),
    });

    //away matches
    const awayMatchesQuery = useQuery({
        queryKey: ['awayMatches', id],
        queryFn: () => getTeamAwayMatches(Number(id)),
    });

    // contatenate home and away matches
        const AllMatches: MatchWithSide[] = [
        ...(homeMatchesQuery.data || []).map((m: Match) => ({ ...m, isHomeManual: true })),
        ...(awayMatchesQuery.data || []).map((m: Match) => ({ ...m, isHomeManual: false }))
        ].sort((a, b) => a.roundNumber - b.roundNumber);

    const isLoading = regLoading || playerQueries.some(q => q.isLoading) || 
        homeMatchesQuery.isLoading || awayMatchesQuery.isLoading;

    if (isLoading) return <div>Loading...</div>;
    if (regError) return <div>Error loading registrations:</div>;
   
return (
        <Container className="team-details-container">
            <Typography variant="h4" className="team-details-title">Team ID: {id} Players </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Player ID</TableCell>
                            <TableCell>Discord Name</TableCell>
                            <TableCell>Pseudonyme</TableCell>
                            <TableCell>Role</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {playerQueries.map((query, index) => {
                            const player = query.data as Player;
                            const role = registrations ? registrations[index]?.role : '';
                            
                            return (
                                <TableRow key={player?.id || index}>
                                    <TableCell>{player?.id}</TableCell>
                                    <TableCell>{player?.discordname}</TableCell>
                                    <TableCell>{player?.pseudonyme}</TableCell>
                                    <TableCell>{role}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Button onClick={() => navigate(`/createPlayer/${id}`)} className="add-player-button" sx={{ mt: 2 }}>
                    Add New Player
                </Button>
                <Button onClick={() => navigate(-1)} className="back-button" sx={{ mt: 2 }}>
                    Back to Tournament Details
                </Button>
            </Container>
            <Typography variant="h4" className="team-details-title" sx={{ mt: 4 }}>Team Matches</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Round</TableCell>
                            <TableCell>Home/Away</TableCell>
                            <TableCell>Opponent</TableCell>
                            <TableCell>Score</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {AllMatches.map((match, index) => {
                        const isHome = match.isHomeManual;
                        const opponentUrl = isHome 
                       ? match._links?.awayteam?.href 
                       : match._links?.hometeam?.href;

                        return (
                        <TableRow key={index}>
                            <TableCell>{match.roundNumber}</TableCell>
                            <TableCell>{isHome ? "Home" : "Away"}</TableCell>
                            <TableCell>
                            <TeamName url={opponentUrl} />
                            </TableCell>
                            <TableCell>{match.scoreHome} - {match.scoreAway}</TableCell>
                        </TableRow>
                        );
                    })}
                    </TableBody>

                </Table>
            </TableContainer>
            

        </Container>
    );
}
