// Import required modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const axios = require('axios');
const cors = require('cors');

// Initialize the app
const app = express();

// Enable CORS for all origins
app.use(cors());

// Load environment variables
dotenv.config();
console.log(`Your API key is ${process.env.API_KEY}`);

// Middleware
app.use(express.static('dist'));  // Serve static files
app.use(bodyParser.json()); // Parse JSON bodies

// MeaningCloud API endpoint and key
const meaningCloudAPI = {
  url: 'https://api.meaningcloud.com/sentiment-2.1',
  key: process.env.API_KEY,  // Your API key from the .env file
};

// Root route to serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

// POST route to handle NLP analysis request
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
    res.json(response.data);  // Send the response to the frontend
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error analyzing the URL');
  }
});
app.use(cors({
    origin: 'http://localhost:8800',
    methods: ['GET', 'POST', 'OPTIONS'],  // Include 'OPTIONS' if handling preflight requests
}));

// Start the server
const PORT = process.env.PORT || 8800;
app.listen(PORT, function () {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
