import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { dataPsApi } from "../../api/api";
import { getDashboardData } from "../../api/api";
import Sidebar from "../../components/layout/Sidebar"; // Import Sidebar
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

const MitraPieChart = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedSto, setSelectedSto] = useState("");

  const stoList = [
    "SPL", "BOO", "DMG", "LWL", "CSE", "PAR", 
    "CGD", "PAG", "JSA", "ABC", "BCD", "LBI", "CPS"
  ];

  const {
    data: chartData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["mitraPieChart", selectedMonth, selectedSto],
    queryFn: async () => {
      try {
        const response = await dataPsApi.getMitraPieChart({
          bulan_ps: selectedMonth,
          sto: selectedSto,
        });
        return response;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  });

  const { data } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardData,
  });

  const transformedData = React.useMemo(() => {
    if (!chartData?.labels || !chartData?.totals) return [];
    return chartData.labels.map((label, index) => ({
      name: label,
      value: chartData.totals[index],
    }));
  }, [chartData]);

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#FF4560",
    "#00A5CF",
  ];

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
    <Box display="flex" minHeight="100vh">
      <Sidebar /> {/* Sidebar Component */}
      <Box flex={1} p={3}>
        <Container maxWidth="xl">
          <Box sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom>
              Mitra Pie Chart
            </Typography>

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
        </Container>
      </Box>
    </Box>
  );
};

export default MitraPieChart;
