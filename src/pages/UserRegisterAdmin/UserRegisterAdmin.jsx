// UserRegisterAdmin.js
import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Alert,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Sidebar from "../../components/layout/Sidebar"; // Import Sidebar
import { adminApi } from "../../api/api"; // Sesuaikan path jika berbeda

const UserRegisterAdmin = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await adminApi.users.getList();
      setUsers(response.users || []);
      setError("");
    } catch (err) {
      setError("Failed to fetch users");
      console.error("Error fetching users:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await adminApi.users.delete(id);
      setUsers(users.filter((user) => user.id !== id));
      setSuccess("User deleted successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to delete user");
      console.error("Error deleting user:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Box display="flex" bgcolor="#001f3f" minHeight="100vh" overflow="hidden">
      <Sidebar />
      <Box flexGrow={1} p={4} mt={10} mr={8} ml={4}>
        <Card sx={{ backgroundColor: "#003366", color: "#ffffff" }}>
          <CardHeader title="Data Users" sx={{ color: "#ffffff" }} />
          <CardContent>
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}
            <Button
              variant="contained"
              color="primary"
              onClick={() => (window.location.href = "/admin/users/create")}
              style={{ marginRight: "10px" }} // Add some spacing between the buttons
            >
              Add New User
            </Button>
            <Button
              variant="contained"
              style={{ backgroundColor: "green", color: "white" }} // Set color to green for the import button
              onClick={() => (window.location.href = "/admin/users/import")}
            >
              Import New User
            </Button>
            <TableContainer sx={{ mt: 3, backgroundColor: "#e6f7ff" }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#007acc" }}>
                    <TableCell sx={{ color: "#ffffff" }}>ID</TableCell>
                    <TableCell sx={{ color: "#ffffff" }}>Username</TableCell>
                    <TableCell sx={{ color: "#ffffff" }}>Email</TableCell>
                    <TableCell sx={{ color: "#ffffff" }}>Role</TableCell>
                    <TableCell sx={{ color: "#ffffff" }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.length > 0 ? (
                    users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          {user.roles && user.roles.length > 0
                            ? user.roles[0].name
                            : "No role"}
                        </TableCell>
                        <TableCell>
                          <IconButton
                            color="primary"
                            onClick={() =>
                              (window.location.href = `/admin/users/update/${user.id}`)
                            }
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            color="secondary"
                            onClick={() => handleDelete(user.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        No users found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default UserRegisterAdmin;
