import { Box, Typography, Paper, Grid, FormControl, InputLabel, Select, MenuItem, Slider, Card, CardContent, Button, Stack, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { mockHistoricalData, mockForecastData } from '../services/mockData';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(2),
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
}));

const ControlCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
}));

const Forecaster = () => {
  const [timeRange, setTimeRange] = useState<number[]>([1978, 2024]);
  const [selectedMetric, setSelectedMetric] = useState('temperature');
  const [viewMode, setViewMode] = useState('historical');

  const handleTimeRangeChange = (event: Event, newValue: number | number[]) => {
    setTimeRange(newValue as number[]);
  };

  const handleMetricChange = (event: any) => {
    setSelectedMetric(event.target.value);
  };

  const filteredData = mockHistoricalData.filter(
    data => parseInt(data.date.split('-')[0]) >= timeRange[0] && 
            parseInt(data.date.split('-')[0]) <= timeRange[1]
  );

  const getMetricLabel = () => {
    switch(selectedMetric) {
      case 'temperature': return 'Temperature (°C)';
      case 'humidity': return 'Humidity (%)';
      case 'precipitation': return 'Precipitation (mm)';
      default: return '';
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)', py: 4, alignItems: 'center' }}>
      <Container maxWidth="xl" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
        <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ color: '#1a237e', mb: 4 }}>
          Climate Forecaster
        </Typography>
        <Grid container spacing={3} sx={{ width: '100%' }}>
          <Grid sx={{ gridColumn: { xs: 'span 12', md: 'span 3' } }}>
            <ControlCard>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ color: '#1a237e' }}>
                  Controls
                </Typography>
                
                <Stack spacing={3}>
                  <FormControl fullWidth>
                    <InputLabel>Metric</InputLabel>
                    <Select
                      value={selectedMetric}
                      label="Metric"
                      onChange={handleMetricChange}
                    >
                      <MenuItem value="temperature">Temperature</MenuItem>
                      <MenuItem value="humidity">Humidity</MenuItem>
                      <MenuItem value="precipitation">Precipitation</MenuItem>
                    </Select>
                  </FormControl>

                  <Box>
                    <Typography gutterBottom sx={{ color: '#1a237e' }}>
                      Time Range: {timeRange[0]} - {timeRange[1]}
                    </Typography>
                    <Slider
                      value={timeRange}
                      onChange={handleTimeRangeChange}
                      valueLabelDisplay="auto"
                      min={1978}
                      max={2024}
                      sx={{
                        color: '#1a237e',
                        '& .MuiSlider-thumb': {
                          boxShadow: '0 2px 8px rgba(26, 35, 126, 0.2)',
                        },
                      }}
                    />
                  </Box>

                  <Stack direction="row" spacing={2}>
                    <Button 
                      variant={viewMode === 'historical' ? 'contained' : 'outlined'}
                      onClick={() => setViewMode('historical')}
                      fullWidth
                      sx={{
                        bgcolor: viewMode === 'historical' ? '#1a237e' : 'transparent',
                        color: viewMode === 'historical' ? 'white' : '#1a237e',
                        borderColor: '#1a237e',
                        '&:hover': {
                          bgcolor: viewMode === 'historical' ? '#283593' : 'rgba(26, 35, 126, 0.1)',
                        },
                      }}
                    >
                      Historical
                    </Button>
                    <Button 
                      variant={viewMode === 'forecast' ? 'contained' : 'outlined'}
                      onClick={() => setViewMode('forecast')}
                      fullWidth
                      sx={{
                        bgcolor: viewMode === 'forecast' ? '#1a237e' : 'transparent',
                        color: viewMode === 'forecast' ? 'white' : '#1a237e',
                        borderColor: '#1a237e',
                        '&:hover': {
                          bgcolor: viewMode === 'forecast' ? '#283593' : 'rgba(26, 35, 126, 0.1)',
                        },
                      }}
                    >
                      Forecast
                    </Button>
                  </Stack>
                </Stack>
              </CardContent>
            </ControlCard>
          </Grid>

          <Grid sx={{ gridColumn: { xs: 'span 12', md: 'span 9' } }}>
            <StyledPaper>
              <Typography variant="h6" gutterBottom sx={{ color: '#1a237e' }}>
                {viewMode === 'historical' ? 'Historical Data' : 'Future Predictions'}
              </Typography>
              <Box height={500}>
                <ResponsiveContainer width="100%" height="100%">
                  {viewMode === 'historical' ? (
                    <AreaChart data={filteredData}>
                      <defs>
                        <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#1a237e" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#1a237e" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                      <XAxis 
                        dataKey="date" 
                        tickFormatter={(date) => new Date(date).toLocaleDateString()}
                        stroke="#1a237e"
                      />
                      <YAxis 
                        label={{ 
                          value: getMetricLabel(),
                          angle: -90,
                          position: 'insideLeft',
                          fill: '#1a237e'
                        }}
                        stroke="#1a237e"
                      />
                      <Tooltip 
                        labelFormatter={(date) => new Date(date).toLocaleDateString()}
                        formatter={(value: number) => [
                          `${value}${selectedMetric === 'temperature' ? '°C' : 
                                    selectedMetric === 'humidity' ? '%' : 'mm'}`,
                          selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)
                        ]}
                        contentStyle={{
                          background: 'rgba(255, 255, 255, 0.95)',
                          border: '1px solid rgba(26, 35, 126, 0.2)',
                          borderRadius: '8px',
                          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey={selectedMetric} 
                        stroke="#1a237e" 
                        fillOpacity={1}
                        fill="url(#colorTemp)"
                        name={selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)}
                      />
                    </AreaChart>
                  ) : (
                    <AreaChart data={mockForecastData}>
                      <defs>
                        <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#1a237e" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#1a237e" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                      <XAxis 
                        dataKey="date" 
                        tickFormatter={(date) => new Date(date).toLocaleDateString()}
                        stroke="#1a237e"
                      />
                      <YAxis 
                        label={{ 
                          value: 'Predicted Temperature (°C)',
                          angle: -90,
                          position: 'insideLeft',
                          fill: '#1a237e'
                        }}
                        stroke="#1a237e"
                      />
                      <Tooltip 
                        labelFormatter={(date) => new Date(date).toLocaleDateString()}
                        formatter={(value: number) => [`${value}°C`, 'Predicted Temperature']}
                        contentStyle={{
                          background: 'rgba(255, 255, 255, 0.95)',
                          border: '1px solid rgba(26, 35, 126, 0.2)',
                          borderRadius: '8px',
                          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="predictedTemperature" 
                        stroke="#1a237e" 
                        fillOpacity={1}
                        fill="url(#colorForecast)"
                        name="Predicted Temperature"
                      />
                    </AreaChart>
                  )}
                </ResponsiveContainer>
              </Box>
            </StyledPaper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Forecaster; 