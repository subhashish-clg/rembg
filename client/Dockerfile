# Use the official Node.js image as the base image
FROM node:18-alpine as build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and pnpm-lock.yaml for caching dependencies
COPY package*.json ./

# Install pnpm globally
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Build the Vite project for production
RUN pnpm run build

# Use the official NGINX image as the base for serving the build
FROM nginx:alpine

# Copy the Vite build output from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for the NGINX server
EXPOSE 80

# NGINX will automatically serve the app from /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
