import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Grid,
  Container,
  Stack,
} from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { dataPsApi } from "../../api/api";
import toast from "react-hot-toast";
import { getDashboardData } from "../../api/api";
import Sidebar from "../../components/layout/Sidebar";

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

const StoPieChart = () => {
  const [bulanPs, setBulanPs] = useState("");
  const [idMitra, setIdMitra] = useState("");

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

  const idMitras = [
    "AJP",
    "WO non SA Pribar",
    "AR",
    "FAS",
    "BLM",
    "KES",
    "TGC",
    "BUN",
    "ENO",
    "PKS",
    "MCP",
  ];

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
    <Box sx={{ display: "flex", backgroundColor: "#002b5b", minHeight: "100vh" }}>
      <Sidebar />

      <Box sx={{ flexGrow: 1, p: 4, mr: 6, mt: 8 }}>
        <Typography variant="h4" gutterBottom sx={{ color: "#ffffff" }}>
          STO Pie Chart Analysis
        </Typography>

        <Card sx={{ mb: 4, p: 3, backgroundColor: "#2a2d5f", color: "#ffffff" }}>
          <CardContent>
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel style={{ color: "white" }}>Bulan PS</InputLabel>
                  <Select
                    value={bulanPs}
                    onChange={(e) => setBulanPs(e.target.value)}
                    sx={{ color: "white", borderColor: "white" }}
                  >
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
                  <InputLabel style={{ color: "white" }}>ID Mitra</InputLabel>
                  <Select
                    value={idMitra}
                    onChange={(e) => setIdMitra(e.target.value)}
                    sx={{ color: "white", borderColor: "white" }}
                  >
                    {idMitras.map((mitra) => (
                      <MenuItem key={mitra} value={mitra}>
                        {mitra}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: 450,
                mb: 5, // Added margin bottom to separate chart and value cards
              }}
            >
              {isLoading ? (
                <Typography sx={{ color: "#ffffff" }}>Loading...</Typography>
              ) : (
                <PieChart width={800} height={440}>
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
              {[{
                label: "Completed Orders", value: data?.completedOrders
              },
              { label: "Total Sales Code", value: data?.totalSalesCodes },
              { label: "Total Orders User", value: data?.totalOrders },
              { label: "Total Pending Orders", value: data?.pendingOrders },
              ].map((stat, index) => (
                <Card
                  key={index}
                  sx={{
                    maxWidth: 345,
                    backgroundColor: "#2a2d5f",
                    color: "#ffffff",
                    boxShadow: 2, // Optional: Add box shadow for extra separation
                  }}
                >
                  <CardContent>
                    <Typography gutterBottom variant="h5">
                      {stat.label}
                    </Typography>
                    <Typography variant="body2">{stat.value}</Typography>
                  </CardContent>
                </Card>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default StoPieChart;
