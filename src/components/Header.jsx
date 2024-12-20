import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import DropdownMenu from "./DropdownMenu";
import DropdownMenuSto from "./DropdownMenuSto";
import DropdownMenuMitra from "./DropdownMenuMitra";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Header = () => {
  const navigate = useNavigate(); // Hook untuk navigasi

  const handleLoginClick = () => {
    navigate("/login"); // Navigasi ke halaman login
  };

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Telkom Indonesia
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button onClick={() => navigate("/login")}>Dashboard</Button>
          <Button onClick={() => navigate("/login")}>Data PS</Button>
          <Button onClick={() => navigate("/login")}>Sales Codes</Button>
          <DropdownMenuSto />
          <DropdownMenuMitra />
          <DropdownMenu />
          <Button onClick={() => navigate("/login")}>Target Tracking</Button>
        </Box>
        <Button
          variant="contained"
          color="error"
          sx={{ ml: 2 }}
          onClick={handleLoginClick} // Panggil fungsi handleLoginClick
        >
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
