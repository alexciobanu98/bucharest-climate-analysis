import { ThemeProvider, createTheme, CssBaseline, AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Forecaster from './pages/Forecaster';
import Analysis from './pages/Analysis';
import About from './pages/About';
import MLTrainer from './pages/MLTrainer';
import { styled } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
  },
});

const NavLink = styled(Link)(({ theme }) => ({
  color: 'white',
  textDecoration: 'none',
  margin: theme.spacing(0, 2),
  '&:hover': {
    textDecoration: 'underline',
  },
}));

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)' }}>
          <AppBar position="static" sx={{ 
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
            width: '100vw',
            left: 0,
            right: 0,
          }}>
            <Toolbar sx={{ maxWidth: '1600px', width: '100%', mx: 'auto' }}>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#1a237e' }}>
                Bucharest Climate Analysis
              </Typography>
              <NavLink to="/" style={{ color: '#1a237e' }}>Home</NavLink>
              <NavLink to="/forecaster" style={{ color: '#1a237e' }}>Forecaster</NavLink>
              <NavLink to="/analysis" style={{ color: '#1a237e' }}>Analysis</NavLink>
              <NavLink to="/about" style={{ color: '#1a237e' }}>About</NavLink>
              <NavLink to="/ml-trainer" style={{ color: '#1a237e' }}>ML Trainer</NavLink>
            </Toolbar>
          </AppBar>

          <Container 
            component="main" 
            maxWidth="xl" 
            sx={{ 
              flexGrow: 1, 
              py: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              px: { xs: 2, sm: 3, md: 4 }
            }}
          >
            <Box sx={{ width: '100%', maxWidth: '1400px' }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/forecaster" element={<Forecaster />} />
                <Route path="/analysis" element={<Analysis />} />
                <Route path="/about" element={<About />} />
                <Route path="/ml-trainer" element={<MLTrainer />} />
              </Routes>
            </Box>
          </Container>

          <Box 
            component="footer" 
            sx={{ 
              py: 3, 
              bgcolor: 'background.paper', 
              textAlign: 'center',
              width: '100%'
            }}
          >
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} Bucharest Climate Analysis
            </Typography>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
