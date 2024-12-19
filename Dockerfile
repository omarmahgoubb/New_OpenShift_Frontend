# Step 1: Build the Angular application
FROM node:18-alpine as build
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the application source code
COPY . .

# Build the Angular application for production
RUN npm run build --prod

# Step 2: Serve the application using Nginx
FROM nginx:alpine
COPY --from=build /app/dist/first-angular-app /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
