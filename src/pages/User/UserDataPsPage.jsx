import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  IconButton,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import toast from "react-hot-toast";
import { userApi } from "../../api/api";
import SidebarUser from "../../components/layout/SidebarUser"; // Import SidebarUser

const UserDataPsPage = () => {
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const navigate = useNavigate(); // Untuk navigasi ke halaman detail

  // Query to fetch the data
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user", page, rowsPerPage],
    queryFn: () => userApi.dataPsApi.getList(page, rowsPerPage),
    onError: (err) => toast.error(`Error: ${err.message}`),
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1); // React-query uses 1-based indexing for page
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1); // Reset to first page when rowsPerPage changes
  };

  if (isLoading) return <div>Loading...</div>;

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <SidebarUser /> {/* Panggil SidebarUser */}
      <Box sx={{ flex: 1, p: 3 }}>
        {/* Tambahkan Typography */}
        <Typography variant="h4" gutterBottom>
          Data PS View Only
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Order ID</TableCell>
                <TableCell>Regional</TableCell>
                <TableCell>Witel</TableCell>
                <TableCell>Datel</TableCell>
                <TableCell>STO</TableCell>
                <TableCell>Actions</TableCell> {/* Tambahkan kolom aksi */}
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(data?.data) &&
                data?.data.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.ORDER_ID}</TableCell>
                    <TableCell>{row.REGIONAL}</TableCell>
                    <TableCell>{row.WITEL}</TableCell>
                    <TableCell>{row.DATEL}</TableCell>
                    <TableCell>{row.STO}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => navigate(`/user/detail/${row.id}`)}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 20]}
                  count={data?.pagination?.total || 0}
                  rowsPerPage={rowsPerPage}
                  page={page - 1} // Convert back to 0-based indexing for MUI
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default UserDataPsPage;
