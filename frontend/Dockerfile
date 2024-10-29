# Use the official Node.js image as the base
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy the frontend dependencies
COPY package*.json ./

# Install the frontend dependencies
RUN npm install

# Copy the entire frontend application to the container
COPY . .

# Build the frontend app
RUN npm run build

# Serve the frontend using a simple web server
RUN npm install -g serve

# Expose the frontend port
EXPOSE 3000

# Command to serve the frontend build
CMD ["serve", "-s", "build", "-l", "3000"]
