# Step 1: Build the Angular app
FROM node:18-alpine AS build
WORKDIR /app
RUN npm install -g @angular/cli@latest
COPY package*.json ./
RUN npm install
COPY . .
RUN ng build --configuration production

# Step 2: Use nginx to serve the built files
FROM nginx:latest

# Overwrite nginx.conf without user directive
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the Angular build output
COPY --from=build /app/dist/first-angular-app /usr/share/nginx/html

# Copy your default.conf into the conf.d directory
COPY default.conf /etc/nginx/conf.d/default.conf

# Adjust permissions if running in OpenShift or other restricted env
RUN chgrp -R 0 /usr/share/nginx/html /var/cache/nginx /var/run /var/log/nginx && \
    chmod -R g+rwX /usr/share/nginx/html /var/cache/nginx /var/run /var/log/nginx

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]

