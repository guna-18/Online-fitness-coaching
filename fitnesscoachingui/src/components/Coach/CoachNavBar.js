import React from "react";
import ReactDOM from "react-dom/client";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from 'react-router-dom';





function CoachNavBar({userType,changeUserId}) {
  const navigate = useNavigate();


  const navigateAdminInfoHandler = () => {
    navigate('/admin');
  };
  const navigateClientInfoHandler = () => {
    navigate('/clients');
  };
  const navigateCoachHomeHandler = () => {
    navigate('/coachHomepage');
  };
  const handleLogout = () => {
    // Clear sessionStorage items
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("usertype");
    changeUserId(null);
    // Redirect to the login page
    navigate("/login");
  };
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {/* <Link to="/">Fit Pal</Link> */}
            <Button color="inherit" onClick={navigateCoachHomeHandler}>Fit Pal</Button>
          </Typography>
          {userType === 'Admin' && (
          <Button color="inherit" onClick={navigateAdminInfoHandler}>Admin</Button>
          )}
          {/* <Button color="inherit" onClick={navigateClientInfoHandler}>Clients</Button> */}
          {userType === 'Coach' && (
            <Button color="inherit" onClick={navigateClientInfoHandler}>
              Clients
            </Button>
          )}
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default CoachNavBar;
