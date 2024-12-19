# Step 1: Build the Angular application
FROM node:18-alpine as build
WORKDIR /app

# Install dependencies and Angular CLI globally
COPY package*.json ./
RUN npm install
RUN npm install -g @angular/cli

# Copy the application source code
COPY . .

# Ensure Angular CLI is executable
RUN chmod +x /usr/local/bin/ng

# Build the Angular application for production
RUN ng build --configuration production

# Step 2: Serve the application using Nginx
FROM nginx:alpine
COPY --from=build /app/dist/first-angular-app /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
