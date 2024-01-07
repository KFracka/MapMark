// client/src/App.js
import React from 'react';
import LeafletMap from './components/LeafletMap';
import './App.css'; // If you have styles, keep this line; otherwise, you can remove it.

function App() {
  return (
    <div>
      <h1>React Leaflet Map</h1>
      <LeafletMap />
    </div>
  );
}

export default App;
