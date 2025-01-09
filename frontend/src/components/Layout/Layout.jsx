import "./Layout.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"; // 3-dot icon for dropdown
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Layout = ({ children, isAuthenticated, setIsAuthenticated }) => {
  const [anchorEl, setAnchorEl] = useState(null); // State to control the menu anchor
  const open = Boolean(anchorEl); // Determine if the menu is open

  // Function to handle opening the menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Function to handle closing the menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Function to handle logging out
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("authToken");
    handleClose();
  };

  return (
    <div className="layout-container">
      <header className="header flex justify-between">
        <Link to="/">
          <HomeIcon className="mr-2" fontSize="large" />
        </Link>
        <div className="dropdown-container">
          <MoreHorizIcon
            fontSize="large"
            className="mr-2"
            onClick={handleClick}
          />

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {!isAuthenticated ? (
              <MenuItem onClick={handleClose} className="mr-2" fontSize="large">
                <Link to="/login">Login</Link>
              </MenuItem>
            ) : (
              <>
                <MenuItem
                  onClick={handleClose}
                  className="mr-2"
                  fontSize="large"
                >
                  <Link to="/adddata">Add Records</Link>
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </>
            )}
          </Menu>
        </div>
      </header>

      <main className="main-content">{children}</main>

      <footer className="footer">
        <span className="text-2xl font-light">
          Designed by{" "}
          <a href="https://rahulnainala.com" target="_blank" rel="noreferrer">
            Rahul Nainala
          </a>
        </span>
      </footer>
    </div>
  );
};

export default Layout;
