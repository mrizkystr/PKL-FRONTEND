import React from "react";
import { Menu, MenuItem, Button } from "@mui/material";
import { useState } from "react";

const DropdownMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button onClick={handleOpen}>STO Chart</Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleClose} href="/login">
          STO Bar Chart
        </MenuItem>
        <MenuItem onClick={handleClose} href="/login">
          STO Pie Chart
        </MenuItem>
      </Menu>
    </>
  );
};

export default DropdownMenu;
