// server.js
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const { marker } = require('leaflet');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

const DATA_FILE ='markers.json';

// Read existing markers from the JSON file
let markers = [];
try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    markers = JSON.parse(data);
} catch (error) {
    console.log('Error reading markers file: ', error.message);
}

// Middleware to write markers to the JSON file after each request
app.use((req, res, next) => {
    fs.writeFile(DATA_FILE, JSON.stringify(markers, null, 2), (err) => {
        if (err) {
            console.error('Error writing markers file: ', err.message);
        }
        next();
    });
});

// CRUD operations go here
// Create
app.post('/api/markers', (req, res) => {
    const { latitude, longitude, description } = req.body;
    const newMarker = { id: markers.length + 1, latitude, longitude, description };
    markers.push(newMarker);
    res.send('Marker added successfully!');
});

// Read
app.get('/api/markers', (req, res) => {
    res.json(markers);
});

//Update
app.put('/api/markers/:id', (req, res) => {
    const { id } = req.params;
    const { latitude, longitude, description } = req.body;
    const index = markers.findIndex((marker) => marker.id === parseInt(id));
    if (index !== -1) {
        markers[index] = { ...markers[index], latitude, longitude, description };
        res.send('Marker updated successfully!');
    } else {
        res.status(404).send('Marker not found');
    }
});

// Delete
app.delete('/api/markers/:id', (req, res) => {
    const { id } = req.params;
    const index = markers.findIndex((marker) => marker.id === parseInt(id));
    if (index != -1) {
        markers.splice(index, 1);
        res.send('Marker deleted successfully!');
    } else {
        res.status(404).send('Marker not found');
    }
});

app.listen(PORT, () => {
    console.log('Server is running on http://localhost:3001');
});