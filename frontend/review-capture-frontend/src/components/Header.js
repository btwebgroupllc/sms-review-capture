import React from "react";
import "../styles/Header.css";
import { Link } from "react-router-dom";

const linkStyle = {
  textDecoration: "none",
  color: "blue",
};

function Header() {
  return (
    <div className="header">
      <div className="header-links">
        <Link to="/home" style={linkStyle}>
          Home
        </Link>
        <Link to="/contacts" style={linkStyle}>
          Contacts
        </Link>
        <Link to="/campaigns" style={linkStyle}>
          Campaigns
        </Link>
        <a>Templates</a>
        <a>Logout</a>
      </div>
    </div>
  );
}

export default Header;
