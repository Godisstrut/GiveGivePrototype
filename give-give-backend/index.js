const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const { uploadAndAnalyzeImage } = require ('./test/gemini')

// Import routes
const loginRoutes = require('./routes/loginRoutes');
const getInventoryRoutes = require('./routes/getInventoryRoutes');
const getProfileRoutes = require('./routes/getProfileRoutes');
const postImageForAIRoutes = require('./routes/postImageForAIRoutes');
const postToyFormRoutes = require('./routes/postToyFormRoutes');


// Middleware to parse JSON request bodies
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.use('/api/login', loginRoutes);
app.use('/api/getInventory', getInventoryRoutes);
app.use('/api/getProfile', getProfileRoutes);
app.use('/api/postImageForAi', postImageForAIRoutes)
app.use('/api/postToyForm', postToyFormRoutes)

// API requests
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});


