import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import { userApi } from "../../api/api";

const UserMitraAnalysis = () => {
  const [monthList, setMonthList] = useState([]); // Default to an empty array
  const [stoList, setStoList] = useState([]);
  const [mitraAnalysis, setMitraAnalysis] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedSTO, setSelectedSTO] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        // Fetch months
        const months = await userApi.dataPsApi.getMonthList();
        console.log("Months API response:", months); // Debugging
        setMonthList(Array.isArray(months) ? months : []); // Ensure it's an array

        // Fetch STO list
        const sto = await userApi.dataPsApi.getStoList();
        console.log("STO API response:", sto); // Debugging
        setStoList(Array.isArray(sto) ? sto : []); // Ensure it's an array
      } catch (error) {
        console.error("Failed to fetch dropdown data:", error);
        setError("Failed to load dropdown data.");
      }
    };

    const fetchMitraAnalysis = async () => {
      setLoading(true);
      setError("");
      try {
        const params = { month: selectedMonth, sto: selectedSTO };
        const analysis = await userApi.dataPsApi.getMitraAnalysis(params);
        console.log("Mitra Analysis API response:", analysis); // Debugging
        setMitraAnalysis(analysis?.mitra_analysis || []); // Ensure it's an array
      } catch (error) {
        console.error("Failed to fetch mitra analysis:", error);
        setError("Failed to load mitra analysis.");
        setMitraAnalysis([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDropdownData();
    fetchMitraAnalysis();
  }, [selectedMonth, selectedSTO]);

  const renderTableRows = () =>
    Array.isArray(mitraAnalysis) && mitraAnalysis.length > 0 ? (
      mitraAnalysis.map((row, index) => (
        <TableRow key={index}>
          <TableCell>{row.Mitra}</TableCell>
          <TableCell>{row.total}</TableCell>
        </TableRow>
      ))
    ) : (
      <TableRow>
        <TableCell colSpan={2} align="center">
          No data available
        </TableCell>
      </TableRow>
    );

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Mitra Analysis
      </Typography>
      <Box sx={{ marginBottom: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={6} md={4}>
            <FormControl fullWidth>
              <InputLabel>Month</InputLabel>
              <Select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                {monthList.map((month, index) => (
                  <MenuItem key={index} value={month}>
                    {month}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={4}>
            <FormControl fullWidth>
              <InputLabel>STO</InputLabel>
              <Select
                value={selectedSTO}
                onChange={(e) => setSelectedSTO(e.target.value)}
              >
                {stoList.map((sto, index) => (
                  <MenuItem key={index} value={sto}>
                    {sto}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" align="center">
          {error}
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Mitra</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{renderTableRows()}</TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default UserMitraAnalysis;
