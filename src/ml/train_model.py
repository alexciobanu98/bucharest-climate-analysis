import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout, BatchNormalization
from tensorflow.keras.callbacks import EarlyStopping
from tensorflow.keras.regularizers import l2
import os

# Load and preprocess the data
def load_data():
    """Load the weather data from CSV"""
    return pd.read_csv('Bucharest_Hist_Temp.csv')

def preprocess_data(df):
    """Preprocess the data for training"""
    # Debug: print first 10 dt_iso values before replacement
    print("Before replacement:", df['dt_iso'].head(10).tolist())
    # Use regex to remove the trailing ' +0000 UTC'
    df['dt_iso_clean'] = df['dt_iso'].str.replace(r' \+0000 UTC$', '', regex=True)
    print("After replacement:", df['dt_iso_clean'].head(10).tolist())
    df['dt_iso'] = pd.to_datetime(df['dt_iso_clean'])
    
    # Extract time-based features
    df['hour'] = df['dt_iso'].dt.hour
    df['day'] = df['dt_iso'].dt.day
    df['month'] = df['dt_iso'].dt.month
    df['year'] = df['dt_iso'].dt.year
    
    # One-hot encode weather_main
    weather_dummies = pd.get_dummies(df['weather_main'], prefix='weather')
    
    # Select features and target
    features = [
        'visibility', 'dew_point', 'feels_like', 'temp_min', 'temp_max',
        'pressure', 'wind_speed', 'wind_deg', 'clouds_all',
        'hour', 'day', 'month', 'year'
    ] + list(weather_dummies.columns)
    target = 'temp'
    
    # Handle missing values
    df = df.fillna(method='ffill')
    # Concatenate one-hot encoded columns
    df = pd.concat([df, weather_dummies], axis=1)
    
    # Scale features
    scaler = StandardScaler()
    X = scaler.fit_transform(df[features])
    y = df[target].values
    
    return X, y, scaler

def create_model(input_shape):
    """Create an improved neural network model"""
    model = Sequential([
        Dense(128, activation='relu', kernel_regularizer=l2(0.001), input_shape=input_shape),
        BatchNormalization(),
        Dropout(0.3),
        Dense(64, activation='relu', kernel_regularizer=l2(0.001)),
        BatchNormalization(),
        Dropout(0.2),
        Dense(32, activation='relu', kernel_regularizer=l2(0.001)),
        Dense(1)  # Output layer for temperature prediction
    ])
    model.compile(optimizer='adam', loss='mse', metrics=['mae'])
    return model

def train_model():
    """Train the neural network model"""
    # Load and preprocess data
    df = load_data()
    X, y, scaler = preprocess_data(df)
    
    # Split data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Create and train model
    model = create_model((X.shape[1],))
    
    # Early stopping to prevent overfitting
    early_stopping = EarlyStopping(
        monitor='val_loss',
        patience=10,
        restore_best_weights=True
    )
    
    # Train the model
    history = model.fit(
        X_train, y_train,
        epochs=100,
        batch_size=32,
        validation_split=0.2,
        callbacks=[early_stopping],
        verbose=1
    )
    
    # Evaluate the model
    test_loss, test_mae = model.evaluate(X_test, y_test, verbose=0)
    print(f"\nTest MAE: {test_mae:.2f}°C")
    
    # Save the model and scaler
    os.makedirs('models', exist_ok=True)
    model.save('models/weather_model.h5')
    np.save('models/scaler.npy', scaler)
    
    return model, scaler

if __name__ == "__main__":
    train_model() 