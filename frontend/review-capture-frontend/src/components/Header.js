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
          <a>Home</a>
        </Link>
        <Link to="/contacts" style={linkStyle}>
          <a>Contacts</a>
        </Link>
        <a>Templates</a>
        <a>Logout</a>
      </div>
    </div>
  );
}

export default Header;
