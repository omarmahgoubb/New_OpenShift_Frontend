# Step 1: Build the Angular application
FROM node:18-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the Angular application for production
RUN ng build --configuration production

# Step 2: Serve the built application with Nginx
FROM nginx:latest

# Copy the built Angular application from the previous stage
COPY --from=build /app/dist/first-angular-app /usr/share/nginx/html

# Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

