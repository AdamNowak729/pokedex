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

EXPOSE 4200

# Build the Angular application
CMD ["npm", "run", "broad"]
