# Use an official Node.js runtime as a parent image
FROM node:20.16.0

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular application
RUN npm run build --prod

# Use an Nginx image to serve the built application
FROM nginx:alpine

# Copy the built application to the Nginx container
COPY --from=0 /usr/src/app/dist /usr/share/nginx/html

# Expose the port on which Nginx is running
EXPOSE 80

# Command to run Nginx
CMD ["nginx", "-g", "daemon off;"]
