import React from 'react';
import ONGCard from '../components/ONGCard';
import { useONGs } from '../contexts/ONGsContext';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const { ongs } = useONGs();

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
         <img src="/logos/logo-eco-ong.png" alt="Logo da EcoONG" className="logo"/>
        <p>Conectando você a causas que transformam o mundo.</p>
      </header>
      
      <main className="dashboard-grid">
        {ongs.map(ong => (
          <ONGCard key={ong.id} ong={ong} />
        ))}
      </main>
    </div>
  );
};

export default Dashboard;