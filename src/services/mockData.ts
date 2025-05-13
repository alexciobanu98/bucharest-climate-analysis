import type { WeatherData, ForecastData } from './weatherService';

// Generate mock historical data
const generateHistoricalData = (): WeatherData[] => {
  const data: WeatherData[] = [];
  const startDate = new Date('1978-01-01');
  const endDate = new Date();
  
  for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
    // Generate temperature between -10 and 35 degrees
    const temperature = Math.random() * 45 - 10;
    // Generate humidity between 30% and 90%
    const humidity = Math.random() * 60 + 30;
    // Generate precipitation between 0 and 50mm
    const precipitation = Math.random() * 50;

    data.push({
      date: date.toISOString().split('T')[0],
      temperature: Number(temperature.toFixed(1)),
      humidity: Number(humidity.toFixed(1)),
      precipitation: Number(precipitation.toFixed(1))
    });
  }

  return data;
};

// Generate mock forecast data
const generateForecastData = (): ForecastData[] => {
  const data: ForecastData[] = [];
  const today = new Date();
  
  for (let i = 1; i <= 30; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    
    // Generate predicted temperature between 15 and 30 degrees
    const predictedTemperature = Math.random() * 15 + 15;
    // Generate confidence between 70% and 95%
    const confidence = Math.random() * 25 + 70;

    data.push({
      date: date.toISOString().split('T')[0],
      predictedTemperature: Number(predictedTemperature.toFixed(1)),
      confidence: Number(confidence.toFixed(1))
    });
  }

  return data;
};

export const mockHistoricalData = generateHistoricalData();
export const mockForecastData = generateForecastData();
export const mockCurrentWeather: WeatherData = {
  date: new Date().toISOString().split('T')[0],
  temperature: 22.5,
  humidity: 65,
  precipitation: 0
}; 