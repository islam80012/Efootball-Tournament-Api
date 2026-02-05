import Button from '@mui/material/Button';
import  {Box,TextField}  from '@mui/material';
import './tournamentForm.css';
import {useNavigate} from 'react-router-dom';



export default function CreateSaisonForm() {
    
const navigate = useNavigate();

    return (
        <Box component="form" className="Saison-form-box">

            <TextField label="Saison Name" type="text" fullWidth margin="normal" />
            
            <TextField label="Start Date" type="date" fullWidth margin="normal" InputLabelProps={{ shrink: true }}  />
    

            <Button color="primary" type="submit" >
                Create Saison
            </Button>
            <Button onClick={() => navigate('/')}>
                Close
            </Button>
        </Box>
        
       
    )
}   