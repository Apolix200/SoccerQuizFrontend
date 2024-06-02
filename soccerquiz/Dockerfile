# Use an official Node.js runtime as the base image
FROM node:18 as build-stage

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install - force

# Copy app source code to the working directory
COPY . .

# Build the app
RUN npm run build