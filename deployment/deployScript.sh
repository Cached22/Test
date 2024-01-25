#!/bin/bash

# Legal Mate Deployment Script

# Exit script on any error
set -e

# Define the path to the configuration file
CONFIG_PATH="./backend/config.js"

# Check if configuration file exists
if [ ! -f "$CONFIG_PATH" ]; then
  echo "Configuration file not found at $CONFIG_PATH"
  exit 1
fi

# Load configuration
source $CONFIG_PATH

# Echo starting deployment process
echo "Starting deployment process for Legal Mate..."

# Install backend dependencies
echo "Installing backend dependencies..."
cd backend
npm install
echo "Backend dependencies installed."

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd ../frontend
npm install
echo "Frontend dependencies installed."

# Build the frontend
echo "Building the frontend..."
npm run build
echo "Frontend built successfully."

# Navigate back to the root directory
cd ..

# Start database management script
echo "Setting up the database..."
./deployment/dbManagementScript.sh
echo "Database setup complete."

# Start the backend server
echo "Starting the backend server..."
cd backend
npm start &
echo "Backend server started."

# Echo deployment complete
echo "Legal Mate has been deployed successfully!"

# Exit script
exit 0