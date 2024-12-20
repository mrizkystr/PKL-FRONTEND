import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Typography, Paper, Grid } from "@mui/material";
import SidebarSales from "../../components/layout/SidebarSales"; // Import Sidebar
import { salesApi } from "../../api/api"; // Sesuaikan path jika berbeda

const SalesViewDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [salesCode, setSalesCode] = useState(null);

  useEffect(() => {
    if (id) {
      fetchSalesCode();
    }
  }, [id]);

  const fetchSalesCode = async () => {
    try {
      const response = await salesApi.salesCodesApi.getDetail(id); // Ganti 'show' dengan 'getDetail'
      setSalesCode(response.data);
    } catch (error) {
      console.error("Error fetching sales code details:", error);
    }
  };

  if (!salesCode) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <SidebarSales />

      {/* Main Content */}
      <div style={{ flex: 1, padding: 16 }}>
        <Paper style={{ padding: 16 }}>
          <Typography variant="h4" gutterBottom>
            Sales View Details
          </Typography>
          <Grid container spacing={2}>
            {Object.keys(salesCode).map((key) => (
              <Grid item xs={12} sm={6} key={key}>
                <Typography variant="subtitle2" color="textSecondary">
                  {key.replace("_", " ")}
                </Typography>
                <Typography variant="body1">{salesCode[key] || "-"}</Typography>
              </Grid>
            ))}
          </Grid>
          <div style={{ marginTop: 16 }}>
            <Button variant="outlined" onClick={() => navigate("/sales/sales-codes")}>
              Back
            </Button>
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default SalesViewDetail;
