import { Box, Typography, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { weatherService } from '../services/weatherService';
import type { WeatherData } from '../services/weatherService';

const CurrentWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await weatherService.getCurrentWeather();
        setWeather(data);
      } catch (err) {
        setError('Failed to fetch current weather data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!weather) {
    return null;
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {new Date(weather.date).toLocaleDateString()}
      </Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        <Typography variant="h4">
          {weather.temperature}°C
        </Typography>
        <Typography>
          Humidity: {weather.humidity}%
        </Typography>
        <Typography>
          Precipitation: {weather.precipitation}mm
        </Typography>
      </Box>
    </Box>
  );
};

export default CurrentWeather; 