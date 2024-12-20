import React from "react";
import { Box, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        textAlign: "center",
        py: 2,
        backgroundColor: "#f5f5f5",
        mt: 4,
      }}
    >
      <Typography variant="body2" color="textSecondary">
        Follow us on:
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 1 }}>
        <Link href="https://instagram.com" underline="hover">
          Instagram
        </Link>
        <Link href="https://twitter.com" underline="hover">
          Twitter
        </Link>
        <Link href="https://facebook.com" underline="hover">
          Facebook
        </Link>
        <Link href="tel:123456789" underline="hover">
          Phone
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;
