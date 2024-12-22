import React, { useEffect, useState, useMemo } from "react";
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
} from "@mui/material";
import { dataPsApi } from "../../api/api";

const UserMitraAnalysis = () => {
  const [chartData, setChartData] = useState(null); // assuming you get some chartData from an API or similar
  const [mitraAnalysis, setMitraAnalysis] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedSto, setSelectedSto] = useState("");

  // Month options
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Assuming you fetch chartData from an API or useMemo
  const stoList = useMemo(() => {
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
    ]; // example default sto list
    return Array.isArray(chartData?.stoList)
      ? chartData.stoList
      : defaultStoList;
  }, [chartData]);

  const handleMonthChange = (event) => setSelectedMonth(event.target.value);
  const handleStoChange = (event) => setSelectedSto(event.target.value);

  useEffect(() => {
    const fetchMitraAnalysis = async () => {
      try {
        const analysis = await dataPsApi.getMitraAnalysis();
        setMitraAnalysis(analysis.data.mitra_analysis);
      } catch (error) {
        console.error("Failed to fetch mitra analysis:", error);
      }
    };

    fetchMitraAnalysis();
  }, []);

  const renderTableRows = () =>
    mitraAnalysis.map((row, index) => (
      <TableRow key={index}>
        <TableCell>{row.Mitra}</TableCell>
        <TableCell>{row.total}</TableCell>
      </TableRow>
    ));

  return (
    <Box
      sx={{ display: "flex", backgroundColor: "#002b5b", minHeight: "100vh" }}
    >
      <Container>
        <Box sx={{ flexGrow: 1, p: 4, mr: 10, mt: 8 }}>
          <Typography variant="h4" gutterBottom color="white">
            Data Analysis By Mitra
          </Typography>
          <Box sx={{ marginBottom: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel sx={{ color: "white" }}>Month</InputLabel>
                  <Select
                    value={selectedMonth}
                    onChange={handleMonthChange}
                    sx={{ color: "white", borderColor: "white" }}
                  >
                    {months.map((month, index) => (
                      <MenuItem
                        key={index}
                        value={month}
                        sx={{ color: "black" }}
                      >
                        {month}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel sx={{ color: "white" }}>Pilih STO</InputLabel>
                  <Select
                    value={selectedSto}
                    onChange={handleStoChange}
                    sx={{ color: "white", borderColor: "white" }}
                  >
                    <MenuItem value="">Semua STO</MenuItem>
                    {stoList.map((sto, index) => (
                      <MenuItem key={index} value={sto} sx={{ color: "black" }}>
                        {sto}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <TableContainer component={Paper} sx={{ maxWidth: "100%" }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Mitra</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{renderTableRows()}</TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
};

export default UserMitraAnalysis;
