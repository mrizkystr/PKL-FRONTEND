import React, { useState } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Pagination,
  CssBaseline,
  GlobalStyles,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Sidebar from "../../components/layout/Sidebar"; // Import Sidebar
import { dataPsApi } from "../../api/api";

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
];

const PSAnalysisByCode = () => {
  const [selectedSto, setSelectedSto] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [page, setPage] = useState(1);
  const perPage = 10;

  const { data, isLoading, error } = useQuery({
    queryKey: ["codeAnalysis", selectedSto, selectedMonth, page],
    queryFn: () =>
      dataPsApi.getCodeAnalysis({
        sto: selectedSto,
        month: selectedMonth,
        page,
        per_page: perPage,
      }),
    initialData: {
      bulan_list: months,
      sto_list: defaultStoList,
      analysis_per_code: [],
      has_more: false,
    },
  });

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">Error: {error.message}</Typography>;
  }

  const handleStoChange = (event) => {
    setSelectedSto(event.target.value);
  };

  const handleMonthChange = (event) => {
    if (event.target.value === null) {
      return;
    }
    setSelectedMonth(event.target.value);
  };

  const handlePaginationChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <CssBaseline />
      <GlobalStyles
        styles={{
          html: { margin: 0, padding: 0, height: "100%" },
          body: {
            margin: 0,
            padding: 0,
            height: "100%",
            backgroundColor: "#1b1f38",
            color: "#fff",
          },
          "#root": { margin: 0, padding: 0, height: "100%" },
        }}
      />
      <Box
        sx={{
          display: "flex",
          p: 4,
          backgroundColor: "#002b5b", // Latar belakang biru dongker
          color: "#fff",
          minHeight: "100vh",
        }}
      >
        <Sidebar />
        <Box sx={{ flex: 1, p: 3, mr: 10 }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ color: "#fff", textAlign: "center", mb: 4 }}
          >
            Data Analysis PS by Kode
          </Typography>

          <Box mb={2} sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Box sx={{ flex: 1 }}>
              <Typography>Pilih Bulan:</Typography>
              <Select
                value={selectedMonth}
                onChange={handleMonthChange}
                fullWidth
                sx={{ backgroundColor: "#fff", color: "#000", borderRadius: 2 }}
              >
                <MenuItem value={null}>Semua Bulan</MenuItem>
                {months.map((bulan, index) => (
                  <MenuItem key={index} value={bulan}>
                    {bulan}
                  </MenuItem>
                ))}
              </Select>
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography>Pilih STO:</Typography>
              <Select
                value={selectedSto}
                onChange={handleStoChange}
                fullWidth
                sx={{ backgroundColor: "#fff", color: "#000", borderRadius: 2 }}
              >
                <MenuItem value={null}>Semua STO</MenuItem>
                {defaultStoList.map((sto, index) => (
                  <MenuItem key={index} value={sto}>
                    {sto}
                  </MenuItem>
                ))}
              </Select>
            </Box>

            <Button
              variant="contained"
              onClick={() => setPage(1)}
              sx={{
                backgroundColor: "#6c63ff",
                color: "#fff",
                borderRadius: 2,
                height: "fit-content",
              }}
            >
              Tampilkan Data
            </Button>
          </Box>

          <TableContainer
            component={Paper}
            sx={{
              mt: 0,
              borderRadius: 2,
              backgroundColor: "#5a8fd1", // Warna tabel yang lebih terang
            }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#003366" }}>
                  <TableCell sx={{ color: "#fff" }}>Kode</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Nama</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.analysis_per_code?.length > 0 ? (
                  data.analysis_per_code.map((item) => (
                    <TableRow
                      key={item.kode}
                      sx={{
                        backgroundColor: "#e8f1fa",
                        "&:hover": { backgroundColor: "#d0e7f8" },
                      }}
                    >
                      <TableCell>{item.kode}</TableCell>
                      <TableCell>{item.nama}</TableCell>
                      <TableCell>{item.total}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      Tidak ada data tersedia
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
            <Pagination
              count={Math.ceil(data?.total_count / perPage)}
              page={page}
              onChange={handlePaginationChange}
              color="primary"
              siblingCount={1}
              boundaryCount={1}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default PSAnalysisByCode;
