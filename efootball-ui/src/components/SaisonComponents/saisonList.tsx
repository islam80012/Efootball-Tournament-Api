import { useQuery } from '@tanstack/react-query';
import { List, ListItem, ListItemText, Paper } from '@mui/material';
import { getSaisons } from '../../api/saisonApi';
import type { Saison } from '../../types/types';
// import type { AxiosError } from 'axios';
import {Box, Typography,Container} from '@mui/material';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../components.css';


export default function SaisonList(){
    const {data,isLoading} = useQuery({
        queryKey: ['saisons'],
        queryFn: getSaisons,
    });

        
    const navigate = useNavigate();

    const handleSaison = (saisonId: number) => {
      navigate(`/saisonDetails/${saisonId}`);
    }

    return (
      <Container maxWidth="sm" className="list-container">
         <Typography variant="h4" className="list-title">Saison Management</Typography>
        {isLoading && (
          <Box className="loading-container">
            <Typography variant="body1">Loading...</Typography>
          </Box>
        )}
        {/* {error && ( 
          <Box className="error-container">
            <Typography variant="body1" color="error">Error loading seasons</Typography>
          </Box>
        )} */}
        {data && (
          <List component={Paper} elevation={4} className="saison-list-wrapper">
            {data._embedded?.saisons?.map((saison: Saison) => (
              <ListItem key={saison.id} className="saison-list-item" component="li"
                 onClick={() => handleSaison(saison.id)} sx={{ cursor: 'pointer' }}>
              <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
                <ListItemText 
                  primary={saison.name} 
                  primaryTypographyProps={{ className: 'saison-name' }} 
                />
                <ListItemText 
                  primary={`📅 ${saison.saisonStartDate}`} 
                  primaryTypographyProps={{ className: 'saison-dates' }} 
                />
                <ListItemText 
                  primary={saison.status} 
                  primaryTypographyProps={{ className: 'saison-status' }} 
                />
              </Box>
            </ListItem>
            ))}
            <ListItem className="saison-list-item" component="li">
              <Button className="add-saison-button" variant="contained" fullWidth 
               onClick={() => navigate('/createSaison')}>
                Add New Saison
              </Button>
            </ListItem>
          </List>
        )}
</Container>
    )
}

