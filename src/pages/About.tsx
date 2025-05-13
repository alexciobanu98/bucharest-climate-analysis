import { Box, Typography, Paper, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  margin: theme.spacing(2, 0),
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  maxWidth: 700,
  width: '100%',
  mx: 'auto',
}));

const About = () => (
  <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', py: 8 }}>
    <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <StyledPaper>
        <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ color: '#1a237e', mb: 2 }}>
          About the Project
        </Typography>
        <Typography variant="h6" gutterBottom sx={{ color: '#1a237e' }}>
          Purpose
        </Typography>
        <Typography paragraph sx={{ color: '#1a237e' }}>
          This platform provides comprehensive climate analysis tools for Bucharest, helping users understand and predict weather patterns and climate changes. We leverage 46 years of historical weather data and modern machine learning to deliver insights and forecasts.
        </Typography>
        <Typography variant="h6" gutterBottom sx={{ color: '#1a237e' }}>
          Data Sources
        </Typography>
        <Typography paragraph sx={{ color: '#1a237e' }}>
          Our analysis is based on daily temperature, humidity, and precipitation records collected in Bucharest from 1978 to the present. Data is sourced from reputable meteorological agencies and open climate datasets.
        </Typography>
        <Typography variant="h6" gutterBottom sx={{ color: '#1a237e' }}>
          Team & Credits
        </Typography>
        <Typography paragraph sx={{ color: '#1a237e' }}>
          Developed by a passionate team of data scientists and engineers. Special thanks to the open-source community and climate data providers.
        </Typography>
      </StyledPaper>
    </Container>
  </Box>
);

export default About; 