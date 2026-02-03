import { useState } from 'react'
import './App.css'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Routes, Route,Link,useLocation} from 'react-router-dom';
import CreateTournamentForm from './components/forms/createTournamet';
import SearchTournamentForm from './components/forms/SearchTournament';
// import Header from './components/Header';
// import Tournament from './components/Tournament';
// import Stats from './components/Stats';
// import Footer from './components/Footer';


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
    
      <div className="main-container">
          <div className="tournament-container">

            <ActionButton variant="contained" 
            onClick={() => setList(!list)}>Tournament
            </ActionButton>
            {list && (
            <Stack className="sub-menu-stack">
              <ActionButton as={Link} to="/create" >Create Tournament</ActionButton>
              <ActionButton as={Link} to="/search" >Join Tournament</ActionButton>
            </Stack>
            )}
          </div>

          <div className="stats-container">
            <ActionButton variant="contained" >Stats</ActionButton>
          </div>
          {location.pathname !== '/' && (
          <div className="form-area">
            <Routes>
              <Route path="/create" element={<CreateTournamentForm />} />
              <Route path="/search" element={<SearchTournamentForm />} />
            </Routes>
          </div>)}

      </div>
 
)}



export default App
