import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SidebarUser from "../../components/layout/SidebarUser"; // Import Sidebar
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination, // Import Pagination
  Box,
  Typography, // Import Typography untuk judul
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { userApi } from "../../api/api";

const UserMonthAnalysis = () => {
  const [bulanPs, setBulanPs] = useState(""); // State for selected month
  const { data, isLoading, error } = useQuery({
    queryKey: ["monthAnalysis", bulanPs], // Update query key based on bulanPs
    queryFn: () => userApi.dataPsApi.getMonthAnalysis(bulanPs), // Pass bulanPs to the API
  });

  const [page, setPage] = useState(0); // State for current page
  const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Pastikan data.month_analysis ada sebelum menggunakan map
  const monthAnalysis = data?.month_analysis || [];

  // List of months for the filter dropdown
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Handler untuk perubahan halaman
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handler untuk perubahan jumlah baris per halaman
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset ke halaman pertama saat mengubah rows per page
  };

  return (
    <Box sx={{ display: "flex", backgroundColor: "#002b5b", minHeight: "100vh" }}>
      <SidebarUser /> {/* Sidebar Component */}
      <Box flex={1} p={3} mr={10} mt={10} ml={6}>
        <Typography variant="h4" gutterBottom sx={{ color: "white" }}>
          PS Analysis by Month {/* Menambahkan judul */}
        </Typography>

        {/* Filter for Bulan PS */}
        <FormControl fullWidth>
          <InputLabel style={{ color: "white" }}>Bulan PS</InputLabel>
          <Select
            value={bulanPs}
            onChange={(e) => setBulanPs(e.target.value)}
            sx={{ color: "white", borderColor: "white" }}
          >
            <MenuItem value="">
              <em>All Months</em>
            </MenuItem>
            {months.map((month) => (
              <MenuItem key={month} value={month}>
                {month}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Card sx={{ marginTop: 3 }}>
          <CardContent>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: "black" }}>Month</TableCell>
                    <TableCell sx={{ color: "black" }}>STO</TableCell>
                    <TableCell sx={{ color: "black" }}>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {monthAnalysis.length > 0 ? (
                    monthAnalysis
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Slice data for pagination
                      .map((row, index) => (
                        <TableRow key={index}>
                          <TableCell sx={{ color: "black" }}>{row.Bulan_PS}</TableCell>
                          <TableCell sx={{ color: "black" }}>{row.STO}</TableCell>
                          <TableCell sx={{ color: "black" }}>{row.total}</TableCell>
                        </TableRow>
                      ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} align="center" sx={{ color: "white" }}>
                        No data available
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]} // Options for rows per page
              component="div"
              count={monthAnalysis.length} // Total number of rows
              rowsPerPage={rowsPerPage} // Current rows per page
              page={page} // Current page
              onPageChange={handleChangePage} // Handler for page change
              onRowsPerPageChange={handleChangeRowsPerPage} // Handler for changing rows per page
            />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default UserMonthAnalysis;
