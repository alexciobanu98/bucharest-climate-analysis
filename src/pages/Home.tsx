import { Box, Typography, Paper, Grid, CardContent, Button, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(2, 0),
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'stretch',
}));

const StyledCardContent = styled(CardContent)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100%',
});

const Home = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box sx={{ 
        flex: 1,
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)',
        py: 4,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <Container maxWidth="xl" sx={{ 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flex: 1
        }}>
          <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ color: '#1a237e', mb: 4 }}>
            Welcome to Bucharest Climate Analysis
          </Typography>

          <Grid container spacing={3} justifyContent="center" alignItems="stretch" sx={{ width: '100%', maxWidth: 1400, mx: 'auto' }}>
            <Grid item xs={12} md={4} display="flex">
              <StyledPaper>
                <StyledCardContent>
                  <Box>
                    <Typography variant="h5" gutterBottom sx={{ color: '#1a237e' }}>
                      Climate Forecaster
                    </Typography>
                    <Typography paragraph sx={{ color: '#1a237e' }}>
                      Explore historical climate data and future predictions for Bucharest. Analyze temperature trends, humidity levels, and precipitation patterns.
                    </Typography>
                  </Box>
                  <Button 
                    component={Link} 
                    to="/forecaster" 
                    variant="contained" 
                    fullWidth
                    sx={{
                      bgcolor: '#1a237e',
                      mt: 2,
                      '&:hover': {
                        bgcolor: '#283593',
                      },
                    }}
                  >
                    Open Forecaster
                  </Button>
                </StyledCardContent>
              </StyledPaper>
            </Grid>

            <Grid item xs={12} md={4} display="flex">
              <StyledPaper>
                <StyledCardContent>
                  <Box>
                    <Typography variant="h5" gutterBottom sx={{ color: '#1a237e' }}>
                      Climate Analysis
                    </Typography>
                    <Typography paragraph sx={{ color: '#1a237e' }}>
                      Dive deep into climate trends and patterns. View detailed analysis of temperature variations, seasonal changes, and climate impact indicators.
                    </Typography>
                  </Box>
                  <Button 
                    component={Link} 
                    to="/analysis" 
                    variant="contained" 
                    fullWidth
                    sx={{
                      bgcolor: '#1a237e',
                      mt: 2,
                      '&:hover': {
                        bgcolor: '#283593',
                      },
                    }}
                  >
                    View Analysis
                  </Button>
                </StyledCardContent>
              </StyledPaper>
            </Grid>

            <Grid item xs={12} md={4} display="flex">
              <StyledPaper>
                <StyledCardContent>
                  <Box>
                    <Typography variant="h5" gutterBottom sx={{ color: '#1a237e' }}>
                      About the Project
                    </Typography>
                    <Typography paragraph sx={{ color: '#1a237e' }}>
                      This project provides comprehensive climate analysis tools for Bucharest, helping understand and predict weather patterns and climate changes.
                    </Typography>
                  </Box>
                  <Button 
                    component={Link} 
                    to="/about" 
                    variant="outlined" 
                    fullWidth
                    sx={{
                      color: '#1a237e',
                      borderColor: '#1a237e',
                      mt: 2,
                      '&:hover': {
                        borderColor: '#283593',
                        bgcolor: 'rgba(26, 35, 126, 0.1)',
                      },
                    }}
                  >
                    Learn More
                  </Button>
                </StyledCardContent>
              </StyledPaper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 