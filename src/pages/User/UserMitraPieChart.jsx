import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { userApi } from "../../api/api";
import { getUserDashboardData } from "../../api/api";
import SidebarUser from "../../components/layout/SidebarUser";
import {
  Box,
  Card,
  CardContent,
  Container,
  FormControl,
  Grid,
  Stack,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const UserMitraPieChart = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedSto, setSelectedSto] = useState("");

  // Manually defined list of STOs
  const stoList = [
    "SPL",
    "BOO",
    "DMG",
    "LWL",
    "CSE",
    "PAR",
    "CGD",
    "PAG",
    "JSA",
    "ABC",
    "BCD",
    "LBI",
    "CPS",
  ];

  // Fetching data using React Query
  const {
    data: chartData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userMitraPieChart", selectedMonth, selectedSto],
    queryFn: async () => {
      try {
        const response = await userApi.dataPsApi.getMitraPieChart({
          bulan_ps: selectedMonth,
          sto: selectedSto,
        });
        console.log("Response from API:", response); // Debugging
        return response;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw new Error(error.message);
      }
    },
  });

  const { data } = useQuery({
    queryKey: ["user-dashboard"],
    queryFn: getUserDashboardData,
  });

  // Transforming data for PieChart
  const transformedData = React.useMemo(() => {
    if (!chartData?.labels || !chartData?.totals) return [];
    return chartData.labels.map((label, index) => ({
      name: label,
      value: chartData.totals[index],
    }));
  }, [chartData]);

  // Colors for PieChart
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#FF4560",
    "#00A5CF",
  ];

  // Handlers for dropdowns
  const handleMonthChange = (event) => setSelectedMonth(event.target.value);
  const handleStoChange = (event) => setSelectedSto(event.target.value);

  // Months for the dropdown
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <SidebarUser />
      <Container maxWidth="xl">
        <Box sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            User Mitra Pie Chart
          </Typography>
          {/* Dropdown Filters */}
          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Pilih Bulan</InputLabel>
                <Select value={selectedMonth} onChange={handleMonthChange}>
                  <MenuItem value="">Semua Bulan</MenuItem>
                  {months.map((month) => (
                    <MenuItem key={month} value={month}>
                      {month}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Pilih STO</InputLabel>
                <Select value={selectedSto} onChange={handleStoChange}>
                  <MenuItem value="">Semua STO</MenuItem>
                  {stoList.map((sto) => (
                    <MenuItem key={sto} value={sto}>
                      {sto}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* Chart Rendering */}
          {isLoading ? (
            <Typography align="center">Loading...</Typography>
          ) : error ? (
            <Typography align="center" color="error">
              Error: {error.message}
            </Typography>
          ) : transformedData.length > 0 ? (
            <Card>
              <CardContent>
                <Box sx={{ width: "100%", height: 400 }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={transformedData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={150}
                        fill="#8884d8"
                        label
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
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          ) : (
            <Typography align="center">
              No data available for the selected filters.
            </Typography>
          )}
          {/* Dashboard Statistics */}
          <Container>
            <Stack spacing={3}>
              <Grid container gap={3} justifyContent={{ xs: "center" }}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardContent>
                    <Typography gutterBottom variant="h5">
                      Completed Orders
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {data?.completedOrders ?? "N/A"}
                    </Typography>
                  </CardContent>
                </Card>
                <Card sx={{ maxWidth: 345 }}>
                  <CardContent>
                    <Typography gutterBottom variant="h5">
                      Total Sales Code
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {data?.totalSalesCodes ?? "N/A"}
                    </Typography>
                  </CardContent>
                </Card>
                <Card sx={{ maxWidth: 345 }}>
                  <CardContent>
                    <Typography gutterBottom variant="h5">
                      Total Orders User
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {data?.totalOrders ?? "N/A"}
                    </Typography>
                  </CardContent>
                </Card>
                <Card sx={{ maxWidth: 345 }}>
                  <CardContent>
                    <Typography gutterBottom variant="h5">
                      Total Pending Orders
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {data?.pendingOrders ?? "N/A"}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Stack>
          </Container>
        </Box>
      </Container>
    </Box>
  );
};

export default UserMitraPieChart;
