import React from "react";
import "../styles/Header.css";
import { Link } from "react-router-dom";
import firebase from "../firebase";

const linkStyle = {
  textDecoration: "none",
  color: "blue",
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
        <a onClick={handleLogout}>Logout</a>
      </div>
    </div>
  );
}

export default Header;
