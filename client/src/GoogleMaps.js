// client/src/GoogleMaps.js
import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '400px',
};

//University of Gdansk -> Faculty of Management: 54.44299334107368, 18.555826915423975
const center = {
    lat: 54.44299334107368,
    lng: 18.555826915423975
};

const GoogleMapView = () => {
    return (
        <LoadScript googleMapsApiKey='AIzaSyAq0izGdqsMZH0kDg903QCbVHmhgOP9GOc'>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={12}
            >
                <Marker position={center} />
            </GoogleMap>
      </LoadScript>
    );
  };

export default GoogleMapView;