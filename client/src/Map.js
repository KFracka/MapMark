// client/src/Map.js
import React from "react";
import GoogleMapView from "./GoogleMaps";
import 'bootstrap/dist/css/bootstrap.min.css';

const Map = () => {
    return (
        <div className="App">
            <header className="App-header">
                <h1>React Google Maps</h1>
            </header>
            <main>
                <GoogleMapView />
            </main>
        </div>
    );
};

export default Map;