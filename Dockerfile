# Use Node.js as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Install Angular CLI globally
RUN npm install -g @angular/cli@18

# Disable Angular CLI cache (as a fallback)
ENV NG_DISABLE_CACHE=true

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Expose port 4200 to the host
EXPOSE 4200

# Clear Angular cache directory before starting the server
CMD ["sh", "-c", "rm -rf /app/.angular/cache && ng serve --host 0.0.0.0 --port 4200"]
