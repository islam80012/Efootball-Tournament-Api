import { useState } from 'react'
import './App.css'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Routes, Route,Link,useLocation} from 'react-router-dom';
import CreateTournamentForm from './components/forms/createTournament';
import JoinTournamentForm from './components/forms/JoinTournament';
import CreateSaisonFrom from './components/forms/createSaison';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SaisonList from './components/SaisonComponents/saisonList';
import SaisonDetails from './components/SaisonComponents/saisonDetails';

// import Header from './components/Header';
// import Tournament from './components/Tournament';
// import Stats from './components/Stats';
// import Footer from './components/Footer';

const queryClient = new QueryClient();

const ActionButton = styled(Button)<{ component?: React.ElementType; to?: string }>({
  backgroundColor: '#eeeeeec5', // Football green
  color: '#070d41',
  '&:hover': {
    backgroundColor: '#20044e',
  },
  width: '200px',
  height : '40px',
  padding: '15px',
  marginTop: '15px',

});





function App() {

  const [list, setList] = useState(false);
  const location = useLocation();
  

  return (
    <QueryClientProvider client={queryClient}>
    
      <div className="main-container">
          <div className="tournament-container">

            <ActionButton variant="contained" 
            onClick={() => setList(!list)}>Saison
            </ActionButton>
            {list && (
            <Stack className="sub-menu-stack">
              <ActionButton as={Link} to="/createSaison" >Create New Saison</ActionButton>
              {/* <ActionButton as={Link} to="/createTournament" >Create New Tournament</ActionButton> */}
              <ActionButton as={Link} to="/joinTournament" >Join Tournament</ActionButton>
            </Stack>
            )}
          </div>

          <div className="stats-container">
            <ActionButton variant="contained" >Stats</ActionButton>
          </div>
          {location.pathname !== '/' && (
          <div className="form-area">
            <Routes>
              <Route path="/createSaison" element={<CreateSaisonFrom />} />
              <Route path="/createTournament/:id" element={<CreateTournamentForm />} />
              <Route path="/joinTournament" element={<JoinTournamentForm />} />
              <Route path="/saisonList" element={<SaisonList />} />
              <Route path="/saisonDetails/:id" element={<SaisonDetails />} />
            </Routes>
          </div>)}

        
      </div>
        
          </QueryClientProvider>
 
)}



export default App
