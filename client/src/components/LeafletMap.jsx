// client/src/components/LeafletMap.jsx
import React, { useState, useEffect, useRef } from 'react';
import { TileLayer, Marker, Popup, MapContainer as Map, useMap } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import { Form, Button, Container, Row, Col, Modal } from 'react-bootstrap';
import './LeafletMap.css';
import mapMarkerSpecial from '../../src/flag-marker.svg';
import defaultMapMarker from '../../src/map-marker.svg';
import TopSection from './TopSection';

const LeafletMap = () => {
    const mapRef = useRef(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [showAddMarkerModal, setShowAddMarkerModal] = useState(false);
    const [showDeleteMarkerModal, setShowDeleteMarkerModal] = useState(false);
    const [newMarkerLat, setNewMarkerLat] = useState('');
    const [newMarkerLng, setNewMarkerLng] = useState('');
    const [newMarkerName, setNewMarkerName] = useState('');
    const [specialMarkers, setSpecialMarkers] = useState([]);
    const [allMarkers, setAllMarkers] = useState([]);

    const onSearchButtonClick = async (e) => {
        e.preventDefault(); // Prevent from submission
        try {
            const response = await axios.get(
                `https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`
            );
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    useEffect(() => {
        const fetchSpecialMarkers = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/markers/special');
                setAllMarkers(response.data);
            } catch (error) {
                console.error('Error fetching special markers: ', error);
            }
        };
        fetchSpecialMarkers();
    }, []);

    const handleMarkerClick = (location) => {
        setSelectedLocation(location);
    }

    const handleSearch = async () => {
        try {
            const response = await axios.get(
                `https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`
            );

            setSearchResults(response.data);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    const handleDeleteMarker = async (lat, lng) => {
        try {
            await axios.delete('http://localhost:3001/api/markers/delete', {
                data: { lat, lng },
            });

            // Refresh the markers after deletion
            handleSearch();
            setShowDeleteMarkerModal(false);
        } catch (error) {
            console.error('Marker deletion failed', error.response?.data || error.message);
        }
    };

    const handleAddMarker = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/markers/add', {
                name: newMarkerName,
                lat: newMarkerLat,
                lng: newMarkerLng,
                imageURL: '/flag-marker.svg',
                isSpecial: true,
            });

            console.log(response.data);
            // Refresh the markers after adding
            handleSearch();
            setShowAddMarkerModal(false);
        } catch (error) {
            console.error('Marker addition failed', error.response.data.message);
        }
    };

    const specialIcon = L.icon({
        iconUrl: mapMarkerSpecial,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    });

    const renderMarkers = () => {
        const defaultIcon = L.icon({
            iconUrl: defaultMapMarker,
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32],
        });

        const specialIcon = L.icon({
            iconUrl: mapMarkerSpecial,
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32],
        });

        const markersFromSearchResults = searchResults.map((result) => (
            <Marker
                key={result.place_id}
                position={[result.lat, result.lon]}
                onClick={() => handleMarkerClick({ lat: result.lat, lng: result.lon })}
                icon={defaultIcon}
            >
                {/* You can customize the Popup content based on search result properties */}
                <Popup>
                    <div>
                        <h4>{`Search Result at (${result.lat}, ${result.lon})`}</h4>
                        {/* Add other details from search result as needed */}
                    </div>
                </Popup>
            </Marker>
        ));

        return (
            searchResults.map((result) => (
                <Marker
                    key={result.place_id}
                    position={[result.lat, result.lon]}
                    onClick={() => handleMarkerClick({ lat: result.lat, lng: result.lon })}
                    icon={defaultIcon}
                >
                    <Popup>
                        {result.display_name}
                        <Button
                            variant="danger"
                            size="sm"
                            className="m1-2"
                            onClick={() => handleDeleteMarker(result.lat, result.lon)}
                        >
                            Delete Marker
                        </Button>
                    </Popup>
                </Marker>
            ))
            .concat(
                allMarkers.map((singleMarker) => (
                    <Marker
                        key={`${singleMarker.lat}-${singleMarker.lng}`}
                        position={[parseFloat(singleMarker.lat), parseFloat(singleMarker.lng)]}
                        icon={singleMarker.isSpecial ? specialIcon : defaultIcon}
                    >
                        <Popup>
                            <div>
                                <h4>{`Marker at (${singleMarker.lat}, ${singleMarker.lng})`}</h4>
                                {singleMarker.isSpecial && <p>This is a special marker!</p>}
                                <img src={singleMarker.imageURL} alt="Marker" style={{ width: '100px', height: '100px' }} />
                                {/* Add other details from markers.json as needed */}
                            </div>
                        </Popup>
                    </Marker>
                ))
            )
    );
};

return (
    <Container fluid style={{ padding: 0, margin: 0, height: '100vh' }}>
        <TopSection
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
            setShowAddMarkerModal={setShowAddMarkerModal}
            setShowDeleteMarkerModal={setShowDeleteMarkerModal}
            onSearchButtonClick={onSearchButtonClick}
        />
            <Row className="mt-3" style={{ height: 'calc(100% - 64px)' }}>
                <Col style={{ height: '100%', overflow: 'hidden' }}>
                    <Map
                        center={[54.44299334107368, 18.555826915423975]}
                        zoom={5}
                        style={{ height: '100%' }}
                        ref={mapRef}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        {renderMarkers()}
                        {selectedLocation && (
                            <Marker
                                position={[selectedLocation.lat, selectedLocation.lng]}
                                icon={specialIcon}
                            >
                                <Popup>{`Selected Location: ${selectedLocation.lat}, ${selectedLocation.lng}`}</Popup>
                            </Marker>
                        )}
                    </Map>
                </Col>
            </Row>
            <Modal show={showAddMarkerModal} onHide={() => setShowAddMarkerModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Marker</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleAddMarker}>
                        <Form.Group controlId="newMarkerName">
                            <Form.Label>Marker Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter marker name"
                                value={newMarkerName}
                                onChange={(e) => setNewMarkerName(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="newMarkerLat">
                            <Form.Label>Latitude</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter latitude"
                                value={newMarkerLat}
                                onChange={(e) => setNewMarkerLat(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="newMarkerLng">
                            <Form.Label>Longitude</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter longitude"
                                value={newMarkerLng}
                                onChange={(e) => setNewMarkerLng(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Add Marker
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
            <Modal show={showDeleteMarkerModal} onHide={() => setShowDeleteMarkerModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Marker</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="deleteMarkerLat">
                            <Form.Label>Latitude: </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Latitude"
                                value={newMarkerLat} // Assuming you want to delete the marker based on its coordinates
                                onChange={(e) => setNewMarkerLat(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="deleteMarkerLng">
                            <Form.Label>Longitude: </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Longitude"
                                value={newMarkerLng} // Assuming you want to delete the marker based on its coordinates
                                onChange={(e) => setNewMarkerLng(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteMarkerModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={() => handleDeleteMarker(newMarkerLat, newMarkerLng)}>
                        Delete Marker
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default LeafletMap;