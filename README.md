🎭 BackStage – Event Management System

BackStage is a full-stack Event Management Web Application built with Node.js, Express.js, MongoDB, and React (Vite).
It provides secure authentication, role-based access control, and event management features.

🚀 Features
🔑 Authentication

User registration & login using JWT

Password hashing with bcrypt

Change password functionality

Role-based access (Normal User / Organizer)

🎉 Events

Create new events (organizers only)

View all available events

View details of a single event

Join/register for events

View events you organized and registered for

Delete events (organizers only)

🛡️ Security

JWT-protected routes

Role-based middleware for organizers

Password strength validation with regex

📂 Project Structure
BackStage/
│
├── backend/                 # Node.js + Express + MongoDB
│   ├── controllers/         # Business logic (auth, events, etc.)
│   ├── middleware/          # Authentication & role checks
│   ├── models/              # Mongoose schemas
│   ├── routes/              # Express routes
│   └── app.js               # Entry point
│
├── frontend/                # React app (Vite)
│   ├── src/
│   │   ├── api/             # Axios API setup
│   │   ├── pages/           # React pages (Login, Register, Dashboard, etc.)
│   │   ├── App.jsx          # Routes
│   │   └── main.jsx         # Entry point
│   └── package.json
│
└── README.md

⚙️ Tech Stack
Backend

Node.js + Express.js

MongoDB with Mongoose

JWT for authentication

bcrypt for password hashing

Frontend

React (Vite)

React Router for navigation

Axios for API requests

🌐 Deployment

Backend (Render): https://backstage-041f.onrender.com

Frontend (Vercel): https://back-stage-chi.vercel.app/

⚡ Setup
1️⃣ Clone the repo
git clone https://github.com/akshay-anil22/BackStage.git
cd BackStage

2️⃣ Backend Setup
cd backend
npm install


Create a .env file inside backend/ with:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000


Run the backend:

nodemon app.js

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev

📸 Screenshots
