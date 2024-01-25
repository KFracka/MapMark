// client/src/components/LeafletMap.jsx
import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { OverlayTrigger, Popover } from 'react-bootstrap';


const LeafletMap = () => {
    const position = [54.44299334107368, 18.555826915423975]; //Default position

    // Set the default Leaflet marker icon
    useEffect(() => {
        const customIcon = new L.Icon({
            iconUrl: process.env.PUBLIC_URL + '/map-marker.svg',
            iconSize: [32, 32], //Adjust the size as needed
            iconAnchor: [16, 32], //Adjust the anchor point if needed
        })
        
        L.Marker.prototype.options.icon = customIcon;
    }, []);

    const popover = (
        <Popover id="popover-basic">
            <Popover.Header as ="h3">Sample Popover</Popover.Header>
            <Popover.Body>A sample popover. Easily customizable.</Popover.Body>
        </Popover>
    );

    return (
        <MapContainer center={position} zoom={13} style={{ height: '100vh', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'/>
                <Marker position={position}>
                    <OverlayTrigger trigger="click" placement="top" overlay={popover}>
                        <div>
                            <img src={process.env.PUBLIC_URL + '/map-marker.svg'} alt="Marker" />
                        </div>
                    </OverlayTrigger>
                </Marker>
        </MapContainer>
    );
};

export default LeafletMap;