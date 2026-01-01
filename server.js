const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); 
const db = require('./config/db');

// 1. Import All Routes
const testRoutes = require('./routes/testRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes'); // Added for Phase 5

// Initialize environment variables
dotenv.config();

const app = express();

// --- MIDDLEWARE ---
app.use(express.json()); // Essential for reading JSON from the request body
app.use(cors()); // Essential for allowing your React app to fetch data

// --- ROUTES ---
// We mount all features under the /api prefix for industry-standard API design
app.use('/api', testRoutes);
app.use('/api', productRoutes);
app.use('/api', userRoutes);
app.use('/api', orderRoutes); // New endpoint for processing orders

// Basic Health Check Route
app.get('/', (req, res) => {
    res.send("Amazon Clone API is running perfectly...");
});

// --- GLOBAL ERROR HANDLING ---
// Middleware to catch 404 errors for undefined routes
app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
});

// Server Start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🔗 Backend URL: http://localhost:${PORT}`);
});