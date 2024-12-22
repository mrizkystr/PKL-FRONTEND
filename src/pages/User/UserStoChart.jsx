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
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { dataPsApi } from "../../api/api";
import toast from "react-hot-toast";
import { getUserDashboardData } from "../../api/api";
import SidebarUser from "../../components/layout/SidebarUser";

const UserStoChart = () => {
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
    queryKey: ["user-dashboard"],
    queryFn: getUserDashboardData,
  });

  const transformedData = React.useMemo(() => {
    if (!chartData?.data) return [];
    return chartData.data.labels.map((label, index) => ({
      name: label,
      value: chartData.data.data[index],
      fill: `hsl(${index * 50}, 70%, 50%)`,
    }));
  }, [chartData]);

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "#001f3f",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <SidebarUser />

      <Box sx={{ flexGrow: 1, p: 4, mr: 10, mt:8, ml:8 }}>
        <Typography variant="h4" gutterBottom>
          User STO Bar Chart Analysis
        </Typography>

        <Card sx={{ mb: 4, p: 3, backgroundColor: "#002b5b", color: "white" }}>
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
                  <XAxis dataKey="name" stroke="white" />
                  <YAxis stroke="white" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#82ca9d" barSize={30} />
                </BarChart>
              )}
            </Box>
          </CardContent>
        </Card>

        <Container>
          <Stack spacing={3}>
            <Grid container gap={3} justifyContent={{ xs: "center" }}>
              {[
                { label: "Completed Orders", value: data?.completedOrders },
                { label: "Total Sales Code", value: data?.totalSalesCodes },
                { label: "Total Orders User", value: data?.totalOrders },
                { label: "Total Pending Orders", value: data?.pendingOrders },
              ].map((stat, index) => (
                <Card
                  key={index}
                  sx={{ maxWidth: 345, backgroundColor: "#004080", color: "white" }}
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

export default UserStoChart;
