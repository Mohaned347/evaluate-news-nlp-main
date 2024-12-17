// server.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const axios = require('axios');
const cors = require('cors');

// Initialize app
const app = express();

// Load environment variables
dotenv.config();
const PORT = process.env.PORT || 8800;

// Middleware
app.use(cors({ origin: 'http://localhost:8080' })); // Allow frontend origin
app.use(express.static('dist'));
app.use(bodyParser.json());

// MeaningCloud API Configuration
const meaningCloudAPI = {
    url: 'https://api.meaningcloud.com/sentiment-2.1',
    key: process.env.API_KEY, // API Key in .env
};

// POST route to handle NLP analysis
app.post('/analyze', async (req, res) => {
    console.log('Received POST request:', req.body);
    const { url } = req.body;

    try {
        const response = await axios.post(meaningCloudAPI.url, null, {
            params: {
                key: meaningCloudAPI.key,
                url: url,
                lang: 'en',
            },
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error analyzing the URL' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
