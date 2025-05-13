import { Box, Container, Typography, Paper, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import CurrentWeather from './CurrentWeather';
import TemperatureForecast from './TemperatureForecast';
import HistoricalDataAnalysis from './HistoricalDataAnalysis';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(2),
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
}));

const Dashboard = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Bucharest Weather Forecast
        </Typography>
        
        <Grid container spacing={3}>
          <Grid component="div" xs={12} md={6}>
            <StyledPaper>
              <CurrentWeather />
            </StyledPaper>
          </Grid>
          
          <Grid component="div" xs={12} md={6}>
            <StyledPaper>
              <TemperatureForecast />
            </StyledPaper>
          </Grid>
          
          <Grid component="div" xs={12}>
            <StyledPaper>
              <HistoricalDataAnalysis />
            </StyledPaper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard; 