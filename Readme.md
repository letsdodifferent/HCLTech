# HCLTech Healthcare Management System

A full-stack web application for managing patient and healthcare provider interactions. This system allows patients to manage their health profiles, track health goals, and access public health information.

## Project Overview

**HCLTech** is a healthcare management platform built with a modern tech stack:

- **Frontend**: React 19 + Vite with Tailwind CSS
- **Backend**: Express.js with MongoDB
- **Authentication**: JWT-based authentication with bcryptjs password hashing
- **File Uploads**: Cloudinary integration for image management
- **Client-Server Communication**: Axios for HTTP requests

---

## Tech Stack

### Client (React + Vite)

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 19.2.0 | UI framework |
| Vite | 7.2.4 | Build tool & dev server |
| React Router | 7.10.0 | Client-side routing |
| Tailwind CSS | 3.4.18 | Styling |
| Axios | 1.13.2 | HTTP client |
| Lucide React | 0.555.0 | Icon library |

### Server (Express.js)

| Technology | Version | Purpose |
|-----------|---------|---------|
| Express | 5.2.1 | Web framework |
| MongoDB | 9.0.0 | Database (via Mongoose) |
| JWT | 9.0.3 | Authentication |
| bcryptjs | 3.0.3 | Password hashing |
| Cloudinary | 2.8.0 | Cloud image storage |
| Multer | 2.0.2 | File upload handling |
| Nodemon | 3.1.11 | Development auto-restart |
| Morgan | 1.10.1 | HTTP request logging |

---

## Project Structure

```
HCLTech/
├── client/                          # React frontend application
│   ├── src/
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx        # Patient/Provider login
│   │   │   ├── Register.jsx         # User registration
│   │   │   ├── Home.jsx             # Landing page
│   │   │   ├── Profile/
│   │   │   │   └── PatientProfile.jsx  # Profile management & health info
│   │   │   ├── Dashboard/
│   │   │   │   └── PatientDashboard.jsx # Patient dashboard
│   │   │   ├── GoalTracker/
│   │   │   │   └── GoalTracker.jsx     # Health goal tracking
│   │   │   └── Public/
│   │   │       └── healt-info.jsx      # Public health information
│   │   ├── App.jsx                  # Main app component with routes
│   │   ├── main.jsx                 # React entry point
│   │   ├── App.css                  # Global app styles
│   │   └── index.css                # Base styles
│   ├── package.json
│   └── vite.config.js
│
├── server/                          # Express backend application
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                # MongoDB connection
│   │   ├── routes/
│   │   │   ├── auth.routes.js       # Authentication endpoints
│   │   │   ├── patient.route.js     # Patient endpoints
│   │   │   ├── provider.route.js    # Healthcare provider endpoints
│   │   │   └── public.route.js      # Public endpoints
│   │   ├── models/                  # Mongoose schemas
│   │   └── middleware/              # Authentication & validation
│   ├── index.js                     # Express server entry point
│   ├── package.json
│   └── .env.example                 # Environment configuration template
│
└── README.md                        # This file
```

---

## Features

### Patient Features
- ✅ **User Registration & Login** - Secure authentication with JWT
- ✅ **Profile Management** - View and edit personal & health information
  - Personal details (name, email, phone, DOB, gender)
  - Health information (blood type, height, weight, medical conditions)
  - Allergies and current medications tracking
  - Emergency contact information
- ✅ **Health Dashboard** - Overview of health status and activities
- ✅ **Goal Tracker** - Set and track personal health goals
- ✅ **Public Health Information** - Access to health resources and information

### Provider Features
- 🔲 Healthcare provider management endpoints (ready for expansion)

### Public Features
- 🔲 Public health information access

---

## Setup Instructions

### Prerequisites

- **Node.js** 18+ and **npm** installed
- **MongoDB** running locally or remote connection string
- **Cloudinary** account (for image uploads)

### Environment Variables

Create a `.env` file in the **server** directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/hcltech
# or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hcltech

# JWT
JWT_SECRET=your_super_secret_jwt_key_here

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Server
PORT=8000

# CORS
FRONTEND_URL=http://localhost:5173
```

### Installation & Running

#### 1. Install Server Dependencies

```bash
cd server
npm install
```

#### 2. Start MongoDB

```bash
# If using local MongoDB
mongod

# Or use MongoDB Atlas (set MONGODB_URI in .env)
```

#### 3. Start the Server

```bash
npm run dev    # Development mode with auto-reload
# or
npm start      # Production mode
```

Server will run on `http://localhost:8000`

#### 4. Install Client Dependencies

```bash
cd ../client
npm install
```

#### 5. Start the Development Server

```bash
npm run dev
```

Client will run on `http://localhost:5173`

---

## Available Routes

### Frontend Routes

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | Home | Landing page |
| `/login` | LoginPage | Patient/Provider login |
| `/register` | Register | New user registration |
| `/patientprofile` | PatientProfile | Patient profile & health management |
| `/patient/dashboard` | PatientDashboard | Patient dashboard |
| `/patient/tracker` | GoalTracker | Health goal tracking |
| `/PublicHealth` | PublicHealthInfoPage | Public health information |

### Backend API Routes

**Base URL**: `http://localhost:8000/api/v1`

| Endpoint | Purpose |
|----------|---------|
| `/auth/*` | Authentication (login, register, logout) |
| `/patient/*` | Patient operations |
| `/provider/*` | Healthcare provider operations |
| `/public/*` | Public information endpoints |

---

## Build & Deployment

### Build Frontend

```bash
cd client
npm run build
```

Creates optimized production build in `client/dist/`

### Preview Production Build

```bash
npm run preview
```

### Lint Frontend Code

```bash
npm run lint
```

---

## Development Workflow

### Frontend Development

- Auto hot-reload on file changes
- Tailwind CSS for utility-first styling
- ESLint for code quality

### Backend Development

- Nodemon auto-restarts on file changes
- Morgan logs all HTTP requests
- CORS enabled for frontend at `http://localhost:5173`

---

## Security Features

- ✅ **Password Hashing** - bcryptjs for secure password storage
- ✅ **JWT Authentication** - Token-based session management
- ✅ **CORS Protection** - Restricted to frontend origin
- ✅ **Cookie Security** - Secure cookie handling with cookie-parser

---

## Future Enhancements

- [ ] Email verification during registration
- [ ] Two-factor authentication
- [ ] Appointment scheduling
- [ ] Medical records storage
- [ ] Prescription management
- [ ] Telemedicine integration
- [ ] Mobile app (React Native)

---

## Troubleshooting

### Frontend won't connect to backend

- Ensure server is running on `http://localhost:8000`
- Check CORS settings in `server/index.js` - should allow `http://localhost:5173`
- Verify API endpoints in axios calls match backend routes

### Database connection fails

- Ensure MongoDB is running (`mongod` or MongoDB Atlas connection)
- Check `MONGODB_URI` in `.env` file
- Verify MongoDB credentials if using Atlas

### Port already in use

```bash
# Kill process on port 8000 (server)
lsof -ti:8000 | xargs kill -9

# Kill process on port 5173 (client)
lsof -ti:5173 | xargs kill -9
```

---

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m "Add your feature"`
3. Push to branch: `git push origin feature/your-feature`
4. Open a Pull Request

---

## License

ISC - See LICENSE file for details

---

## Contact & Support

For questions or support, please contact the development team or open an issue on GitHub.

---

**Last Updated**: December 4, 2025
