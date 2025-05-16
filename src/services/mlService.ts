import { readFileSync } from 'fs';
import { parse } from 'csv-parse/sync';
import * as tf from '@tensorflow/tfjs-node';

// Function to read and parse the CSV file
export const loadData = () => {
  const fileContent = readFileSync('./Bucharest_Hist_Temp.csv', 'utf-8');
  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
  });
  return records;
};

// Function to preprocess the data
export const preprocessData = (data: any[]) => {
  // Example preprocessing steps:
  // 1. Convert date strings to Date objects
  // 2. Handle missing values
  // 3. Normalize numerical features
  // 4. Encode categorical features

  const processedData = data.map((record) => {
    // Convert date strings to Date objects
    const dt_iso = new Date(record.dt_iso);

    // Handle missing values
    const visibility = record.visibility || 0; // Replace missing visibility with 0
    const dew_point = record.dew_point || 0; // Replace missing dew_point with 0

    // Normalize numerical features (example: temperature)
    const temp = (record.temp - 0) / 40; // Normalize temperature to [0, 1] range

    // Encode categorical features (example: weather_main)
    const weather_main = record.weather_main || 'Unknown'; // Replace missing weather_main with 'Unknown'

    return {
      ...record,
      dt_iso,
      visibility,
      dew_point,
      temp,
      weather_main,
    };
  });

  return processedData;
};

// Function to train the ML model
export const trainModel = (processedData: any[]) => {
  // Example: Simple linear regression model
  const X = processedData.map((record) => Number(record.temp)); // Feature: temperature
  const y = processedData.map((record) => Number(record.feels_like)); // Target: feels like temperature

  // Calculate the mean of X and y
  const meanX = X.reduce((a, b) => a + b, 0) / X.length;
  const meanY = y.reduce((a, b) => a + b, 0) / y.length;

  // Calculate the slope (m) and intercept (b) for the linear regression model
  let numerator = 0;
  let denominator = 0;
  for (let i = 0; i < X.length; i++) {
    numerator += (X[i] - meanX) * (y[i] - meanY);
    denominator += Math.pow(X[i] - meanX, 2);
  }
  const slope = numerator / denominator;
  const intercept = meanY - slope * meanX;

  // Predict values
  const y_pred = X.map((x) => slope * x + intercept);

  // Calculate R^2 (coefficient of determination)
  const ssRes = y.reduce((sum, yi, i) => sum + Math.pow(yi - y_pred[i], 2), 0);
  const ssTot = y.reduce((sum, yi) => sum + Math.pow(yi - meanY, 2), 0);
  const r2 = 1 - ssRes / ssTot;

  // Calculate RMSE (root mean squared error)
  const mse = y.reduce((sum, yi, i) => sum + Math.pow(yi - y_pred[i], 2), 0) / y.length;
  const rmse = Math.sqrt(mse);

  // Print training set size and number of parameters
  console.log('Training set size:', X.length);
  console.log('Number of model parameters:', 2); // slope and intercept

  console.log('Linear Regression Model:');
  console.log('Slope (m):', slope);
  console.log('Intercept (b):', intercept);
  console.log('R^2:', r2);
  console.log('RMSE:', rmse);
};

// Function to set up and train a neural network
export const trainNeuralNetwork = (processedData: any[]) => {
  // Prepare features and target
  const features = processedData.map((record) => [
    Number(record.temp),
    Number(record.dew_point),
    Number(record.pressure),
    Number(record.wind_speed),
    Number(record.clouds_all),
  ]);
  const target = processedData.map((record) => Number(record.feels_like));

  // Convert to tensors
  const xs = tf.tensor2d(features);
  const ys = tf.tensor1d(target);

  // Define the model
  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 10, activation: 'relu', inputShape: [5] }));
  model.add(tf.layers.dense({ units: 1 }));

  // Compile the model
  model.compile({ optimizer: 'adam', loss: 'meanSquaredError' });

  // Train the model
  model.fit(xs, ys, { epochs: 10 }).then(() => {
    console.log('Neural Network Training Complete');
    // Evaluate the model
    const predictions = model.predict(xs) as tf.Tensor;
    const mse = tf.losses.meanSquaredError(ys, predictions);
    const rmse = tf.sqrt(mse);
    console.log('RMSE:', rmse.dataSync()[0]);
  });
};

// Main function to orchestrate the ML workflow
export const runMLWorkflow = async () => {
  const data = loadData();
  const processedData = preprocessData(data);
  await trainNeuralNetwork(processedData);
};

// Function to test the preprocessing steps and model on the full dataset
export const testModelOnFullData = () => {
  const data = loadData();
  const processedData = preprocessData(data);
  trainModel(processedData);
};

// Call the test function
testModelOnFullData();

// Call the main function
runMLWorkflow(); 