import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Button,
  Alert,
  MenuItem,
  Grid,
} from "@mui/material";
import { adminApi } from "../../api/api";
import Sidebar from "../../components/layout/Sidebar";

const CreateUserAdmin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    role: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.username ||
      !formData.password ||
      !formData.role
    ) {
      setError("All fields are required.");
      return;
    }

    try {
      await adminApi.users.store(formData);
      setSuccess(true);
      setError("");
      navigate("/admin/users");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to create user");
      setSuccess(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#001f3f", // BIRU DONGKER
        minHeight: "100vh",
      }}
    >
      <Sidebar />
      <div style={{ flexGrow: 1, padding: "24px" }}>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={12} md={8} lg={6}>
            <Card
              elevation={3}
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "8px",
              }}
            >
              <CardHeader
                title="Add New User"
                style={{
                  textAlign: "center",
                  color: "#0288D1",
                  fontWeight: "bold",
                }}
              />
              <CardContent>
                {/* Alerts */}
                {error && (
                  <Alert severity="error" style={{ marginBottom: "16px" }}>
                    {error}
                  </Alert>
                )}
                {success && (
                  <Alert severity="success" style={{ marginBottom: "16px" }}>
                    User created successfully!
                  </Alert>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit}>
                  <TextField
                    name="name"
                    label="Name"
                    value={formData.name}
                    onChange={handleChange}
                    margin="normal"
                    fullWidth
                    variant="outlined"
                  />
                  <TextField
                    name="email"
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    margin="normal"
                    fullWidth
                    variant="outlined"
                  />
                  <TextField
                    name="username"
                    label="Username"
                    value={formData.username}
                    onChange={handleChange}
                    margin="normal"
                    fullWidth
                    variant="outlined"
                  />
                  <TextField
                    name="password"
                    label="Password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    margin="normal"
                    fullWidth
                    variant="outlined"
                  />
                  <TextField
                    name="role"
                    label="Role"
                    select
                    value={formData.role}
                    onChange={handleChange}
                    margin="normal"
                    fullWidth
                    variant="outlined"
                  >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="sales">Sales</MenuItem>
                    <MenuItem value="user">User</MenuItem>
                  </TextField>
                  <Button
                    type="submit"
                    variant="contained"
                    style={{
                      backgroundColor: "#0288D1",
                      color: "#ffffff",
                      marginTop: "16px",
                      padding: "10px 0",
                    }}
                    fullWidth
                  >
                    Create User
                  </Button>
                </form>

                {/* Back to List Button */}
                <Button
                  variant="outlined"
                  style={{
                    marginTop: "16px",
                    color: "#0288D1",
                    borderColor: "#0288D1",
                    padding: "10px 0",
                  }}
                  fullWidth
                  onClick={() => navigate("/admin/users")}
                >
                  Back to List
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default CreateUserAdmin;
