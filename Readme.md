
# Todo App - MERN Stack Application

## 🚀 Introduction

This repository contains the code for a **full-stack Todo List application** built with the **MERN stack** (MongoDB, Express, React, Node.js). The app allows users to create, update, delete, and manage their tasks with a clean and responsive UI. This project showcases modern web development practices using **React** for the frontend, **Node.js** and **Express** for the backend, and **MongoDB** as the database.

### **GitHub Repository**: [https://github.com/elviajero971/todo_app](https://github.com/elviajero971/todo_app)

### **Live Demo**: [View Live on Vercel](https://www.todo-app-frontend-tawny.vercel.app/)

## 🎯 Features

- **Create, Update, and Delete Todos**: Manage your todos easily with a simple and intuitive interface.
- **Responsive Design**: Works seamlessly on desktops, tablets, and mobile devices.
- **Backend API**: Built with Express and MongoDB to handle the creation and management of todo items.
- **Frontend UI**: Built with React to offer a smooth, user-friendly experience.
- **Persistent Storage**: Todos are stored in a MongoDB database, ensuring that data is retained across sessions.
  
## 🗂️ Project Structure

Here’s an overview of the folder structure of the project:

```bash
.
├── backend                      # Backend source code (Node.js + Express)
│   ├── models                   # Mongoose schemas and models
│   │   ├── Todo.js              # Todo schema
│   │   ├── TodoList.js          # TodoList schema
│   ├── routes                   # API routes
│   │   ├── todoLists.js         # Routes for TodoList CRUD operations
│   │   ├── todos.js             # Routes for Todo CRUD operations
│   ├── seeds                    # Seed data for the database
│   │   └── seed.js              # Seed script to populate initial data
│   ├── .env                     # Environment variables for backend
│   ├── index.js                 # Entry point for the Express server
│   ├── package-lock.json        # Lockfile for npm dependencies
│   ├── package.json             # Backend dependencies and scripts
│   ├── vercel.json              # Vercel configuration for deployment
├── frontend                     # Frontend source code (React)
│   ├── public                   # Static files like index.html
│   ├── src                      # Main React source folder
│   │   ├── components           # Reusable React components
│   │   │   ├── Notification.js  # Notification component
│   │   │   ├── TodoForm.js      # Form to add todos
│   │   │   ├── TodoItem.js      # Single Todo item component
│   │   │   ├── TodoList.js      # TodoList component
│   │   │   ├── TodoListForm.js  # Form to add TodoLists
│   │   │   ├── TodoListItem.js  # Single TodoList item component
│   │   │   ├── TodoLists.js     # List of all TodoLists
│   │   │   └── Todos.js         # List of Todos inside a TodoList
│   │   ├── utils                # Utility functions
│   │   │   └── dateUtils.js     # Utility to format dates
│   │   ├── App.css              # Styles for the app
│   │   ├── App.js               # Main React App component
│   │   ├── App.test.js          # Unit tests for the App
│   │   ├── index.css            # Global CSS
│   │   ├── index.js             # Entry point for the React app
│   │   ├── logo.svg             # Logo for the app
│   │   ├── reportWebVitals.js   # Performance reporting for React app
│   │   └── setupTests.js        # Setup file for Jest tests
│   ├── .env                     # Environment variables for frontend
│   ├── package-lock.json        # Lockfile for npm dependencies
│   ├── package.json             # Frontend dependencies and scripts
│   ├── postcss.config.js        # PostCSS configuration
│   ├── tailwind.config.js       # Tailwind CSS configuration
│   ├── README.md                # Project README file
│   └── vercel.json              # Vercel configuration for deployment
├── .gitignore                   # Files to be ignored by Git
```

### **Key Folders**:

- **`backend/`**: Contains all the backend logic, including the Express server, models, and API routes.
- **`frontend/`**: Contains the React frontend, which communicates with the backend via API.
  
## 🛠️ Getting Started

### Prerequisites

Before running the project, make sure you have the following installed on your machine:

- **Node.js**: [Download Node.js](https://nodejs.org/)
- **npm** or **yarn**: For managing dependencies
- **MongoDB**: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or a local MongoDB instance

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/elviajero971/todo_app.git
cd todo_app
```

2. **Install dependencies for both frontend and backend:**

```bash
# Navigate to the backend folder and install dependencies
cd backend
npm install

# Navigate to the frontend folder and install dependencies
cd ../frontend
npm install
```

### Setting Up Environment Variables

Both the **frontend** and **backend** require environment variables for proper functioning. You'll need to create a `.env` file in both the `frontend/` and `backend/` directories.

#### 1. **Backend - Setup `.env` File**

In the `backend/` folder, create a `.env` file based on the `.env.example` file:

```bash
cd backend
cp .env.example .env
```

Open the `.env` file and fill in the required values:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/todo_db?retryWrites=true&w=majority
PORT=5000
```

- **`MONGO_URI`**: Your MongoDB connection string. You can use MongoDB Atlas or a local MongoDB instance.
- **`PORT`**: The port number for the backend server. Default is `5000`.

#### 2. **Frontend - Setup `.env` File**

In the `frontend/` folder, create a `.env` file based on the `.env.example` file:

```bash
cd frontend
cp .env.example .env
```

Open the `.env` file and configure the frontend environment variables:

```env
REACT_APP_BACKEND_URL=http://localhost:5000
```

- **`REACT_APP_BACKEND_URL`**: The URL of your backend API (e.g., `http://localhost:5000` for local development or the live URL if hosted online).

### Running the Application

#### 1. **Start the Backend Server**:

In the `backend/` folder, start the backend server:

```bash
cd backend
npm start
```

The backend API will be running at `http://localhost:5000`.

#### 2. **Start the Frontend Development Server**:

In the `frontend/` folder, start the React development server:

```bash
cd frontend
npm start
```

The frontend will be running at `http://localhost:3000` and will automatically communicate with the backend.

### Building for Production

To create a production build of the frontend application:

```bash
npm run build
```

The production build will be optimized and ready for deployment.

## 🧩 Technologies Used

- **MongoDB**: NoSQL database for storing todos and lists.
- **Express**: Backend framework for building APIs.
- **React**: Frontend JavaScript library for building user interfaces.
- **Node.js**: JavaScript runtime for server-side development.
- **Axios**: For making HTTP requests from the React frontend to the Express backend.

## 🌍 Environment Variables

To make the app work properly in different environments (development, production, etc.), the following environment variables need to be set:

1. **Backend (`backend/.env`)**:
   - **`MONGO_URI`**: The connection string to your MongoDB instance.
   - **`PORT`**: The port the Express server runs on.

2. **Frontend (`frontend/.env`)**:
   - **`REACT_APP_BACKEND_URL`**: The base URL of the backend API (usually `http://localhost:5000` during local development or the deployed URL for production).

### Example:

- **Backend**: In `backend/.env`
  ```env
  MONGO_URI=mongodb://localhost:27017/todo_app
  PORT=5000
  ```

- **Frontend**: In `frontend/.env`
  ```env
  REACT_APP_BACKEND_URL=http://localhost:5000
  ```

## 🤝 Contributing

If you would like to contribute to this project, feel free to fork the repository and submit a pull request. All contributions, feedback, and suggestions are welcome!

## 🌐 Live Demo

You can view the live version of the application here: [https://www.todo-app-frontend-tawny.vercel.app/](https://www.todo-app-frontend-tawny.vercel.app/)

## 📬 Contact

- **Email**: [lucas.illiano@hotmail.com](mailto:lucas.illiano@hotmail.com)
- **LinkedIn**: [https://www.linkedin.com/in/lucas-illiano/](https://www.linkedin.com/in/lucas-illiano/)
- **GitHub**: [https://github.com/elviajero971/](https://github.com/elviajero971/)

Feel free to reach out if you have any questions or want to collaborate on a project!
