# TaskTracker — CSE471 Web Assignment

A full-stack task management web application built with React, Node.js, Express, and MongoDB.

## Live Demo

- **Frontend:** _add Vercel link here_
- **Backend:** _add Render link here_

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React (Vite), Material UI, React Router, Axios |
| Backend | Node.js, Express.js, JWT, bcryptjs |
| Database | MongoDB Atlas, Mongoose |

## Features

- User Registration & Login with JWT authentication
- Secure password hashing (bcryptjs)
- Create, Read, Update, Delete tasks
- Search tasks by title
- Filter tasks by status (Pending / In Progress / Completed)
- Protected routes (unauthenticated users redirected to login)
- 5 pages: Home, Login, Register, Tasks, Profile

## Project Structure

```
task-tracker/
├── backend/          Node.js + Express API
│   ├── config/       MongoDB connection
│   ├── middleware/   JWT auth middleware
│   ├── models/       User & Task schemas
│   ├── routes/       /api/auth and /api/tasks
│   └── server.js
└── frontend/         React (Vite) app
    └── src/
        ├── api/      Axios instance
        ├── components/  Navbar, PrivateRoute
        ├── context/  AuthContext
        └── pages/    Home, Login, Register, Tasks, Profile
```

## Setup Instructions

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (free tier)

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd task-tracker
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create `backend/.env`:

```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.mongodb.net/tasktracker?retryWrites=true&w=majority
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

```bash
npm run dev
```

### 3. Frontend setup

```bash
cd frontend
npm install
```

Create `frontend/.env`:

```
VITE_API_URL=http://localhost:5000/api
```

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/register | No | Register new user |
| POST | /api/auth/login | No | Login, returns JWT |
| GET | /api/auth/me | Yes | Get current user |
| GET | /api/tasks | Yes | List tasks (search & filter) |
| POST | /api/tasks | Yes | Create task |
| PUT | /api/tasks/:id | Yes | Update task |
| DELETE | /api/tasks/:id | Yes | Delete task |

## Deployment

- **Frontend → Vercel:** Connect GitHub repo, set `VITE_API_URL` env var to backend URL.
- **Backend → Render:** Connect GitHub repo, set all `.env` vars in Render dashboard.
# task-tracker
