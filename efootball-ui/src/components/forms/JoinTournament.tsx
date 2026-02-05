import { Box, TextField, Button, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search'; 
import MenuItem from '@mui/material/MenuItem';
import './tournamentForm.css';
import {useNavigate} from 'react-router-dom';

export default function SearchTournamentForm() {
    const navigate = useNavigate();

    return (
        <Box className="join-form-container">
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={1}>
                <TextField label="Search Tournaments..." variant="outlined" 
                    fullWidth placeholder="Enter tournament name "/>
                <TextField select label="Role" defaultValue="player" fullWidth placeholder="Enter your role">
                   <MenuItem value="captain">Captain</MenuItem>
                   <MenuItem value="player">Player</MenuItem>
                </TextField>
                <TextField label="pseaudoname" variant="outlined" fullWidth placeholder="Enter your pseudoname"/>
                <Button variant="contained" color="primary"size="large" startIcon={<SearchIcon />}>
                    Join
                </Button>
                 <Button onClick={() => navigate('/')}>
                                Close
                            </Button>
            </Stack>
        </Box>
    );
}