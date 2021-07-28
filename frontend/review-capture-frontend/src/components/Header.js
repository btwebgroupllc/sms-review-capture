import React from "react";
import "../styles/Header.css";
import { Link } from "react-router-dom";
import firebase from "../firebase";

const linkStyle = {
  textDecoration: "none",
  color: "white",
};

async function handleLogout(props) {
  try {
    await firebase.logout();
  } catch (error) {
    console.error("unable to logout");
  }
}

function Header() {
  return (
    <div className="header" style={{ backgroundColor: "#2a9d8f" }}>
      <div className="header-links" style={{ color: "white" }}>
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
        <a onClick={handleLogout}>Logout</a>
      </div>
    </div>
  );
}

export default Header;
