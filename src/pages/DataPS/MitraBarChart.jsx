import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { dataPsApi, getDashboardData } from "../../api/api";
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
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Sidebar from "../../components/layout/Sidebar"; // Import Sidebar

const MitraBarChart = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedSto, setSelectedSto] = useState("");

  // Default list of STO
  const defaultStoList = [
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
    queryKey: ["mitraBarChart", selectedMonth, selectedSto],
    queryFn: async () => {
      const response = await dataPsApi.getMitraBarChart({
        bulan_ps: selectedMonth,
        sto: selectedSto,
      });
      return response;
    },
  });

  const { data } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardData,
  });

  // Transform data for BarChart
  const transformedData = useMemo(() => {
    if (
      !chartData ||
      !Array.isArray(chartData.labels) ||
      !Array.isArray(chartData.totals)
    ) {
      return [];
    }
    return chartData.labels.map((label, index) => ({
      name: label,
      value: chartData.totals[index] || 0,
    }));
  }, [chartData]);

  // Validate STO list
  const stoList = useMemo(() => {
    return Array.isArray(chartData?.stoList)
      ? chartData.stoList
      : defaultStoList;
  }, [chartData]);

  // Handlers
  const handleMonthChange = (event) => setSelectedMonth(event.target.value);
  const handleStoChange = (event) => setSelectedSto(event.target.value);

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
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 4 }}>
        <Container maxWidth="xl">
          <Box sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom>
              Mitra Bar Chart
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
                      <BarChart
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
    </Box>
  );
};

export default MitraBarChart;
