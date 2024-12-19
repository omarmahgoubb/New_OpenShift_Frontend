# Use Node.js as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Add a non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Change ownership of the working directory to the non-root user
RUN chown -R appuser:appgroup /app

# Install Angular CLI globally
RUN npm install -g @angular/cli@18

# Switch to the non-root user
USER appuser

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Expose port 4200 to the host
EXPOSE 4200

# Run the Angular application using ng serve
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200"]