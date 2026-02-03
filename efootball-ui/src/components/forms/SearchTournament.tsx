import { Box, TextField, Button, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search'; 
import './tournamentForm.css';
import {useNavigate} from 'react-router-dom';

export default function SearchTournamentForm() {
    const navigate = useNavigate();

    return (
        <Box className="search-form-container">
            <Stack direction="row" spacing={1}>
                <TextField label="Search Tournaments..." variant="outlined" 
                    fullWidth placeholder="Enter tournament name or ID"/>
                <Button variant="contained" color="primary"size="large" startIcon={<SearchIcon />}>
                    Search
                </Button>
                 <Button onClick={() => navigate('/')}>
                                Close
                            </Button>
            </Stack>
        </Box>
    );
}