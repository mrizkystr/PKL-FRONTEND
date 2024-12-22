import React, { useState, useEffect } from "react";
import Sidebar from "../../components/layout/Sidebar"; // Pastikan path sesuai
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
  Pagination,
} from "@mui/material";
import { FileUpload, Add, Visibility, Edit, Delete } from "@mui/icons-material";
import { salesCodesApi } from "../../api/api";
import Cookies from "js-cookie";

const SalesCodePage = () => {
  const [salesCodes, setSalesCodes] = useState({ data: [], links: {} });
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState("august");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const fetchSalesCodes = async (page = 1) => {
    try {
      setLoading(true);
      const response = await salesCodesApi.getList(page);
      if (response?.data) {
        setSalesCodes(response);
        setCurrentPage(page);
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

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this sales code?")) {
      try {
        await salesCodesApi.delete(id);
        fetchSalesCodes();
      } catch (error) {
        console.error("Error deleting sales code:", error);
      }
    }
  };

  const handleImport = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        await salesCodesApi.import(file);
        fetchSalesCodes();
      } catch (error) {
        console.error("Error importing file:", error);
      }
    }
  };

  const handlePageChange = (event, value) => {
    fetchSalesCodes(value);
  };

  return (
    <div style={{ display: "flex", backgroundColor: "#001F3F", minHeight: "100vh", padding: "16px" }}>
      {/* Sidebar */}
      <Sidebar />

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
            <input
              type="file"
              id="importExcel"
              style={{ display: "none" }}
              onChange={handleImport}
              accept=".xlsx,.xls"
            />
            <Button
              variant="outlined"
              startIcon={<FileUpload />}
              onClick={() => document.getElementById("importExcel").click()}
              style={{ color: "#FFFFFF", borderColor: "#FFFFFF" }}
            >
              Import Excel
            </Button>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => navigate("/sales-codes/create")}
            >
              Add New Sales
            </Button>
          </div>
        </div>
        {!loading ? (
          <>
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
                        <IconButton onClick={() => navigate(`/sales-codes/${code.id}`)}>
                          <Visibility />
                        </IconButton>
                        <IconButton onClick={() => navigate(`/sales-codes/update/${code.id}`)}>
                          <Edit />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(code.id)}>
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination */}
            <Pagination
              count={salesCodes?.links?.last_page || 100}
              page={currentPage}
              onChange={handlePageChange}
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "16px",
                "& .MuiPaginationItem-root": {
                  color: "#FFFFFF", // Set text color to white
                },
              }}
            />
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default SalesCodePage;
