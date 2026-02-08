import Button from '@mui/material/Button';
import  {Box,TextField}  from '@mui/material';
import './tournamentForm.css';
import {useNavigate} from 'react-router-dom';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addSaison } from '../../api/saisonApi';
import type { Saison } from '../../types/types';
import { useState } from 'react';





export default function CreateSaisonForm() {

const [name, setName] = useState('');
const [startDate, setStartDate] = useState('');
// const [status, setStatus] = useState('OPEN');
    
const navigate = useNavigate();
const queryClient = useQueryClient();
const mutation = useMutation({
  mutationFn: addSaison,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['saisons'] });
    alert('Saison created successfully!');
  }
});
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  mutation.mutate({ 
    name: name, 
    saisonStartDate: startDate, 
    status: 'OPEN'
  } as Omit<Saison, '_links'>); 
};

    return (
        <Box component="form" className="Saison-form-box" onSubmit={handleSubmit}>

            <TextField label="Saison Name" type="text" fullWidth margin="normal" value={name} onChange={(e) => setName(e.target.value)} />
            
            <TextField label="Start Date" type="date" fullWidth margin="normal" InputLabelProps={{ shrink: true }} value={startDate} onChange={(e) => setStartDate(e.target.value)} />
    

            <Button color="primary" type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? 'Saving...' : 'Create Saison'}
            </Button>
            <Button onClick={() => navigate('/')}>
                Close
            </Button>
        </Box>
        
       
    )
}   