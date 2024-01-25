// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors module
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

// Use cors middleware to enable Cross-Origin Resource Sharing
app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// User routes
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
    console.log('Server is running on http://localhost:3001');
});

