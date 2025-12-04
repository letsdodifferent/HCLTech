const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const cors = require('cors');
const connectDb = require('./src/config/db');
const cookieParser = require('cookie-parser');
const cloudinary = require("cloudinary").v2;
const authRouter = require('./src/routes/auth.routes.js');
const patientRoute = require('./src/routes/patient.route.js');
const providerRoute = require('./src/routes/provider.route.js');
const publicRoute = require('./src/routes/public.route.js');

// Specific router
const app = express();

// dotenv configurations
dotenv.config();

// Connect to Database
connectDb();

// Middlewares
app.use(
    cors({
        origin: ["http://localhost:5173"], // ✅ Allow frontend origin
        credentials: true, // ✅ Allow cookies & authentication headers
    })
);

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/patient', patientRoute);
app.use('/api/v1/provider', providerRoute);
app.use('/api/v1/public', publicRoute);


const PORT = process.env.PORT || 8000;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(PORT, () => {
    console.log(`App is Listening Successfully on http://localhost:${PORT}/api/v1`.white.bgMagenta);
});
