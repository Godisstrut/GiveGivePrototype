const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const { uploadAndAnalyzeImage } = require ('./test/gemini')

// Import routes
const { imageRoutes } = require('./routes/imageRoutes');
const { loginRoutes } = require('./routes/loginRoutes');
const { getInventoryRoute } = require('./routes/getInventoryRoutes');
const { getProfileRoute } = require('./routes/getProfileRoutes');
const { postImageForAIRoute } = require('./routes/postImageForAIRoutes');


// Middleware to parse JSON request bodies
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.use("/api/toy-identification", imageRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/getInventory', getInventoryRoute);
app.use('/api/getProfile', getProfileRoute);
app.use('/api/postImageForAi', postImageForAIRoute)

// API requests
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});


