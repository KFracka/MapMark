// client/src/App.js
import React from 'react';
import LeafletMap from './components/LeafletMap';
import AuthForm from './components/AuthForm';
import './App.css'; // If you have styles, keep this line; otherwise, you can remove it.

function App() {
  return (
    <div>
      <AuthForm />
      <LeafletMap />
    </div>
  );
}

export default App;
