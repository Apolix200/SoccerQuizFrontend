# Use an official Node.js runtime as the base image
FROM node:18 as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./


# Install dependencies
RUN npm install

# Copy app source code to the working directory
COPY . .

# Build the app
RUN npm run build

# Use an official Nginx runtime as a parent image
FROM nginx:alpine

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the build output from the build stage to the nginx web server directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port or by default port 80 to the outside world
EXPOSE 3000

# Start Nginx when the container is run
CMD ["nginx", "-g", "daemon off;"]