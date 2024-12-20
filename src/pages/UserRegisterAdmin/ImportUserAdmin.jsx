import React, { useState } from "react";
import { Card, CardHeader, CardContent, Button, Alert } from "@mui/material";
import { adminApi } from "../../api/api";
import Sidebar from "../../components/layout/Sidebar";

const ImportUserAdmin = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file to upload");
      return;
    }

    try {
      await adminApi.users.importFile(file);
      setSuccess(true);
      setError("");
    } catch (error) {
      setError("Failed to import users");
      setSuccess(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#001f3f",
        minHeight: "100vh",
      }}
    >
      <Sidebar />
      <div style={{ flexGrow: 1, padding: 16 }}>
        <Card style={{ backgroundColor: "#003366", color: "#ffffff" }}>
          <CardHeader
            title="Import Users from Excel"
            style={{ color: "#ffffff" }}
          />
          <CardContent>
            {error && <Alert severity="error">{error}</Alert>}
            {success && (
              <Alert severity="success">Users imported successfully!</Alert>
            )}
            <form onSubmit={handleSubmit}>
              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileChange}
                style={{ margin: "20px 0", color: "#ffffff" }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Upload File
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ImportUserAdmin;
