import React, { useState, useEffect } from "react";
import {
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
  const [users, setUsers] = useState([]); // Menyimpan data users
  const [error, setError] = useState(""); // Menyimpan pesan error
  const [success, setSuccess] = useState(""); // Menyimpan pesan sukses

  const fetchUsers = async () => {
    try {
      const response = await adminApi.users.getList();
      setUsers(response.users || []); // Update state users
      setError("");
    } catch (err) {
      setError("Failed to fetch users");
      console.error("Error fetching users:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await adminApi.users.delete(id);
      setUsers(users.filter((user) => user.id !== id)); // Hapus user dari state
      setSuccess("User deleted successfully!");
      setTimeout(() => setSuccess(""), 3000); // Reset pesan sukses
    } catch (err) {
      setError("Failed to delete user");
      console.error("Error deleting user:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#001f3f",
        minHeight: "100vh",
      }}
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="p-6" style={{ flexGrow: 1 }}>
        <Card style={{ backgroundColor: "#003366", color: "#ffffff" }}>
          <CardHeader title="Data Users" style={{ color: "#ffffff" }} />
          <CardContent>
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}
            <div style={{ marginTop: "20px" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => (window.location.href = "/admin/users/create")}
              >
                Add New User
              </Button>
              <Button
                variant="contained"
                color="secondary"
                style={{ marginLeft: "10px" }}
                onClick={() => (window.location.href = "/admin/users/import")}
              >
                Import Excel
              </Button>
            </div>
            <TableContainer
              style={{ marginTop: "20px", backgroundColor: "#e6f7ff" }}
            >
              <Table>
                <TableHead>
                  <TableRow style={{ backgroundColor: "#007acc" }}>
                    <TableCell style={{ color: "#ffffff" }}>ID</TableCell>
                    <TableCell style={{ color: "#ffffff" }}>Username</TableCell>
                    <TableCell style={{ color: "#ffffff" }}>Email</TableCell>
                    <TableCell style={{ color: "#ffffff" }}>Role</TableCell>
                    <TableCell style={{ color: "#ffffff" }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.length > 0 ? (
                    users.map((user) => (
                      <TableRow
                        key={user.id}
                        style={{ backgroundColor: "#f0f8ff" }}
                      >
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
      </div>
    </div>
  );
};

export default UserRegisterAdmin;
