import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Container,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
  Box
} from '@mui/material';

import { getTournamentByTournamentId, getTeamsByTournamentId } from '../../api/saisonApi';
import type { Team } from '../../types/types';

import '../components.css';

export default function TournamentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: tourneyData, isLoading: tourneyLoading, error: tourneyError } =
    useQuery({
      queryKey: ['tourneys', id],
      queryFn: () => getTournamentByTournamentId(Number(id)),
    });

  const { data: teamsData, isLoading: teamsLoading } =
    useQuery({
      queryKey: ['teams', id],
      queryFn: () => getTeamsByTournamentId(Number(id)),
    });

  const handleGenerate = () => {
    navigate(`/tournaments/${id}/bracket`);
  };

  if (tourneyLoading) return <Typography>Loading...</Typography>;
  if (tourneyError) return <Typography>Error loading tournament</Typography>;

  return (
    <Container className="tournament-details-container">
      <Typography variant="h4" className="tournament-details-title">
        {tourneyData?.name} ({tourneyData?.maxsTeams} Teams)
      </Typography>

      <Typography variant="h5" className="Teams-details-title">
        Teams
      </Typography>

      <List component={Paper} elevation={4} className="teams-wrapper">
        {teamsLoading && (
          <ListItem>
            <ListItemText primary="Loading teams..." />
          </ListItem>
        )}

        {teamsData?.map((team: Team) => (
          <ListItem
            key={team.id}
            className="team-list-item"
            onClick={() => navigate(`/teamsDetails/${team.id}`)}
          >
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <ListItemText
                primary={`ID: ${team.id}`}
                className="team-id"
              />
              <ListItemText
                primary={team.name}
                className="team-name"
              />
              <ListItemText
                primary={`Cap: ${team.capacite}`}
                className="team-capacity"
              />
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

      <Box className="buttons-container" sx={{ mt: 3 }}>
        <Button
          className="generate-bracket-button"
          variant="contained"
          fullWidth
          onClick={handleGenerate}
          disabled={!teamsData || teamsData.length < 2}
        >
          Generate Bracket
        </Button>
      </Box>
    </Container>
  );
}