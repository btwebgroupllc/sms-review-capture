import React from "react";
import "../styles/Header.css";

function Header() {
  return (
    <div className="header">
      <div className="header-links">
        <a>Contacts</a>
        <a>Templates</a>
        <a>Logout</a>
      </div>
    </div>
  );
}

export default Header;
