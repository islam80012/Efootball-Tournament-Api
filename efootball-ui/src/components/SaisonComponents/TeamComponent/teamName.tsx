import { useQuery } from '@tanstack/react-query';
import { fetchByLink } from '../../../api/saisonApi';
import { Typography } from '@mui/material';

interface TeamNameProps {
  url: string;
}

export default function TeamName({ url }: TeamNameProps) {
  const { data, isLoading } = useQuery({
    queryKey: ['team', url],
    queryFn: () => fetchByLink(url),
    staleTime: 1000 * 60 * 5, 
  });

  if (isLoading) return <span>...</span>;
  
  return <Typography variant="body2">{data?.name || "Unknown Team"}</Typography>;
}