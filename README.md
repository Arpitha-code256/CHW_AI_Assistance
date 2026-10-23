# Community Health Worker Assistance Platform

A full-stack web application designed for a college mini-project to assist frontline community health workers (e.g., ASHA/ANM) with household surveys, maternal and child healthcare tracking, routine immunization schedules, and high-risk referral coordination.

---

## 🏗️ Project Architecture

```
community-health-worker/
├── frontend/                     # React 19 + Vite + Tailwind CSS Client
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx        # Navigation bar & live backend status indicator
│   │   │   └── Footer.jsx        # Healthcare platform footer & academic metadata
│   │   ├── pages/
│   │   │   ├── HomePage.jsx      # Overview, operational metrics, diagnostics
│   │   │   └── LoginPage.jsx     # Healthcare worker login portal with demo autofill
│   │   ├── App.jsx               # React Router & live health polling
│   │   ├── index.css             # Tailwind CSS & typography setup
│   │   └── main.jsx              # React DOM entry point
│   ├── index.html                # App title & Google Fonts
│   ├── vite.config.js            # Vite configuration with proxy to backend
│   └── package.json
│
└── backend/                      # Node.js + Express + Mongoose REST API
    ├── src/
    │   ├── config/
    │   │   └── db.js             # Mongoose connection & status helper
    │   ├── controllers/
    │   │   └── healthController.js # /api/health controller
    │   ├── models/
    │   │   └── Worker.js         # Community Health Worker Mongoose schema
    │   ├── routes/
    │   │   └── healthRoutes.js   # Health check routing
    │   ├── middleware/
    │   │   └── errorHandler.js   # 404 & global error handling middleware
    │   └── server.js             # Express app setup & graceful port binding
    ├── .env.example              # Environment variables template
    ├── .env                      # Local configuration file
    └── package.json
```

---

## 🚀 Quick Start Guide

### 1. Start the Backend API

Open a terminal window and navigate to the backend directory:

```bash
cd community-health-worker/backend
npm run dev
```

- **API URL:** [http://localhost:5050](http://localhost:5050)
- **Health Check:** [http://localhost:5050/api/health](http://localhost:5050/api/health)

---

### 2. Start the Frontend Application

Open a second terminal window and navigate to the frontend directory:

```bash
cd community-health-worker/frontend
npm run dev
```

- **Application URL:** [http://localhost:5173](http://localhost:5173)
- **Login Portal:** [http://localhost:5173/login](http://localhost:5173/login)

---

## 🩺 Verifying Health & Database Connection

1. Open [http://localhost:5173](http://localhost:5173) in your browser.
2. The navbar will indicate **`API: Online`** with a green pulse badge.
3. Scroll to the **Full-Stack Connectivity Diagnostics** section to view:
   - Frontend state (`React 19 + Vite` active)
   - Backend state (`Express API Online` on port 5050)
   - MongoDB database connection (`Status: connected`)
4. Click **Launch Worker Portal** to inspect the role-based login screen with demo autofill.

---

## ⚙️ Environment Variables (Backend)

The backend `.env` file includes:

```env
PORT=5050
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/community_health_worker
CLIENT_URL=http://localhost:5173
```
