import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Container, Typography, Button, List, ListItem, ListItemText, Paper, Box } from '@mui/material';
import { useState } from 'react';
import { getTournamentByTournamentId, getTeamsByTournamentId, createMatch } from '../../api/saisonApi';
import matchGenerator from './Brackets/matchGenerator';
import type { GeneratedMatch } from './Brackets/matchGenerator';
import type { Match, Team } from '../../types/types';

import TournamentBracket from './Brackets/tournamentBracket';

export default function TournamentDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    
    const [showBracket, setShowBracket] = useState(false);
    const [generatedMatches, setGeneratedMatches] = useState<GeneratedMatch[]>([]);

    const { data: tourneyData, isLoading: tourneyLoading, error: tourneyError } = useQuery({
        queryKey: ['tourneys', id],
        queryFn: () => getTournamentByTournamentId(Number(id)),
    });

    const { data: teamsData, isLoading: teamsLoading } = useQuery({
        queryKey: ['teams', id],
        queryFn: () => getTeamsByTournamentId(Number(id)),
    });

    // Mutation pour la sauvegarde groupée
    const { mutate: saveAllMatches, isPending: isSaving } = useMutation({
        mutationFn: async (matches: GeneratedMatch[]) => {
            const baseUrl = "http://localhost:8080/api";
            
            const promises = matches.map(match => {
                const matchPayload = {
                    roundNumber: match.roundNumber,
                    matchDate: new Date().toISOString().split('T')[0],
                    scoreHome: 0,
                    scoreAway: 0,
                    tourney: `${baseUrl}/tournaments/${id}`, 
                    hometeam: `${baseUrl}/teams/${match.homeTeam.id}`,
                    awayteam: `${baseUrl}/teams/${match.awayTeam.id}`
                };
                return createMatch(matchPayload as unknown as Match);
            });

            return Promise.all(promises);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['matches'] });
            alert("Matchs enregistrés avec succès dans la base de données !");
        },
        onError: (error) => {
            console.error("Erreur détaillée lors de la sauvegarde :", error);
            alert("Erreur lors de la sauvegarde. Vérifiez la console (F12).");
        }
    });

    const handleGenerate = () => {
        if (teamsData && teamsData.length > 0) {
            const type = (tourneyData?.tourneyType || 'LEAGUE') as 'LEAGUE' | 'UCL';
            const matches = matchGenerator(teamsData, type);
            setGeneratedMatches(matches);
            setShowBracket(true);
        } else {
            alert("No teams found for this tournament.");
        }
    };

    const handleSaveClick = () => {
        saveAllMatches(generatedMatches);
    };

    if (tourneyLoading) return <Typography>Loading...</Typography>;
    if (tourneyError) return <Typography>Error loading tournament</Typography>;

    return (
        <Container 
            className="tournament-details-container"
            maxWidth="lg"
            sx={{ 
                mt: 5,
                pb: 10,
                display: 'block',
                height: 'auto',
                minHeight: '100vh',
                overflow: 'visible' 
            }}
        >
          
            <Typography variant="h4" className="tournament-details-title">
                {tourneyData?.name} ({tourneyData?.maxsTeams} Teams)
            </Typography>

  
            <Typography variant="h5" className="Teams-details-title">Teams</Typography>
            <List component={Paper} elevation={4} className="teams-wrapper">
                {teamsLoading && <ListItem><ListItemText primary="Loading teams..." /></ListItem>}
                {teamsData?.map((team: Team) => (
                    <ListItem 
                        key={team.id} 
                        className="team-list-item"
                        onClick={() => navigate(`/teamsDetails/${team.id}`)}
                    >
                        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                            <ListItemText primary={`ID: ${team.id}`} className="team-id" />
                            <ListItemText primary={team.name} className="team-name" />
                            <ListItemText primary={`Cap: ${team.capacite}`} className="team-capacity" />
                        </Box>
                    </ListItem>
                ))}
                <ListItem>
                    <Button 
                        className="add-tournament-button" 
                        variant="contained" 
                        fullWidth 
                        onClick={() => navigate(`/createTeam/${id}`)}
                    >
                        Add New Team
                    </Button>
                </ListItem>
            </List>

          
            {showBracket && (
                <Box sx={{ width: '100%', mt: 4 }}>
                    <TournamentBracket id={id!} matches={generatedMatches} />
                    
                    <Button 
                        className="add-saison-button" 
                        variant="contained" 
                        fullWidth 
                        disabled={isSaving}
                        onClick={handleSaveClick}
                        sx={{ mt: 2, mb: 10 }} 
                    >
                        {isSaving ? "Saving..." : "Confirm & Save Matches to DB"}
                    </Button>
                </Box>
            )}

           
            {!showBracket && (
                <Box className="buttons-container" sx={{ mt: 3 }}>
                    <Button 
                        className="generate-bracket-button" 
                        variant="contained" 
                        fullWidth 
                        onClick={handleGenerate}
                    >
                        Generate Bracket
                    </Button>
                </Box>
            )}
        </Container>
    );
}