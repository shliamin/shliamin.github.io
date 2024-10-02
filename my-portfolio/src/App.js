import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import Footer from './Footer';
import './App.css';


function App() {
  const [activeSection, setActiveSection] = useState('about-me');

  return (
    <div className="container">
      <Header />
      <div className="layout">
        <Sidebar onSectionChange={setActiveSection} />
        <MainContent activeSection={activeSection} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
