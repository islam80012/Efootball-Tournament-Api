import { Box, TextField, Button, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuItem from '@mui/material/MenuItem';
import './tournamentForm.css';
import { useNavigate } from 'react-router-dom';

export default function JoinTournamentForm() {
  const navigate = useNavigate();

  return (
    <Box className="join-form-container" component="section" aria-label="Join tournament search">
      <Stack direction="column" sx={{ gap: '20px', width: '100%' }}>
        <TextField
          label="Search Tournaments..."
          variant="outlined"
          fullWidth
          placeholder="Enter tournament name "
        />
        <TextField select label="Role" defaultValue="player" fullWidth placeholder="Enter your role">
          <MenuItem value="captain">Captain</MenuItem>
          <MenuItem value="player">Player</MenuItem>
        </TextField>
        <TextField label="pseaudoname" variant="outlined" fullWidth placeholder="Enter your pseudoname" />
        <Stack direction="column" spacing={1.5} sx={{ width: '100%' }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            disableElevation
            startIcon={<SearchIcon />}
          >
            Join
          </Button>
          <Button variant="text" fullWidth onClick={() => navigate('/')}>
            Close
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
