import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ONGsProvider } from './contexts/ONGsContext';
import Dashboard from './pages/Dashboard';
import Doacao from './pages/Doacao';

function App() {
  return (
    <ONGsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/doar/:id" element={<Doacao />} />
        </Routes>
      </BrowserRouter>
    </ONGsProvider>
  );
}

export default App;