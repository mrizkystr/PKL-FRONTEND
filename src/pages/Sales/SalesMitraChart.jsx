import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { salesApi, getSalesDashboardData } from "../../api/api";
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
import SidebarSales from "../../components/layout/SidebarSales";

const SalesMitraChart = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedSto, setSelectedSto] = useState("");

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

  const {
    data: chartData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["mitraBarChart", selectedMonth, selectedSto],
    queryFn: async () => {
      const response = await salesApi.dataPsApi.getMitraBarChart({
        bulan_ps: selectedMonth,
        sto: selectedSto,
      });
      return response;
    },
  });

  const { data: dashboardData } = useQuery({
    queryKey: ["sales-dashboard"],
    queryFn: getSalesDashboardData,
  });

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

  const stoList = useMemo(() => {
    return Array.isArray(chartData?.stoList)
      ? chartData.stoList
      : defaultStoList;
  }, [chartData]);

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

  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#a4de6c"];

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "#002b5b",
        color: "white",
        minHeight: "100vh",
      }}
    >
      <SidebarSales />

      <Box sx={{ flexGrow: 1, p: 4, mr: 10, mt:8, ml:8 }}>
        <Container maxWidth="xl">
          <Typography variant="h4" gutterBottom>
           Sales Mitra Bar Chart
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
                    <BarChart
                      data={transformedData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="name"
                        label={{
                          value: "Mitra",
                          position: "insideBottom",
                          offset: -5,
                        }}
                      />
                      <YAxis
                        label={{
                          value: "Jumlah",
                          angle: -90,
                          position: "insideLeft",
                        }}
                      />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" fill="#82ca9d" />
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

          <Grid container spacing={2} sx={{ mt: 4 }}>
            {[
              {
                label: "Completed Orders",
                value: dashboardData?.completedOrders,
              },
              {
                label: "Total Sales Code",
                value: dashboardData?.totalSalesCodes,
              },
              { label: "Total Orders User", value: dashboardData?.totalOrders },
              {
                label: "Total Pending Orders",
                value: dashboardData?.pendingOrders,
              },
            ].map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {stat.label}
                    </Typography>
                    <Typography variant="h4">{stat.value ?? "N/A"}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default SalesMitraChart;
