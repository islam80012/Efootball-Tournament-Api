import { useParams,useNavigate  } from 'react-router-dom';
import { useQuery,useQueries } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react';
import {Container,Typography, Button} from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow,Paper } from '@mui/material';
import { getRegistrationsByTeam,fetchByLink,getTeamAwayMatches,getTeamHomeMatches,updateMatchScore} from '../../../api/saisonApi';
import type {Player, Registration} from '../../../types/types';
import MatchRow from "./MatchRow";

import '../../components.css';


export default function TeamsDetails() { 
        const navigate = useNavigate();
        const {id} = useParams();
      
    //================= Queries ======================

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

        const queryClient = useQueryClient();
        // mutation for updating match scores
        const mutation = useMutation({
                mutationFn: ({ id, home, away }: { id: number, home: number, away: number }) => 
                    updateMatchScore(id, home, away),
                onSuccess: () => {
                    // Rafraîchit les matchs pour faire passer la ligne en mode "Played"
                    queryClient.invalidateQueries({ queryKey: ['homeMatches'] });
                    queryClient.invalidateQueries({ queryKey: ['awayMatches'] });
                }
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

        const matches = useMemo(() => {
        return [
            ...(homeMatchesQuery.data || []),
            ...(awayMatchesQuery.data || [])
        ].sort((a, b) => a.roundNumber - b.roundNumber);
        }, [homeMatchesQuery.data, awayMatchesQuery.data]);

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
                            <TableCell>Home team</TableCell>
                            <TableCell>Score</TableCell>
                            <TableCell>Score</TableCell>
                            <TableCell>Away team</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                   <TableBody>
                        {matches.map((match) => (
                            <MatchRow
                            key={`${match.id}-${match._links?.hometeam?.href}`}
                            match={match}
                            loading={mutation.isPending}
                            onSave={(id, home, away) =>
                                mutation.mutate({ id, home, away })
                            }
                            />
                        ))}
                    </TableBody>

                </Table>
            </TableContainer>
        

        </Container>
    );
    }
