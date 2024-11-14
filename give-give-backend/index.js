const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { initializeSecrets } = require('./config/secretsConfig');

//Initialize server
async function initializeServer(){
    await initializeSecrets();

    // Start the server
    const app = express();
    const port = 3000;

    // Import routes
    const loginRoutes = require('./routes/loginRoutes');
    const getInventoryRoutes = require('./routes/getInventoryRoutes');
    const getProfileRoutes = require('./routes/getProfileRoutes');
    const postImageForAIRoutes = require('./routes/postImageForAIRoutes');

    // Middleware to parse JSON request bodies
    app.use(cors());
    app.use(express.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    //Routes
    app.use('/api/login', loginRoutes);
    app.use('/api/getInventory', getInventoryRoutes);
    app.use('/api/getProfile', getProfileRoutes);
    app.use('/api/postImageForAi', postImageForAIRoutes)

    // API requests
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
}

initializeServer();


