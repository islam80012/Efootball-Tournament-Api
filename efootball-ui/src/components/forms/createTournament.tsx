import Button from '@mui/material/Button';
import  {Box,TextField}  from '@mui/material';
import './tournamentForm.css';
import {useNavigate} from 'react-router-dom';



export default function CreateTournmentForm() {
    
const navigate = useNavigate();

    return (
        <Box component="form" className="tournament-form-box">

            <TextField label="Tournament Name" type="text" fullWidth margin="normal" />
            
            <TextField label="Number of Teams" type="number" fullWidth margin="normal" />
          
            <TextField label="players per team" type="number" fullWidth margin="normal" />
          
            <TextField label="Start Date" type="date" fullWidth margin="normal"InputLabelProps={{ shrink: true }}  />
    

            <Button color="primary" type="submit" >
                Create Tournament
            </Button>
            <Button onClick={() => navigate('/')}>
                Close
            </Button>
        </Box>
        
       
    )
}   