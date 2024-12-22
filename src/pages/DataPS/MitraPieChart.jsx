import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { dataPsApi } from "../../api/api";
import { getDashboardData } from "../../api/api";
import Sidebar from "../../components/layout/Sidebar";
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
    <Box display="flex" minHeight="100vh" sx={{ backgroundColor: "#001f3f" }}>
      <Sidebar />
      <Box flex={1} p={3} sx={{ color: "#fff" }}>
        <Container maxWidth="xl">
          <Box sx={{ mt: 8, mb: 4, mr: 10 }}>
            <Typography variant="h4" gutterBottom>
              Mitra Pie Chart
            </Typography>

            <Grid container spacing={2} sx={{ mb: 4 }}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel sx={{ color: "#fff" }}>Pilih Bulan</InputLabel>
                  <Select
                    value={selectedMonth}
                    onChange={handleMonthChange}
                    sx={{ backgroundColor: "#fff" }}
                  >
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
                  <InputLabel sx={{ color: "#fff" }}>Pilih STO</InputLabel>
                  <Select
                    value={selectedSto}
                    onChange={handleStoChange}
                    sx={{ backgroundColor: "#fff" }}
                  >
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
              <Card sx={{ backgroundColor: "#fff", mb: 4, p: 2 }}>
                <CardContent>
                  <Box sx={{ width: "100%", height: 420 }}>
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie
                          data={transformedData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={180}  // Increased radius to add space
                          fill="#8884d8"
                          label={false}  // Disable value lines
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

            <Box sx={{ mt: 4 }}>
              <Grid container spacing={3}>
                {[ 
                  { title: "Completed Orders", value: data?.completedOrders },
                  { title: "Total Sales Code", value: data?.totalSalesCodes },
                  { title: "Total Orders User", value: data?.totalOrders },
                  { title: "Total Pending Orders", value: data?.pendingOrders },
                ].map(({ title, value }, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Card sx={{ backgroundColor: "#003366" }}>
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h5"
                          sx={{ color: "#fff" }}
                        >
                          {title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#fff" }}>
                          {value}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default MitraPieChart;
