import axios from 'axios';
import { mockCurrentWeather, mockHistoricalData, mockForecastData } from './mockData';

// Types for our weather data
export interface WeatherData {
  date: string;
  temperature: number;
  humidity: number;
  precipitation: number;
}

export interface ForecastData {
  date: string;
  predictedTemperature: number;
  confidence: number;
}

class WeatherService {
  private baseUrl = 'http://localhost:3000/api'; // We'll set up the backend later

  async getCurrentWeather(): Promise<WeatherData> {
    // For testing, return mock data
    return mockCurrentWeather;
    
    // TODO: Uncomment when backend is ready
    // try {
    //   const response = await axios.get(`${this.baseUrl}/current-weather`);
    //   return response.data;
    // } catch (error) {
    //   console.error('Error fetching current weather:', error);
    //   throw error;
    // }
  }

  async getHistoricalData(startDate: string, endDate: string): Promise<WeatherData[]> {
    // For testing, return mock data filtered by date range
    return mockHistoricalData.filter(data => 
      data.date >= startDate && data.date <= endDate
    );
    
    // TODO: Uncomment when backend is ready
    // try {
    //   const response = await axios.get(`${this.baseUrl}/historical-data`, {
    //     params: { startDate, endDate }
    //   });
    //   return response.data;
    // } catch (error) {
    //   console.error('Error fetching historical data:', error);
    //   throw error;
    // }
  }

  async getForecast(): Promise<ForecastData[]> {
    // For testing, return mock data
    return mockForecastData;
    
    // TODO: Uncomment when backend is ready
    // try {
    //   const response = await axios.get(`${this.baseUrl}/forecast`);
    //   return response.data;
    // } catch (error) {
    //   console.error('Error fetching forecast:', error);
    //   throw error;
    // }
  }
}

export const weatherService = new WeatherService(); 