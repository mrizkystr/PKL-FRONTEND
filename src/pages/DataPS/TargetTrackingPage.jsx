import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  TextField,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Alert,
} from "@mui/material";
import { Line } from "react-chartjs-2";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { dataPsApi } from "../../api/api";
import "chart.js/auto";

const TargetTrackingPage = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [targetGrowth, setTargetGrowth] = useState(0);
  const [targetRkap, setTargetRkap] = useState(0);
  const [viewType, setViewType] = useState("chart");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["targetTracking", currentMonth, currentYear],
    queryFn: () =>
      dataPsApi.getTargetTrackingAndSalesChart(currentMonth, currentYear),
  });

  const saveTargetMutation = useMutation({
    mutationFn: (formData) => dataPsApi.saveTargetGrowth(formData),
    onSuccess: () => {
      queryClient.invalidateQueries(["targetTracking"]);
      setSnackbarOpen(true);
    },
  });

  const handleSaveTarget = () => {
    saveTargetMutation.mutate({
      month: currentMonth,
      year: currentYear,
      target_growth: Number(targetGrowth),
      target_rkap: Number(targetRkap),
    });
  };

  const handleSnackbarClose = () => setSnackbarOpen(false);

  const monthList = Array.from({ length: 12 }, (_, i) => ({
    value: i + 1,
    label: new Date(0, i).toLocaleString("default", { month: "long" }),
  }));

  const yearList = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);

  const chartData = {
    labels: data?.current_month?.data?.map((item) => item.date) || [],
    datasets: [
      {
        label: `Current Month`,
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.2)",
        data:
          data?.current_month?.data?.map((item) => item.realisasi_mtd) || [],
      },
      {
        label: `Previous Month`,
        borderColor: "red",
        backgroundColor: "rgba(255, 0, 0, 0.2)",
        data:
          data?.previous_month?.data?.map((item) => item.realisasi_mtd) || [],
      },
    ],
  };

  const dailyTargetAverage =
    data?.current_month?.total_ps_harian /
    (data?.current_month?.day_count || 1);

  const achievementTargetGrowth =
    data?.performance_data?.achievement_target_growth || 0;

  const achievementTargetRkap =
    data?.performance_data?.achievement_target_rkap || 0;

  return (
    <Box sx={{ padding: 3, maxWidth: 1200, margin: "0 auto" }}>
      {/* Form Set Target */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Set Target</Typography>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel>Month</InputLabel>
              <Select
                value={currentMonth}
                onChange={(e) => setCurrentMonth(e.target.value)}
                label="Month"
              >
                {monthList.map((month) => (
                  <MenuItem key={month.value} value={month.value}>
                    {month.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel>Year</InputLabel>
              <Select
                value={currentYear}
                onChange={(e) => setCurrentYear(e.target.value)}
                label="Year"
              >
                {yearList.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Target Growth"
              value={targetGrowth}
              onChange={(e) => setTargetGrowth(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Target RKAP"
              value={targetRkap}
              onChange={(e) => setTargetRkap(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveTarget}
            >
              Save Target
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Informasi Utama */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Informasi Utama</Typography>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Typography variant="body1">
              Daily Target Average: {dailyTargetAverage?.toFixed(2)}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body1">
              MTD Realization: {data?.performance_data?.mtd_realization || 0}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body1">
              Achievement Target Growth: {achievementTargetGrowth?.toFixed(2)}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body1">
              Achievement Target RKAP: {achievementTargetRkap?.toFixed(2)}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Toggle View Type */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <FormControl fullWidth>
          <InputLabel>View Type</InputLabel>
          <Select
            value={viewType}
            onChange={(e) => setViewType(e.target.value)}
          >
            <MenuItem value="chart">Chart</MenuItem>
            <MenuItem value="table">Table</MenuItem>
          </Select>
        </FormControl>
      </Paper>

      {/* Chart or Table */}
      {isLoading ? (
        <CircularProgress />
      ) : viewType === "chart" ? (
        <Paper sx={{ p: 2 }}>
          <Line data={chartData} />
        </Paper>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h6">Current Month</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Daily PS</TableCell>
                    <TableCell>Realisasi MTD</TableCell>
                    <TableCell>Gimmick</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.current_month?.data?.map((item) => (
                    <TableRow key={item.date}>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>{item.ps_harian}</TableCell>
                      <TableCell>{item.realisasi_mtd}</TableCell>
                      <TableCell>{item.gimmick}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6">Previous Month</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Daily PS</TableCell>
                    <TableCell>Realisasi MTD</TableCell>
                    <TableCell>Gimmick</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.previous_month?.data?.map((item) => (
                    <TableRow key={item.date}>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>{item.ps_harian}</TableCell>
                      <TableCell>{item.realisasi_mtd}</TableCell>
                      <TableCell>{item.gimmick}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      )}

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          Target berhasil disimpan!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TargetTrackingPage;
