
# 🎭 Backstage - Event Management System

An Event Management Web Application built using **Node.js**, **Express.js**, and **MongoDB**. This project focuses primarily on the **backend architecture**, providing robust APIs for authentication, role-based access, event creation, and registration. The frontend is kept intentionally minimal for now, leaving room for future enhancement.

---

## 🚀 Features

- ✅ **User Authentication** with JWT
- 🔒 **Role-Based Access Control** (User / Organizer)
- 📅 **Event Management**  
  - Create, View, Delete Events  
  - Organizer-only permissions for critical actions
- 👥 **Event Registration** for students
- 📄 Organized APIs and modular controller-service structure

---

## 📂 Project Structure
/backend
├── controllers
├── middleware
├── models
├── routes
└── server.js

/frontend
├── index.html ← Registration
├── login.html
├── profile.html ← View all events, registered & organized events
├── create.html ← Create new event (organizer only)
├── event.html ← View single event (details, join/delete)


---

## ⚙️ Backend Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB with Mongoose**
- **JWT for Authentication**
- **Custom Middleware** for auth & roles

---

## 🌐 Deployment

### Backend (Render)
- Hosted on: [`https://backstage-041f.onrender.com`](https://backstage-041f.onrender.com)

### Frontend (Vercel)
- Deployed as static site using Vercel
- Entry point: `/frontend/index.html`

---

