import "./Layout.css";
import React from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <header className="header flex justify-between">
        <Link to="/">
          <HomeIcon className="mr-2" fontSize="large" />
        </Link>
        <Link to="/user-profile">
          <PersonOutlineIcon className="mr-2" fontSize="large" />
        </Link>
      </header>
      <main className="main-content">{children}</main>
      <footer className="footer">
        <span className="text-2xl font-light">
          Designed by{" "}
          <a href="https://rahulnainala.com" target="_blank" rel="noref">
            Rahul Nainala
          </a>
        </span>
      </footer>
    </div>
  );
};

export default Layout;
