import { Paper, Typography, Box, Grid } from '@mui/material';
import type { GeneratedMatch } from './matchGenerator';


interface BracketProps {
    id: string;
    matches: GeneratedMatch[];
}

export default function TournamentBracket({ id, matches }: BracketProps) {
    if (!matches || matches.length === 0) return null;

    const matchesByRound = matches.reduce((acc, match) => {
        const round = match.roundNumber;
        if (!acc[round]) acc[round] = [];
        acc[round].push(match);
        return acc;
    }, {} as Record<number, GeneratedMatch[]>);

    return (
        <Box sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h5" gutterBottom>Calendrier du Tournoi (ID: {id})</Typography>
            
            {Object.entries(matchesByRound).map(([round, roundMatches]) => (
                <Paper key={round} elevation={2} sx={{ p: 2, mb: 3, backgroundColor: '#f5f5f5' }}>
                    <Typography variant="h6" color="primary">Journée {round}</Typography>
                   <Grid container spacing={2}>
                {roundMatches.map((match, index) => (
                    <Grid size={{ xs: 12, md: 6 }} key={index}> 
                        <Paper sx={{ p: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography sx={{ flex: 1, textAlign: 'right', fontWeight: 'bold' }}>
                                {match.homeTeam.name}
                            </Typography>
                            <Typography sx={{ mx: 2, color: 'gray' }}>VS</Typography>
                            <Typography sx={{ flex: 1, textAlign: 'left', fontWeight: 'bold' }}>
                                {match.awayTeam.name}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
                </Paper>
            ))}
        </Box>
    );
}