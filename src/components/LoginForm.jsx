import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/api";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
} from "@mui/material";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Mutasi untuk menangani proses login
  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: async () => {
      const response = await login(username, password);
      return response.data; // Ambil data dari respons API
    },
    onSuccess: (data) => {
      const { token, role } = data; // Ekstrak role dari data
  
      localStorage.setItem("authToken", token);
  
      // Arahkan pengguna sesuai role
      if (role === "admin") {
        navigate("/dashboard");
      } else if (role === "sales") {
        navigate("/sales/dashboard");
      } else if (role === "user") {
        navigate("/user/dashboard"); // Arahkan pengguna role 'user' ke dashboard mereka
      } else {
        toast.error("Unauthorized role");
        return;
      }
  
      toast.success("Login successful!");
    },
    onError: (error) => {
      // Tampilkan pesan error
      toast.error(error.message || "Login failed");
    },
  });

  // Fungsi untuk submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error("Username dan Password harus diisi.");
      return;
    }
    mutation.mutate();
  };

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: "100vh",
        backgroundImage: "url('/images/sateliteee.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          width: 400,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: 2,
        }}
      >
        <Box textAlign="center" mb={2}>
          <img
            src="/images/telkom.png"
            alt="Telkom Logo"
            style={{ width: 150, marginBottom: "16px" }}
          />
        </Box>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username or Gmail"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={mutation.isLoading}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={mutation.isLoading}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default LoginForm;
