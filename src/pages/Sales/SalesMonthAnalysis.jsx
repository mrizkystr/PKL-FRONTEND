import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SidebarSales from "../../components/layout/SidebarSales";
import {
  Box,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import { salesApi } from "../../api/api";

const SalesMonthAnalysis = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["monthAnalysis"],
    queryFn: salesApi.dataPsApi.getMonthAnalysis,
  });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const monthAnalysis = data?.month_analysis || [];
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box display="flex">
      <SidebarSales />
      <Box flex="1" p={3}>
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
                  {monthAnalysis
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.Bulan_PS}</TableCell>
                        <TableCell>{row.STO}</TableCell>
                        <TableCell>{row.total}</TableCell>
                      </TableRow>
                    ))}
                  {monthAnalysis.length === 0 && (
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
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={monthAnalysis.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default SalesMonthAnalysis;
