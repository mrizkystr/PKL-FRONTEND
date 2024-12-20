import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  Typography,
} from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { salesCodesApi } from "../../api/api"; // Pastikan API ini valid
import SidebarUser from "../../components/layout/SidebarUser"; // Import SidebarUser
import Cookies from "js-cookie";

const UserSalesViewPage = () => {
  const [salesCodes, setSalesCodes] = useState({ data: [], links: {} });
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState("august"); // Default bulan
  const navigate = useNavigate();

  const fetchSalesCodes = async (page = 1) => {
    try {
      setLoading(true);
      const response = await salesCodesApi.getList(page);
      if (response?.data) {
        setSalesCodes(response);
      } else {
        setSalesCodes({ data: [] });
      }
    } catch (error) {
      console.error("Error fetching sales codes:", error);
      if (error.response && error.response.status === 401) {
        Cookies.remove("token");
        navigate("/login");
      }
      alert("Terjadi kesalahan saat memuat data Sales Codes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSalesCodes();
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <SidebarUser /> {/* Panggil SidebarUser */}
      <Box sx={{ flex: 1, p: 3 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Data Sales Codes
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="month-select-label">Bulan</InputLabel>
            <Select
              labelId="month-select-label"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <MenuItem value="august">Agustus</MenuItem>
              <MenuItem value="september">September</MenuItem>
              <MenuItem value="october">Oktober</MenuItem>
              {/* Tambahkan opsi bulan lainnya jika diperlukan */}
            </Select>
          </FormControl>
        </Box>
        {!loading ? (
          salesCodes.data.length > 0 ? (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Kode</TableCell>
                    <TableCell>Mitra Nama</TableCell>
                    <TableCell>STO</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {salesCodes.data.map((code) => (
                    <TableRow key={code.id}>
                      <TableCell>{code.id}</TableCell>
                      <TableCell>
                        {selectedMonth === "august"
                          ? code.kode_agen || "N/A"
                          : code.kode_baru || "N/A"}
                      </TableCell>
                      <TableCell>{code.mitra_nama || "N/A"}</TableCell>
                      <TableCell>{code.sto || "N/A"}</TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => navigate(`/user/sales-codes/detail/${code.id}`)}
                        >
                          <Visibility />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography>No sales codes found.</Typography>
          )
        ) : (
          <Typography>Loading...</Typography>
        )}
      </Box>
    </Box>
  );
};

export default UserSalesViewPage;
