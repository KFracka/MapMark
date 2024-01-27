// client/src/App.js
import React, { useState } from 'react';
import LeafletMap from './components/LeafletMap';
import AuthForm from './components/AuthForm';
import './App.css'; // If you have styles, keep this line; otherwise, you can remove it.

function App() {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (value) => {
    setSearchValue(value);
  };

  return (
    <div>
      <AuthForm />
      <LeafletMap searchValue={searchValue} onSearch={handleSearchChange} />
    </div>
  );
}

export default App;
