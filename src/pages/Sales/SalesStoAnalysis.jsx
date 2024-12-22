import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SidebarSales from "../../components/layout/SidebarSales"; // Import Sidebar
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
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
import { salesApi } from "../../api/api"; // Adjust the import path as necessary

const SalesStoAnalysis = () => {
  const [viewType, setViewType] = useState("table"); // View type: table or chart
  const [selectedSto, setSelectedSto] = useState("all"); // Selected STO filter

  // Fetch STO analysis data
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["stoAnalysis", selectedSto, viewType],
    queryFn: () => salesApi.dataPsApi.getStoAnalysis({ sto: selectedSto, view_type: viewType }),
    keepPreviousData: true,
  });

  // Handle undefined or empty data gracefully
  const stoData = data?.stoAnalysis || [];
  const stoList = data?.stoList || [];

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box textAlign="center" mt={5}>
        <Typography color="error">Error: {error.message}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", backgroundColor: "#002b5b", minHeight: "100vh" }}>
      <SidebarSales /> {/* Sidebar Component */}
      <Box flex={1} p={3} mr={8} mt={6} ml={4}>
        <Typography variant="h4" gutterBottom sx={{ fontSize: "2rem" }} color="white">
          PS Analysis by STO
        </Typography>

        {/* Filters */}
        <Box display="flex" gap={2} mb={3}>
          <FormControl variant="outlined" size="small">
            <InputLabel sx={{ color: "white" }}>Select STO</InputLabel>
            <Select
              value={selectedSto}
              onChange={(e) => setSelectedSto(e.target.value)}
              label="Select STO"
            >
              <MenuItem value="all">All STO</MenuItem>
              {stoList.map((sto) => (
                <MenuItem key={sto.STO} value={sto.STO}>
                  {sto.STO}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl variant="outlined" size="small">
            <InputLabel sx={{ color: "white" }}>View Type</InputLabel>
            <Select
              value={viewType}
              onChange={(e) => setViewType(e.target.value)}
              label="View Type"
            >
              <MenuItem value="table">Table</MenuItem>
              <MenuItem value="chart">Chart</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Table View */}
        {viewType === "table" ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>STO</TableCell>
                  {Object.keys(stoData[0] || {})
                    .filter((key) => key.startsWith("total_"))
                    .map((month) => (
                      <TableCell key={month}>
                        {month.replace("total_", "").toUpperCase()}
                      </TableCell>
                    ))}
                  <TableCell>Grand Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stoData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.STO}</TableCell>
                    {Object.keys(row)
                      .filter((key) => key.startsWith("total_"))
                      .map((month) => (
                        <TableCell key={month}>{row[month]}</TableCell>
                      ))}
                    <TableCell>{row.grand_total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          // Chart View
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={stoData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="STO" />
              <YAxis />
              <Tooltip />
              <Legend />
              {Object.keys(stoData[0] || {})
                .filter((key) => key.startsWith("total_"))
                .map((month, index) => (
                  <Bar
                    key={month}
                    dataKey={month}
                    fill={`rgba(${index * 50}, 99, 132, 0.8)`} // Dynamic colors
                    name={month.replace("total_", "").toUpperCase()}
                  />
                ))}
            </BarChart>
          </ResponsiveContainer>
        )}
      </Box>
    </Box>
  );
};

export default SalesStoAnalysis;
