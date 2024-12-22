import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Grid, Alert } from "@mui/material";
import { salesCodesApi } from "../../api/api";
import Sidebar from "../../components/layout/Sidebar"; // Import Sidebar component

const SalesCodeCreateForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    mitra_nama: "",
    nama: "",
    sto: "",
    id_mitra: "",
    nama_mitra: "",
    role: "",
    kode_agen: "",
    kode_baru: "",
    no_telp_valid: "",
    nama_sa_2: "",
    status_wpi: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await salesCodesApi.create(formData); // Create a new sales code
      setSuccess(true);
      setError("");
      setFormData({
        mitra_nama: "",
        nama: "",
        sto: "",
        id_mitra: "",
        nama_mitra: "",
        role: "",
        kode_agen: "",
        kode_baru: "",
        no_telp_valid: "",
        nama_sa_2: "",
        status_wpi: "",
      }); // Reset the form after create
      navigate("/sales-codes"); // Redirect after successful create
    } catch (error) {
      console.error("Error saving sales code:", error);
      setError(error.response?.data?.message || "Failed to save sales code.");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", backgroundColor: "#001F3D", minHeight: "100vh" }}>
    {/* Sidebar */}
    <Sidebar /> 

    {/* Main Content */}
    <main style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', backgroundColor: '#001F3D' }}>
      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '800px', backgroundColor: '#E3F2FD', padding: '20px', borderRadius: '8px' }}>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">Sales Code Created successfully!</Alert>}
          {/* Form Inputs */}
          <Grid container spacing={3}>
            {Object.keys(formData).map((key) => (
              <Grid item xs={12} sm={6} key={key}>
                <TextField
                  fullWidth
                  label={key.replace("_", " ")} // Format label to replace underscores with spaces
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  variant="outlined"
                  style={{ backgroundColor: "#E0F7FA" }} // Light blue background for inputs
                />
              </Grid>
            ))}
          </Grid>

          {/* Buttons */}
          <div style={{ marginTop: 16, display: "flex", gap: 16 }}>
            <Button 
              variant="outlined" 
              onClick={() => navigate("/sales-codes")}
              style={{ borderColor: "#001F3F", color: "#001F3F" }}
            >
              Back
            </Button>
            <Button 
              variant="contained" 
              type="submit" 
              disabled={loading}
              style={{ backgroundColor: "#001F3F", color: "#fff" }}
            >
              {loading ? "Creating..." : "Create"}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default SalesCodeCreateForm;
