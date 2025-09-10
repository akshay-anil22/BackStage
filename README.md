
-----

# 🎭 Backstage - Event Management System

A Full-Stack Event Management Web Application built using Node.js, Express.js, MongoDB, and React (Vite). It provides secure APIs for authentication, role-based access, event creation, and registration — with a React-based frontend for users.

-----

## 🚀 Features

  - ✅ **User Authentication with JWT**
  - 🔒 **Role-Based Access Control** (User / Organizer)
  - 📅 **Event Management**
      - Create, View, and Delete Events
      - Organizer-only permissions for critical actions
  - 👥 **Event Registration for Students**
  - 📄 **Organized APIs** with a modular controller-service structure

## 📂 Project Structure

```text
/backend
├── controllers
├── middleware
├── models
├── routes
└── app.js

/frontend
├── src/
│   ├── api
│   ├── pages
│   ├── App.jsx
│   └── main.jsx
└── package.json
```

## ⚙️ Tech Stack

### Backend

  - **Node.js**
  - **Express.js**
  - **MongoDB** with **Mongoose**
  - **JWT** for Authentication
  - **bcrypt** for password hashing
  - Custom Middleware for authentication & role management

### Frontend

  - **React (Vite)**
  - **React Router** for navigation
  - **Axios** for API requests

## 🌐 Deployment

  - **Backend (Render):** [https://backstage-041f.onrender.com](https://backstage-041f.onrender.com)
  - **Frontend (Vercel):** [https://back-stage-chi.vercel.app/](https://back-stage-chi.vercel.app/)

## ⚡ Setup

### 1\. Clone the Repository

```bash
git clone https://github.com/akshay-anil22/BackStage.git
cd BackStage
```

### 2\. Backend Setup

Navigate to the backend directory:

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory and add the following variables:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

Run the backend server:

```bash
nodemon app.js
```

### 3\. Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
npm install
```

Run the frontend development server:

```bash
npm run dev
```

-----

## 📸 Screenshots

### Login / Register Page

*\<-- Your Login/Register screenshot will go here --\>*

-----

### Dashboard with Events

*\<-- Your Dashboard screenshot will go here --\>*

-----

### Create Event Form

*\<-- Your Create Event form screenshot will go here --\>*

-----

### Event Details Page

*\<-- Your Event Details page screenshot will go here --\>*

-----
