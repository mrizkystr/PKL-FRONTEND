import React from "react";
import { Box, Typography } from "@mui/material";

const Banner = () => {
  return (
    <Box
      sx={{
        textAlign: "center",
        my: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        DATA PS MANAGEMENT
      </Typography>
      <Box
        component="img"
        src="/images/sateliteee.jpg"
        alt="Satellite"
        sx={{
          width: "80%",
          maxHeight: "300px",
          objectFit: "cover",
          borderRadius: "16px",
        }}
      />
    </Box>
  );
};

export default Banner;
