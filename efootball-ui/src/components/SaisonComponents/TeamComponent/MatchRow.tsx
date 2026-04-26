import { useState } from "react";
import { TableRow, TableCell, TextField, Button } from "@mui/material";
import TeamName from "./teamName";
import { useQuery } from '@tanstack/react-query';
import type { Match } from "../../../types/types";
import { getDuelsByMatch } from "../../../api/saisonApi";


type Props = {
  match: Match;
  onSave: (id: number, home: number, away: number) => void;
  loading: boolean;
};





export default function MatchRow({ match, onSave, loading }: Props) {
  const [home, setHome] = useState("");
  const [away, setAway] = useState("");
  const [open, setOpen] = useState(false);

  const {data: gameDuels,isLoading:gameDuelsLoading,isError:gameDuelsError} = useQuery({
    queryKey: ['gameDuels', match.id],
    queryFn: () => getDuelsByMatch(match.id),
   enabled: !!match.id,
});


  if (match.matchtype === "Played") {
    return (
      <TableRow hover onClick={() => setOpen(!open)} sx={{ cursor: 'pointer' }}>
        <TableCell>{match.roundNumber}</TableCell>
        <TableCell><TeamName url={match._links?.hometeam?.href} /></TableCell>
        <TableCell>{match.scoreHome}</TableCell>
        <TableCell>{match.scoreAway}</TableCell>
        <TableCell><TeamName url={match._links?.awayteam?.href} /></TableCell>
      </TableRow>
    );
  }

  return (
    <TableRow hover onClick={() => setOpen(!open)} sx={{ cursor: 'pointer' }}>
      <TableCell>{match.roundNumber}</TableCell>

      <TableCell>
        <TeamName url={match._links?.hometeam?.href} />
      </TableCell>

      <TableCell>
        <TextField
          type="number"
          value={home}
          onChange={(e) => setHome(e.target.value)}
        />
      </TableCell>

      <TableCell>
        <TextField
          type="number"
          value={away}
          onChange={(e) => setAway(e.target.value)}
        />
      </TableCell>

      <TableCell>
        <TeamName url={match._links?.awayteam?.href} />
      </TableCell>

      <TableCell>
        <Button
          disabled={loading}
          onClick={() => onSave(match.id, Number(home), Number(away))}
        >
          Save
        </Button>
      </TableCell>
    </TableRow>
  );
}