import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Container, Typography, Button, Box } from "@mui/material";
import matchGenerator from "./matchGenerator";

import {getTournamentByTournamentId, getTeamsByTournamentId,createMatch,} from "../../../api/saisonApi";
import type { GeneratedMatch, Match } from "../../../types/types";
import '../../../components/components.css';

interface BracketProps {
  id: string;
  matches: GeneratedMatch[];
}

export default function TournamentBracketPage() {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { data: tourneyData } = useQuery({
    queryKey: ["tourneys", id],
    queryFn: () => getTournamentByTournamentId(Number(id)),
  });

  const { data: teamsData, isLoading } = useQuery({
    queryKey: ["teams", id],
    queryFn: () => getTeamsByTournamentId(Number(id)),
  });

  const type = (tourneyData?.tourneyType || "LEAGUE") as "LEAGUE" | "UCL";
  const generatedMatches: GeneratedMatch[] =
    teamsData && teamsData.length > 1
      ? matchGenerator(teamsData, type)
      : [];

  const { mutate: saveAllMatches, isPending } = useMutation({
    mutationFn: async () => {
      const baseUrl = "http://localhost:8080/api";
      const promises = generatedMatches.map((match) => {
        const payload = {
          roundNumber: match.roundNumber,
          matchDate: new Date().toISOString().split("T")[0],
          scoreHome: 0,
          scoreAway: 0,
          tourney: `${baseUrl}/tournaments/${id}`,
          hometeam: `${baseUrl}/teams/${match.hometeam.id}`,
          awayteam: `${baseUrl}/teams/${match.awayteam.id}`,
        };
        return createMatch(payload as unknown as Match);
      });
      return Promise.all(promises);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matches"] });
      alert("Matches saved successfully!");
    },
  });

  if (isLoading) {
    return (
      <Container className="tournament-bracket-container">
        <Box className="loading-container">
          <Typography>Loading bracket...</Typography>
        </Box>
      </Container>
    );
  }

  if (!teamsData || teamsData.length < 2) {
    return (
      <Container className="tournament-bracket-container">
        <Box className="error-container">
          <Typography>Not enough teams to generate a bracket.</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container className="tournament-bracket-container">
      <Typography variant="h4" className="tournament-details-title">
        Tournament Calendar
      </Typography>
      <Typography className="bracket-subtitle">
        {tourneyData?.name} · {generatedMatches.length} matches · {type}
      </Typography>

      <TournamentDisplay id={id!} matches={generatedMatches} />

      <Box className="buttons-container bracket-actions">
        <Button
          className="save-matches-button"
          variant="contained"
          fullWidth
          disabled={isPending}
          onClick={() => saveAllMatches()}
        >
          {isPending ? 'Saving...' : 'Confirm & Save Matches'}
        </Button>
        <Button className="back-button" variant="outlined" fullWidth onClick={() => window.history.back()}>
          Back to Tournament Details
        </Button>
      </Box>
    </Container>
  );
}

function TournamentDisplay({ matches }: BracketProps) {
  return (
    <Box className="bracket-list">
      {matches.map((match, index) => (
        <Box key={`${match.roundNumber}-${match.hometeam.id}-${match.awayteam.id}-${index}`} className="bracket-match-card">
          <Typography component="span" className="bracket-round">
            Round {match.roundNumber}
          </Typography>

          <Box className="bracket-matchup">
            <Typography component="span" className="bracket-team bracket-team-home">
              {match.hometeam.name}
            </Typography>
            <Typography component="span" className="bracket-vs">
              VS
            </Typography>
            <Typography component="span" className="bracket-team bracket-team-away">
              {match.awayteam.name}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}