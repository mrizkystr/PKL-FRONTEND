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
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import SidebarSales from "../../components/layout/SidebarSales"; // Import Sidebar
import { dataPsApi } from "../../api/api";
import toast from "react-hot-toast";
import { getSalesDashboardData } from "../../api/api";

const SalesStoChart = () => {
  const [bulanPs, setBulanPs] = useState("");
  const [idMitra, setIdMitra] = useState("");

  const { data: chartData, isLoading } = useQuery({
    queryKey: ["stoBarChart", bulanPs, idMitra],
    queryFn: () => {
      const params = {
        bulan_ps: bulanPs,
        id_mitra: idMitra,
      };
      return dataPsApi.getStoChart(params);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to fetch bar chart data");
    },
  });

  const { data } = useQuery({
    queryKey: ["sales-dashboard"],
    queryFn: getSalesDashboardData,
  });

  const transformedData = React.useMemo(() => {
    if (!chartData?.data) return [];
    return chartData.data.labels.map((label, index) => ({
      name: label,
      value: chartData.data.data[index],
    }));
  }, [chartData]);

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <SidebarSales />

      {/* Main Content */}
      <Box sx={{ flex: 1, p: 4 }}>
        <Typography variant="h4" gutterBottom>
          STO Bar Chart Analysis
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
                <BarChart
                  width={800}
                  height={400}
                  data={transformedData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
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
    </div>
  );
};

export default SalesStoChart;
