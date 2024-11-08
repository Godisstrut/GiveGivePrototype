const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const { getAllParents, createParent } = require('./test/test');
const { uploadAndAnalyzeImage } = require ('./test/gemini')

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/toy-identification", imageRoutes);

// API requests
/* app.get('/api/getAllParents', getAllParents);    // GET request to fetch all users
app.post('/api/createParent', createParent);    // POST request to create a new user */

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});