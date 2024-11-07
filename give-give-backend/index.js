const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const { getAllParents, createParent } = require('./test/test');
const { login } = require('./api_calls/login');
const { getProfile } = require('./api_calls/getProfile');
const { getInventory} = require('./api_calls/getInventory');
const { postImageForAI } = require('./api_calls/postImageForAI');
const cors = require('cors');




// Middleware to parse JSON request bodies
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

// API requests

// Test
app.get('/api/getAllParents', getAllParents);    // GET request to fetch all users
app.post('/api/createParent', createParent);    // POST request to create a new user

app.get('/api/login', login); // GET request to validate that a profile exists. and sends back a userID
app.get('/api/profile', getProfile); // GET request to get profile information from userID
app.get('/api/getInventory', getInventory); // GET request to get an array of toys from a userID

app.post('/api/postImageForAI', postImageForAI);

