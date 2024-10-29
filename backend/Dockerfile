# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files into the container
COPY .. .

# Expose the backend port
EXPOSE 5001

# Start the backend server
CMD ["npm", "run", "start"]
