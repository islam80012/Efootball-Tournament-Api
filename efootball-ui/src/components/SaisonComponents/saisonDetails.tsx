import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {Container,Typography} from '@mui/material';
import { getSaisonById } from '../../api/saisonApi';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import '../components.css';

export default function SaisonDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { data, isLoading, error } = useQuery({
        queryKey: ['saison', id],
        queryFn: () => getSaisonById(Number(id)),
    });

    if (isLoading) {
        return <div>Loading Season Details...</div>;
    }

    if (error) {
        return <div>Error loading saison details</div>;
    }

    return (
        <Container className="saison-details-container">
            <Typography variant="h4" className="saison-details-title">{data?.name} Details</Typography>
            <p className="saison-details">Start Date: {data?.saisonStartDate}</p>
            <p className="saison-details">Status: {data?.status}</p>
        <Button onClick={() => navigate(-1)} className="back-button">Back to List</Button>
        <Button onClick={() => navigate('/createTournament')} className="add-tournament-button">Add new tournament</Button>
        </Container>
    )}