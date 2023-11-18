// src/components/Header.js
import React from 'react';
import './Header.css'; // Import your main CSS file
import './NavigationLinks.css'; // Import the new CSS file
import HomeLink from './Home';
import AboutLink from './Aboutme';

function Header() {
  return (
    <header>
      <h1>RecipeFinder</h1>
      <nav className="header-links-container">
        <HomeLink />
        <AboutLink />
      </nav>
    </header>
  );
}

export default Header;


