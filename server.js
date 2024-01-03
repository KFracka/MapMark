// server.js
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client', 'build')));

// Handle requests to the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log('Server is running on http://localhost:3001');
});