const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const { uploadAndAnalyzeImage } = require('./test/gemini');

// Import routes
const loginRoutes = require('./routes/loginRoutes');
const getInventoryRoutes = require('./routes/getInventoryRoutes');
const getProfileRoutes = require('./routes/getProfileRoutes');
const postImageForAIRoutes = require('./routes/postImageForAIRoutes');
const postToyFormRoutes = require('./routes/postToyFormRoutes');

// Middleware to log incoming requests
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    console.log('Headers:', req.headers);
    console.log('Body:', req.body); // May log undefined if body parsing hasn't occurred yet
    next();
});

// Middleware to parse JSON request bodies
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://127.0.0.1:5500' }));

// Routes
app.use('/api/login', loginRoutes);
app.use('/api/getInventory', getInventoryRoutes);
app.use('/api/getProfile', getProfileRoutes);
app.use('/api/postImageForAi', postImageForAIRoutes);
app.use('/api/postToyForm', postToyFormRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
