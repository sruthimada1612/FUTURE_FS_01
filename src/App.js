import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import LeadDashboard from './components/LeadDashboard';

function App() {
  const [currentView, setCurrentView] = useState('portfolio'); // Values: 'portfolio' or 'crm'

  return (
    <div className="App">
      {/* Header bar switcher layout component toggler */}
      <nav className="navbar view-switcher-nav">
        <div className="nav-logo">Workspace Dashboard</div>
        <div className="switch-buttons">
          <button className={currentView === 'portfolio' ? 'active-btn' : ''} onClick={() => setCurrentView('portfolio')}>View Task 1: Portfolio</button>
          <button className={currentView === 'crm' ? 'active-btn' : ''} onClick={() => setCurrentView('crm')}>View Task 2: Mini CRM</button>
        </div>
      </nav>

      {currentView === 'portfolio' ? (
        <>
          <Navbar />
          <Hero />
          <About />
          <Projects />
          <Contact />
        </>
      ) : (
        <LeadDashboard />
      )}
    </div>
  );
}

export default App;