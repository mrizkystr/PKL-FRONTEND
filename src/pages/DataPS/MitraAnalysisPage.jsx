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
} from "@mui/material";
import { dataPsApi } from "../../api/api";

const MitraAnalysisPage = () => {
  const [monthList, setMonthList] = useState([]);
  const [stoList, setStoList] = useState([]);
  const [mitraList, setMitraList] = useState([]);
  const [mitraAnalysis, setMitraAnalysis] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedSTO, setSelectedSTO] = useState("");

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const months = await dataPsApi.getMonthList();
        const sto = await dataPsApi.getStoList();
        const mitra = await dataPsApi.getMitraList();

        setMonthList(months.data);
        setStoList(sto.data);
        setMitraList(mitra.data);
      } catch (error) {
        console.error("Failed to fetch dropdown data:", error);
      }
    };

    const fetchMitraAnalysis = async () => {
      try {
        const analysis = await dataPsApi.getMitraAnalysis();
        setMitraAnalysis(analysis.data.mitra_analysis);
      } catch (error) {
        console.error("Failed to fetch mitra analysis:", error);
      }
    };

    fetchDropdownData();
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
    </Container>
  );
};

export default MitraAnalysisPage;
