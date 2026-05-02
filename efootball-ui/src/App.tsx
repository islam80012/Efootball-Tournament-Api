import { useState } from 'react'
import './App.css'
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import CreateTournamentForm from './components/forms/createTournament';
import JoinTournamentForm from './components/forms/JoinTournament';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SaisonList from './components/SaisonComponents/saisonList';
import SaisonDetails from './components/SaisonComponents/saisonDetails';
import TournamentsDetails from './components/SaisonComponents/tournamentsDetails';
import CreateTeamForm from './components/forms/createTeam';
import CreateSaisonForm from './components/forms/createSaison';
import TeamsDetails from './components/SaisonComponents/TeamComponent/teamsDetails';
import CreatePlayerForm from './components/forms/createPlayer';
import TournamentBracket from './components/SaisonComponents/Brackets/tournamentBracket';

// import Header from './components/Header';
// import Tournament from './components/Tournament';
// import Stats from './components/Stats';
// import Footer from './components/Footer';

const queryClient = new QueryClient();

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [quickActionsAnchor, setQuickActionsAnchor] = useState<null | HTMLElement>(null);
  const location = useLocation();
  const isQuickActionsOpen = Boolean(quickActionsAnchor);

  const navLinks = [
    { label: 'Saison', to: '/saisonList' },
    { label: 'Teams', to: '/saisonList' },
    { label: 'Matches', to: '/saisonList' },
    { label: 'Stats', to: '/saisonList' },
  ];

  const quickActions = [
    { label: 'Create New Saison', to: '/createSaison' },
    { label: 'Join Tournament', to: '/joinTournament' },
  ];

  const isActive = (to: string) => location.pathname === to;

  return (
    <QueryClientProvider client={queryClient}>
      <div className="main-container">
        <AppBar position="fixed" className="top-header" elevation={0}>
          <Toolbar className="header-toolbar">
            <Typography component={Link} to="/" className="header-title">
              Efootball Tournament Hub
            </Typography>

            <Box className="desktop-nav">
              {navLinks.map((link) => (
                <Typography
                  key={link.label}
                  component={Link}
                  to={link.to}
                  className={`nav-link ${isActive(link.to) ? 'active' : ''}`}
                >
                  {link.label}
                </Typography>
              ))}
              <button
                type="button"
                className="quick-actions-trigger"
                onClick={(event) => setQuickActionsAnchor(event.currentTarget)}
              >
                Quick Actions
                <span className="caret-down" aria-hidden="true">▼</span>
              </button>
              <Menu
                anchorEl={quickActionsAnchor}
                open={isQuickActionsOpen}
                onClose={() => setQuickActionsAnchor(null)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{ className: 'quick-actions-menu' }}
              >
                {quickActions.map((action) => (
                  <MenuItem
                    key={action.label}
                    component={Link}
                    to={action.to}
                    onClick={() => setQuickActionsAnchor(null)}
                  >
                    {action.label}
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <IconButton
              color="inherit"
              edge="end"
              className="mobile-menu-button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
            >
              <span className="hamburger-icon" aria-hidden="true">☰</span>
            </IconButton>
          </Toolbar>
        </AppBar>

        <Drawer
          anchor="right"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          PaperProps={{ className: 'mobile-drawer' }}
        >
          <Box className="mobile-drawer-content" role="presentation" onClick={() => setMobileOpen(false)}>
            <Typography className="mobile-drawer-title">Menu</Typography>
            <List>
              {navLinks.map((link) => (
                <ListItemButton key={link.label} component={Link} to={link.to}>
                  <ListItemText primary={link.label} />
                </ListItemButton>
              ))}
            </List>
            <Divider />
            <Typography className="mobile-drawer-title">Quick Actions</Typography>
            <List>
              {quickActions.map((action) => (
                <ListItemButton key={action.label} component={Link} to={action.to}>
                  <ListItemText primary={action.label} />
                </ListItemButton>
              ))}
            </List>
          </Box>
        </Drawer>

        <main className="main-content">
          {location.pathname === '/' && (
            <section className="hero-section">
              <h1 className="hero-title">The Ultimate Efootball Command Center</h1>
              <p className="hero-subtext">
                Organize seasons, manage pro team rosters, and track live tournament brackets in one
                professional interface.
              </p>
              <div className="hero-cta-group">
                <Link to="/saisonList" className="hero-btn hero-btn-primary">
                  View Active Saison
                </Link>
                <Link to="/saisonList" className="hero-btn hero-btn-outline">
                  Explore Stats
                </Link>
              </div>
            </section>
          )}
          {location.pathname !== '/' && (
            <Routes>
              <Route path="/createSaison" element={<CreateSaisonForm />} />
              <Route path="/createTournament/:id" element={<CreateTournamentForm />} />
              <Route path="/joinTournament" element={<JoinTournamentForm />} />
              <Route path="/saisonList" element={<SaisonList />} />
              <Route path="/saisonDetails/:id" element={<SaisonDetails />} />
              <Route path="/tournamentsDetails/:id" element={<TournamentsDetails />} />
              <Route path="/createTeam/:id" element={<CreateTeamForm />} />
              <Route path="/teamsDetails/:id" element={<TeamsDetails />} />
              <Route path="/createPlayer/:id" element={<CreatePlayerForm />} />
              {/* <Route path="/tournamentBracket/:id" element={<TournamentBracket id={0} />} /> */}
              <Route path="/tournaments/:id/bracket" element={<TournamentBracket/>} />
            </Routes>
          )}
        </main>
      </div>
    </QueryClientProvider>
  )
}



export default App
