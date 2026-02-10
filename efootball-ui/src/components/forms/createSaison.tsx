import Button from '@mui/material/Button';
import  {Box,TextField}  from '@mui/material';
import './tournamentForm.css';
import {useNavigate} from 'react-router-dom';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addSaison } from '../../api/saisonApi';
import type { Saison } from '../../types/types';
import { useState } from 'react';
import type { AxiosError } from 'axios';





export default function CreateSaisonForm() {

const [name, setName] = useState('');
const [startDate, setStartDate] = useState('');
// const [status, setStatus] = useState('OPEN');
    
const navigate = useNavigate();
const queryClient = useQueryClient();
// define the mutation for adding a new saison
const { mutate, isPending, isError, error } = useMutation({
  mutationFn: addSaison,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['saisons'] });
    alert('Saison created successfully!');
    navigate('/saisonList')
  }
});
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  mutate({ 
    name: name, 
    saisonStartDate: startDate, 
    status: 'OPEN'
  } as Omit<Saison, '_links'>); 
};

    return (
        <Box component="form" className="Saison-form-box" onSubmit={handleSubmit}>

            <TextField label="Saison Name" required type="text" fullWidth margin="normal" value={name} onChange={(e) => setName(e.target.value)} 
              error={isError} 
              helperText={isError ? "Please check this field" : ""}  />
            
            <TextField label="Start Date" type="date" fullWidth margin="normal" InputLabelProps={{ shrink: true }} value={startDate} onChange={(e) => setStartDate(e.target.value)} />
    

            <Button color="primary" type="submit" disabled={isPending}>
                {isPending ? 'Saving...' : 'Create Saison'}
            </Button>
            {isError && (
              <p style={{ color: 'red', fontSize: '0.8rem', margin: '10px 0' }}>
                Error: {(error as AxiosError<{message: string}>)?.response?.data?.message || "Failed to create Saison"}
              </p>
            )}
            <Button onClick={() => navigate('/')}>
                Close
            </Button>
        </Box>
        
       
    )
}   