import { Box, Typography, Paper, Grid, Tabs, Tab, Card, CardContent, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { mockHistoricalData } from '../services/mockData';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(2),
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`analysis-tabpanel-${index}`}
      aria-labelledby={`analysis-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Analysis = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Calculate monthly averages
  const monthlyData = mockHistoricalData.reduce((acc: any[], data) => {
    const month = new Date(data.date).getMonth();
    if (!acc[month]) {
      acc[month] = { month, temperature: 0, count: 0 };
    }
    acc[month].temperature += data.temperature;
    acc[month].count += 1;
    return acc;
  }, []).map(data => ({
    month: new Date(0, data.month).toLocaleString('default', { month: 'long' }),
    temperature: data.temperature / data.count
  }));

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
            Climate Analysis
          </Typography>

          <StyledPaper sx={{ width: '100%' }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              centered
              sx={{ 
                borderBottom: 1, 
                borderColor: 'divider',
                '& .MuiTab-root': {
                  color: '#1a237e',
                  '&.Mui-selected': {
                    color: '#1a237e',
                  },
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: '#1a237e',
                },
              }}
            >
              <Tab label="Temperature Trends" />
              <Tab label="Seasonal Analysis" />
              <Tab label="Climate Impact" />
            </Tabs>

            <TabPanel value={tabValue} index={0}>
              <Grid container spacing={3}>
                <Grid sx={{ gridColumn: 'span 12' }}>
                  <Typography variant="h6" gutterBottom sx={{ color: '#1a237e' }}>
                    Annual Temperature Trends
                  </Typography>
                  <Box height={400}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={mockHistoricalData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                        <XAxis 
                          dataKey="date" 
                          tickFormatter={(date) => new Date(date).toLocaleDateString()}
                          stroke="#1a237e"
                        />
                        <YAxis 
                          label={{ 
                            value: 'Temperature (°C)',
                            angle: -90,
                            position: 'insideLeft',
                            fill: '#1a237e'
                          }}
                          stroke="#1a237e"
                        />
                        <Tooltip 
                          labelFormatter={(date) => new Date(date).toLocaleDateString()}
                          formatter={(value: number) => [`${value}°C`, 'Temperature']}
                          contentStyle={{
                            background: 'rgba(255, 255, 255, 0.95)',
                            border: '1px solid rgba(26, 35, 126, 0.2)',
                            borderRadius: '8px',
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="temperature" 
                          stroke="#1a237e" 
                          name="Temperature"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </Box>
                </Grid>
              </Grid>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <Grid container spacing={3}>
                <Grid sx={{ gridColumn: 'span 12' }}>
                  <Typography variant="h6" gutterBottom sx={{ color: '#1a237e' }}>
                    Monthly Temperature Averages
                  </Typography>
                  <Box height={400}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                        <XAxis dataKey="month" stroke="#1a237e" />
                        <YAxis 
                          label={{ 
                            value: 'Average Temperature (°C)',
                            angle: -90,
                            position: 'insideLeft',
                            fill: '#1a237e'
                          }}
                          stroke="#1a237e"
                        />
                        <Tooltip 
                          formatter={(value: number) => [`${value.toFixed(1)}°C`, 'Average Temperature']}
                          contentStyle={{
                            background: 'rgba(255, 255, 255, 0.95)',
                            border: '1px solid rgba(26, 35, 126, 0.2)',
                            borderRadius: '8px',
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                          }}
                        />
                        <Bar 
                          dataKey="temperature" 
                          fill="#1a237e" 
                          name="Average Temperature"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>
                </Grid>
              </Grid>
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              <Grid container spacing={3}>
                <Grid sx={{ gridColumn: { xs: 'span 12', md: 'span 6' } }}>
                  <Card sx={{ 
                    background: 'rgba(255, 255, 255, 0.95)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom sx={{ color: '#1a237e' }}>
                        Climate Change Indicators
                      </Typography>
                      <Typography paragraph sx={{ color: '#1a237e' }}>
                        • Rising average temperatures
                      </Typography>
                      <Typography paragraph sx={{ color: '#1a237e' }}>
                        • Increased frequency of extreme weather events
                      </Typography>
                      <Typography paragraph sx={{ color: '#1a237e' }}>
                        • Shifting precipitation patterns
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid sx={{ gridColumn: { xs: 'span 12', md: 'span 6' } }}>
                  <Card sx={{ 
                    background: 'rgba(255, 255, 255, 0.95)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom sx={{ color: '#1a237e' }}>
                        Future Projections
                      </Typography>
                      <Typography paragraph sx={{ color: '#1a237e' }}>
                        • Continued temperature rise
                      </Typography>
                      <Typography paragraph sx={{ color: '#1a237e' }}>
                        • More frequent heat waves
                      </Typography>
                      <Typography paragraph sx={{ color: '#1a237e' }}>
                        • Changes in seasonal patterns
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </TabPanel>
          </StyledPaper>
        </Container>
      </Box>
    </Box>
  );
};

export default Analysis; 