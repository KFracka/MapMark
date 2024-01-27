// server/routes/markerRoutes.js
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const DATA_FILE_PATH = path.join(__dirname, '../data/markers.json');

// Read marker data from the file
function readMarkerData(){
    try {
        const data = fs.readFileSync(DATA_FILE_PATH, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

// Write marker data to the file
function writeMarkerData(markers) {
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(markers, null, 2), 'utf8');
}

// Route to get all markers
router.get('/', (req, res) => {
    const markers = readMarkerData();
    res.json(markers);
});

router.get('/special', (req, res) => {
    const specialMarkers = readMarkerData().filter(marker => marker.isSpecial);
    res.json(specialMarkers);
});

// Route to add a new marker
router.post('/add', (req, res) => {
    const {name, lat, lng, imageURL, isSpecial } = req.body;

    // Read existing marker data
    const markers = readMarkerData();

    // Check if marker with the same coordinates already exists
    const existingMarker = markers.find((marker) => marker.lat === lat && marker.lng === lng);
    if (existingMarker) {
        return res.status(400).json({ message: 'Marker with this coordinates already exists '});
    }

    // Add the Marker with image URL
    const newMarker = { name, lat, lng, imageURL, isSpecial };
    markers.push(newMarker);

    // Write updated marker data to the file
    writeMarkerData(markers);

    res.json({ message: 'Marker added successful'});
});

// Route to delete a marker by coordinates
router.delete('/delete', (req, res) => {
    const { lat, lng } = req.body;

    // Read existing marker data
    let markers = readMarkerData();

    //Find the index of the marker with the specified coordinates
    const markerIndex = markers.findIndex((marker) => marker.lat === lat && marker.lng === lng);

    // Check if the marker with the specified coordinates exists
    if (markerIndex === -1){
        return res.status(404).json({message: 'Marker not found'});
    }

    // Remove the marker from the array
    markers.splice(markerIndex, 1);

    // Write the updated marker data to the file
    writeMarkerData(markers);

    res.json({message: 'Marker deleted successfully'});
});

module.exports = router;