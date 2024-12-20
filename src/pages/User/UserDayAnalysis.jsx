import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Collapse,
} from "@mui/material";
import { userApi } from "../../api/api";
import SidebarUser from "../../components/layout/SidebarUser";

const UserDayAnalysis = () => {
  const [dayAnalysis, setDayAnalysis] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
  });
  const [openRowIndex, setOpenRowIndex] = useState(null);

  useEffect(() => {
    fetchDayAnalysis(1); // Fetch page 1 on load
  }, []);

  const fetchDayAnalysis = async (page) => {
    try {
      const response = await userApi.dataPsApi.getDayAnalysis(page);
      const { data, pagination } = response;

      setDayAnalysis(data);
      setPagination(pagination);
    } catch (error) {
      console.error("Error fetching day analysis:", error);
    }
  };

  const toggleRowDetails = (index) => {
    setOpenRowIndex(openRowIndex === index ? null : index);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pagination.last_page) {
      fetchDayAnalysis(newPage);
    }
  };

  return (
    <Box display="flex">
      {/* Sidebar */}
      <SidebarUser />

      {/* Main Content */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Data Analysis PS per Hari
            </Typography>
          </Toolbar>
        </AppBar>
        <Box sx={{ padding: 2 }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Tanggal PS</TableCell>
                  <TableCell>Detail</TableCell>
                  <TableCell>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dayAnalysis && dayAnalysis.length > 0 ? (
                  dayAnalysis.map((item, index) => (
                    <React.Fragment key={index}>
                      <TableRow>
                        <TableCell>{item.TGL_PS}</TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() => toggleRowDetails(index)}
                          >
                            {openRowIndex === index
                              ? "Hide Details"
                              : "Show Details"}
                          </Button>
                        </TableCell>
                        <TableCell>{item.total}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={3} sx={{ padding: 0 }}>
                          <Collapse
                            in={openRowIndex === index}
                            timeout="auto"
                            unmountOnExit
                          >
                            <Box sx={{ margin: 2 }}>
                              <Typography variant="subtitle1">
                                Detail Data
                              </Typography>
                              <Table size="small">
                                <TableHead>
                                  <TableRow>
                                    <TableCell>Order ID</TableCell>
                                    <TableCell>STO</TableCell>
                                    <TableCell>Customer Name</TableCell>
                                    <TableCell>Addon</TableCell>
                                    <TableCell>Kode Sales</TableCell>
                                    <TableCell>Nama SA</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {item.details.map((detail, detailIndex) => (
                                    <TableRow key={detailIndex}>
                                      <TableCell>{detail.ORDER_ID}</TableCell>
                                      <TableCell>{detail.STO}</TableCell>
                                      <TableCell>
                                        {detail.CUSTOMER_NAME}
                                      </TableCell>
                                      <TableCell>{detail.ADDON}</TableCell>
                                      <TableCell>{detail.KODE_SALES}</TableCell>
                                      <TableCell>{detail.NAMA_SA}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </Box>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
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
          <Box display="flex" justifyContent="center" marginTop={2}>
            <Button
              variant="contained"
              onClick={() => handlePageChange(pagination.current_page - 1)}
              disabled={pagination.current_page === 1}
            >
              Previous
            </Button>
            <Typography variant="body1" sx={{ margin: "0 15px" }}>
              Page {pagination.current_page} of {pagination.last_page}
            </Typography>
            <Button
              variant="contained"
              onClick={() => handlePageChange(pagination.current_page + 1)}
              disabled={pagination.current_page === pagination.last_page}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UserDayAnalysis;
