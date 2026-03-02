import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Container, Typography, Button, Box, Paper } from "@mui/material";
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

  if (isLoading) return <Typography>Loading...</Typography>;
  if (!teamsData || teamsData.length < 2)
    return <Typography>Not enough teams</Typography>;

  return (
    <Container sx={{ mt: 4, pb: 5 }}>
      <Typography variant="h4" gutterBottom className="tournament-details-title">
        Tournament Calendar
      </Typography>

      <TournamentDisplay id={id!} matches={generatedMatches} />

      <Button className="save-matches-button" variant="contained" fullWidth disabled={isPending} 
        onClick={() => saveAllMatches()}
      >
        {isPending ? "Saving..." : "Confirm & Save Matches"}
      </Button>
      <Button className="back-button" variant="outlined" fullWidth 
      onClick={() => window.history.back()}>
        Back to Tournament Details
      </Button>
    </Container>
  );
}

function TournamentDisplay({ matches }: BracketProps) {
  return (
    <Box sx={{ mt: 3 }}>
      {matches.map((match, index) => (
        <Paper key={index} sx={{ p: 2, mb: 1, display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Round {match.roundNumber}: {match.hometeam.name}</Typography>
          <Typography sx={{ color: 'gray' }}>vs</Typography>
          <Typography>{match.awayteam.name}</Typography>
        </Paper>
      ))}
    </Box>
  );
}