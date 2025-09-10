
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
  - **Frontend (Vercel):** [https://back-stage-plum.vercel.app/](https://back-stage-plum.vercel.app/)

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

<img width="1919" height="813" alt="image" src="https://github.com/user-attachments/assets/25a95854-b304-400d-85c8-38084d0fa1a2" />
<img width="1919" height="809" alt="image" src="https://github.com/user-attachments/assets/68941c5d-f955-4cfa-b1ed-27f082b84def" />

-----

### Dashboard with Events

<img width="1903" height="867" alt="image" src="https://github.com/user-attachments/assets/ae3e829b-2181-41e3-adb1-13a5c0187580" />


<img width="1918" height="867" alt="image" src="https://github.com/user-attachments/assets/1604238b-2b01-4b62-ae23-071420b3764a" />


-----

### Create Event Form

<img width="1917" height="871" alt="image" src="https://github.com/user-attachments/assets/534e9155-27d3-473d-a574-4875d9d13f33" />


-----

### Event Details Page

<img width="1912" height="858" alt="image" src="https://github.com/user-attachments/assets/6ec4bffd-be28-4da1-a4c5-3a7e6ffe0ec5" />


-----
