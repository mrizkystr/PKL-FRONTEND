// File: C:\laragon\www\PKL-Frontend\src\pages\Sales\SalesStoPieChart.jsx

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  Grid,
  Container,
  Stack,
} from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { dataPsApi } from "../../api/api";
import toast from "react-hot-toast";
import { getDashboardData } from "../../api/api";
import SidebarUser from "../../components/layout/SidebarUser"; // Import SidebarUser

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
  "#a4de6c",
  "#d0ed57",
  "#ffc658",
  "#ff7300",
  "#8884d8",
  "#83a6ed",
];

const UserStoPieChart = () => {
  const [bulanPs, setBulanPs] = useState("");
  const [idMitra, setIdMitra] = useState("");

  const { data: chartData, isLoading } = useQuery({
    queryKey: ["stoPieChart", bulanPs, idMitra],
    queryFn: () => {
      const params = {
        bulan_ps: bulanPs,
        id_mitra: idMitra,
      };
      return dataPsApi.getStoPieChart(params);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to fetch pie chart data");
    },
  });

  const { data } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardData,
  });

  const transformedData = React.useMemo(() => {
    if (!chartData?.data) return [];
    return chartData.data.labels.map((label, index) => ({
      name: label,
      value: chartData.data.data[index],
    }));
  }, [chartData]);

  return (
    <Box sx={{ display: "flex" }}>
      <SidebarUser /> {/* Gunakan SidebarUser */}
      <Box sx={{ flex: 1, p: 4 }}>
        <Typography variant="h4" gutterBottom>
          STO Pie Chart Analysis
        </Typography>

        <Card sx={{ mb: 4, p: 3 }}>
          <CardContent>
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Bulan PS"
                  value={bulanPs}
                  onChange={(e) => setBulanPs(e.target.value)}
                  placeholder="Masukkan bulan (e.g., Januari)"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="ID Mitra"
                  value={idMitra}
                  onChange={(e) => setIdMitra(e.target.value)}
                  placeholder="Masukkan ID Mitra"
                />
              </Grid>
            </Grid>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: 450,
              }}
            >
              {isLoading ? (
                <Typography>Loading...</Typography>
              ) : (
                <PieChart width={800} height={400}>
                  <Pie
                    data={transformedData}
                    cx={400}
                    cy={200}
                    outerRadius={160}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {transformedData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              )}
            </Box>
          </CardContent>
        </Card>

        <Container>
          <Stack spacing={3}>
            <Grid container gap={3} justifyContent={{ xs: "center" }}>
              <Card sx={{ maxWidth: 345 }}>
                <CardContent>
                  <Typography gutterBottom variant="h5">
                    Completed Orders
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {data?.completedOrders}
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{ maxWidth: 345 }}>
                <CardContent>
                  <Typography gutterBottom variant="h5">
                    Total Sales Code
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {data?.totalSalesCodes}
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{ maxWidth: 345 }}>
                <CardContent>
                  <Typography gutterBottom variant="h5">
                    Total Orders User
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {data?.totalOrders}
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{ maxWidth: 345 }}>
                <CardContent>
                  <Typography gutterBottom variant="h5">
                    Total Pending Orders
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {data?.pendingOrders}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default UserStoPieChart;
