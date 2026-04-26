import { useQuery } from '@tanstack/react-query';
import { fetchByLink } from '../../../api/saisonApi';
import { Typography } from '@mui/material';

interface PlayerNameProps {
  url: string;
}

export default function PlayerName({ url }: PlayerNameProps) {
  const { data, isLoading } = useQuery({
    queryKey: ['player', url],
    queryFn: () => fetchByLink(url),
    staleTime: 1000 * 60 * 5, 
  });

  if (isLoading) return <span>...</span>;
  
  return <Typography variant="body2">{data?.discordname || "Unknown Player"}</Typography>;
}