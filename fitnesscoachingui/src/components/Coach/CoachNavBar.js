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





function CoachNavBar() {
  const navigate = useNavigate();

  const navigateClientInfoHandler = () => {
    navigate('/clients');
  };
  
  const navigateCoachHomeHandler = () => {
    navigate('/');
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
          <Button color="inherit" onClick={navigateClientInfoHandler}>Clients</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default CoachNavBar;
