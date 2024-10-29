Health Tracker App
==================

This app is a full-stack health tracking application that includes a backend API and a frontend user interface. The backend runs on port 5001, while the frontend runs on port 3000. The app allows users to log their health data, view charts of their data, and view summaries on the dashboard.

Prerequisites
-------------

To run this app locally, you will need to have the following installed:

-   **Node.js** (v20.18.0 or later) and npm (comes with Node.js)
-   **MongoDB** (either local or cloud-hosted using [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
-   **Git** (to clone the repository)
-   **Docker** (optional, for running the app in containers)

Getting Started (Without Docker)
--------------------------------

### Backend Setup

1.  **Clone the repository**:

    bash

    Copy code

    `git clone https://github.com/your-username/HealthTracker.git
    cd HealthTracker`

2.  **Install Backend Dependencies**: Navigate to the backend directory:

    bash

    Copy code

    `cd backend
    npm install`

3.  **Configure Environment Variables**: Create a `.env` file in the `backend` directory and add the following configuration:

    bash

    Copy code

    `MONGO_URI=your-mongodb-uri
    JWT_SECRET=your-jwt-secret`

4.  **Run the Backend**: To start the backend server:

    bash

    Copy code

    `npm run start`

### Frontend Setup

1.  **Navigate to the Frontend Directory**:

    bash

    Copy code

    `cd ../frontend`

2.  **Install Frontend Dependencies**:

    bash

    Copy code

    `npm install`

3.  **Run the Frontend**: To start the frontend server:

    bash

    Copy code

    `npm run start`

### Running Both Frontend and Backend Simultaneously

The app uses `concurrently` to run both the frontend and backend together. Run the following command from the root of the project:

bash

Copy code

`npm start`

This will start:

-   The backend on `http://localhost:5001`
-   The frontend on `http://localhost:3000`

Getting Started (With Docker)
-----------------------------

To simplify the setup process, you can run the app using Docker containers. The app includes a `Dockerfile` and `docker-compose.yml` configuration.

### Steps to Run with Docker

1.  **Install Docker**: Make sure Docker is installed on your machine. You can follow the instructions on the Docker website.

2.  **Clone the Repository**:

    bash

    Copy code

    `git clone https://github.com/your-username/HealthTracker.git
    cd HealthTracker`

3.  **Run the App with Docker Compose**: In the root of the project, run:

    bash

    Copy code

    `docker-compose up --build`

    This will build and run both the backend and frontend services in separate Docker containers.

### Access the App

-   Frontend: `http://localhost:3000`
-   Backend API: `http://localhost:5001/api`

MongoDB Setup
-------------

### Option 1: Local MongoDB

If you're using a local MongoDB instance, ensure MongoDB is running on your machine, and configure the `MONGO_URI` in your `.env` file.

### Option 2: MongoDB Atlas

If you prefer to use MongoDB Atlas, follow these steps:

1.  [Create a MongoDB Atlas Account](https://www.mongodb.com/cloud/atlas).
2.  Set up a cluster and retrieve the connection string.
3.  Replace the `MONGO_URI` in your `.env` file with the connection string.

Testing the API (Optional)
--------------------------

To test the backend API, you can use Postman or `curl`. Here are a few sample endpoints:

-   **Get all sleep records**:

    bash

    Copy code

    `GET http://localhost:5001/api/sleep`

-   **Add a sleep record**:

    bash

    Copy code

    `POST http://localhost:5001/api/sleep`

Common Issues
-------------

-   **Port conflicts**: If port 3000 or 5001 is already in use, update the `package.json` or Docker configuration to change the ports.
-   **MongoDB connection issues**: Ensure your MongoDB URI is correctly set in the `.env` file, and the MongoDB service is running.

Contributing
------------

Feel free to fork the repository and submit pull requests to contribute to the project!