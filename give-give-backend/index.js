const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const { getAllParents, createParent } = require('./controllers/test');

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API requests
app.get('/api/getAllParents', getAllParents);    // GET request to fetch all users
app.post('/api/createParent', createParent);    // POST request to create a new user

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});