import React from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";

const StatsSection = ({ stats }) => {
  const statsData = [
    { label: "Total Sales Codes", value: stats.totalSalesCodes, color: "primary" },
    { label: "Total Orders", value: stats.totalOrders, color: "secondary" },
    { label: "Completed Orders", value: stats.completedOrders, color: "success" },
    { label: "Pending Orders", value: stats.pendingOrders, color: "error" },
  ];

  return (
    <Grid container spacing={3} sx={{ mt: 4 }}>
      {statsData.map((stat, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card
            sx={{
              backgroundColor: (theme) => theme.palette[stat.color].main,
              color: "white",
              textAlign: "center",
              borderRadius: "8px",
            }}
          >
            <CardContent>
              <Typography variant="h6">{stat.label}</Typography>
              <Typography variant="h4" fontWeight="bold">
                {stat.value}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatsSection;
