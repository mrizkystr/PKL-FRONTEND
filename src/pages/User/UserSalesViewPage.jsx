import React, { useState, useEffect } from "react";
import SidebarUser from "../../components/layout/SidebarUser"; // Pastikan path sesuai
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
} from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { userApi } from "../../api/api";
import Cookies from "js-cookie";

const UserSalesViewPage = () => {
  const [salesCodes, setSalesCodes] = useState({ data: [], links: {} });
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState("august");
  const navigate = useNavigate();

  const fetchSalesCodes = async (page = 1) => {
    try {
      setLoading(true);
      const response = await userApi.salesCodesApi.getList(page);
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
    <div style={{ display: "flex", backgroundColor: "#001F3F", minHeight: "100vh", padding: "16px" }}>
      {/* Sidebar */}
      <SidebarUser />

      {/* Main Content */}
      <div style={{ flexGrow: 1, padding: "16px", marginRight: "100px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
            color: "#FFFFFF",
          }}
        >
          <h1>Data Sales Codes</h1>
          <div style={{ display: "flex", gap: 16 }}>
            <FormControl style={{ minWidth: 120 }}>
              <InputLabel id="month-select-label">Bulan</InputLabel>
              <Select
                labelId="month-select-label"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                style={{ color: "#FFFFFF", backgroundColor: "#0D47A1" }}
              >
                <MenuItem value="august">Agustus</MenuItem>
                <MenuItem value="september">September</MenuItem>
                <MenuItem value="october">Oktober</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        {!loading ? (
          <TableContainer component={Paper} sx={{ backgroundColor: "#E3F2FD", borderRadius: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Kode</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Mitra Nama</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>STO</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {salesCodes.data.map((code) => (
                  <TableRow key={code.id}>
                    <TableCell>{code.id}</TableCell>
                    <TableCell>{selectedMonth === "august" ? code.kode_agen : code.kode_baru}</TableCell>
                    <TableCell>{code.mitra_nama}</TableCell>
                    <TableCell>{code.sto}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => navigate(`/user/sales-codes/detail/${code.id}`)}>
                        <Visibility />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default UserSalesViewPage;
