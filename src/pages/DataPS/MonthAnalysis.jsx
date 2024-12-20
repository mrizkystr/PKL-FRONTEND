import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Sidebar from "../../components/layout/Sidebar"; // Import Sidebar
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
} from "@mui/material";
import { dataPsApi } from "../../api/api";

const MonthlyAnalysis = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["monthAnalysis"],
    queryFn: dataPsApi.getMonthAnalysis,
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
    <Box display="flex" minHeight="100vh">
      <Sidebar /> {/* Sidebar Component */}
      <Box flex={1} p={3}>
        <Typography variant="h4" gutterBottom>
          PS Analysis by Month {/* Menambahkan judul */}
        </Typography>
        <Card>
          <CardContent>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Month</TableCell>
                    <TableCell>STO</TableCell>
                    <TableCell>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {monthAnalysis.length > 0 ? (
                    monthAnalysis
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Slice data for pagination
                      .map((row, index) => (
                        <TableRow key={index}>
                          <TableCell>{row.Bulan_PS}</TableCell>
                          <TableCell>{row.STO}</TableCell>
                          <TableCell>{row.total}</TableCell>
                        </TableRow>
                      ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} align="center">
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

export default MonthlyAnalysis;
