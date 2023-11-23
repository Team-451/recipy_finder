// src/components/Header.js
import React from "react";
import "./Header.css"; // Import your main CSS file
import "./NavigationLinks.css"; // Import the new CSS file
import HomeLink from "./Home";
import Logout from "./Logout";

function Header() {
  return (
    <header>
      <h1>RecipeFinder</h1>
      <nav className="header-links-container">
        <HomeLink />
        <Logout />
      </nav>
    </header>
  );
}

export default Header;
