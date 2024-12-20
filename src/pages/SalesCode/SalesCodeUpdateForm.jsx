import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Button, Grid, Alert, Paper } from "@mui/material";
import { salesCodesApi } from "../../api/api";
import Sidebar from "../../components/layout/Sidebar"; // Import Sidebar component

const SalesCodeUpdateForm = () => {
  const { id } = useParams(); // Get the sales code ID from the URL parameters
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
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchSalesCode(); // Load existing data for editing
  }, [id]);

  // Fetch the sales code data for editing
  const fetchSalesCode = async () => {
    try {
      setLoading(true);
      const response = await salesCodesApi.getDetail(id); // Get the sales code detail using the API
      setFormData(response.data); // Populate the form with fetched data
      setError("");
    } catch (error) {
      console.error("Error fetching sales code:", error);
      setError("Failed to load sales code data.");
    } finally {
      setLoading(false);
    }
  };

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await salesCodesApi.update(id, formData); // Update the sales code
      setSuccess(true);
      setError("");
      navigate("/sales-codes"); // Redirect after successful update
    } catch (error) {
      console.error("Error saving sales code:", error);
      setError(error.response?.data?.message || "Failed to save sales code.");
      setSuccess(false);
    }
  };

  if (loading) {
    return <p>Loading sales code data...</p>;
  }

  return (
    <div style={{ display: "flex", backgroundColor: "#001f3d", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar /> 

      {/* Main Content */}
      <main style={{ padding: 16, flex: 1, backgroundColor: "#f0f8ff" }}>
        <form onSubmit={handleSubmit}>
          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">Sales code updated successfully!</Alert>}
          
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
                  style={{ backgroundColor: "#e0f7fa" }} // Light blue background for inputs
                />
              </Grid>
            ))}
          </Grid>

          {/* Buttons */}
          <div style={{ marginTop: 16, display: "flex", gap: 16 }}>
            <Button 
              variant="outlined" 
              onClick={() => navigate("/sales-codes")}
              style={{ borderColor: "#001f3d", color: "#001f3d" }}
            >
              Back
            </Button>
            <Button 
              variant="contained" 
              type="submit" 
              style={{ backgroundColor: "#001f3d", color: "#fff" }}
            >
              Update
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default SalesCodeUpdateForm;
