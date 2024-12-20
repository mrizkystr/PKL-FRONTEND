import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline"; // Material UI Reset
import { ThemeProvider, createTheme } from "@mui/material/styles";
import App from "./App"; // Pastikan path ini sesuai dengan lokasi file App

// Buat tema Material UI jika diperlukan
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Reset CSS untuk Material UI */}
      <BrowserRouter>
        <App /> {/* Pastikan App membungkus seluruh aplikasi */}
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
