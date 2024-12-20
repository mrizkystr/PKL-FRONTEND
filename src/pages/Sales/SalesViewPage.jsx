import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { salesApi } from "../../api/api"; // Sesuaikan path jika berbeda
import { useNavigate } from "react-router-dom";
import SidebarSales from "../../components/layout/SidebarSales"; // Import SidebarSales

const SalesViewPage = () => {
  const [salesCodes, setSalesCodes] = useState({ data: [], links: {} });
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState("august"); // Default bulan
  const navigate = useNavigate();

  const fetchSalesCodes = async (page = 1) => {
    try {
      setLoading(true);
      const response = await salesApi.salesCodesApi.getList(page);
      if (response?.data) {
        setSalesCodes(response);
      } else {
        setSalesCodes({ data: [] });
      }
    } catch (error) {
      console.error("Error fetching sales codes:", error);
      if (error.response?.status === 401) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSalesCodes();
  }, [selectedMonth]); // Fetch data again when selectedMonth changes

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <SidebarSales />

      {/* Main Content */}
      <div style={{ flex: 1, padding: 16 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
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
              >
                <MenuItem value="august">Agustus</MenuItem>
                <MenuItem value="september">September</MenuItem>
                <MenuItem value="october">Oktober</MenuItem>
                {/* Tambahkan opsi bulan lainnya jika diperlukan */}
              </Select>
            </FormControl>
          </div>
        </div>
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
                        <Button
                          variant="outlined"
                          onClick={() =>
                            navigate(`/sales/sales-codes/detail/${code.id}`)
                          }
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <p>No sales codes found.</p>
          )
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default SalesViewPage;
