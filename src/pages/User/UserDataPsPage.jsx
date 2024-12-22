import React from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  TableFooter,
  TablePagination,
  Typography,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
} from "@mui/icons-material";
import toast from "react-hot-toast";
import { userApi } from "../../api/api";
import SidebarUser from "../../components/layout/SidebarUser";

const UserDataPsPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // Fetch data
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
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#001F3F" }}>
      {/* Sidebar */}
      <SidebarUser />

      {/* Main Content */}
      <Box sx={{ flex: 1, p: 3, mr: 10 }}>
        {/* Header */}
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ color: "#FFFFFF", mb: 3 }}
        >
          Data PS View Only
        </Typography>

        <TableContainer component={Paper} sx={{ backgroundColor: "#001F3F" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#B3E5FC" }}>
              <TableCell sx={{ border: "1px solid #B3E5FC", fontWeight: "bold" }}>
                ID
              </TableCell>
              <TableCell sx={{ border: "1px solid #B3E5FC", fontWeight: "bold" }}>
                Order ID
              </TableCell>
              <TableCell sx={{ border: "1px solid #B3E5FC", fontWeight: "bold" }}>
                Regional
              </TableCell>
              <TableCell sx={{ border: "1px solid #B3E5FC", fontWeight: "bold" }}>
                Witel
              </TableCell>
              <TableCell sx={{ border: "1px solid #B3E5FC", fontWeight: "bold" }}>
                Datel
              </TableCell>
              <TableCell sx={{ border: "1px solid #B3E5FC", fontWeight: "bold" }}>
                STO
              </TableCell>
              <TableCell sx={{ border: "1px solid #B3E5FC", fontWeight: "bold" }}>
                Actions
              </TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
              {data?.data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell sx={{ color: "#FFFFFF" }}>{row.id}</TableCell>
                  <TableCell sx={{ color: "#FFFFFF" }}>{row.ORDER_ID}</TableCell>
                  <TableCell sx={{ color: "#FFFFFF" }}>{row.REGIONAL}</TableCell>
                  <TableCell sx={{ color: "#FFFFFF" }}>{row.WITEL}</TableCell>
                  <TableCell sx={{ color: "#FFFFFF" }}>{row.DATEL}</TableCell>
                  <TableCell sx={{ color: "#FFFFFF" }}>{row.STO}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => navigate(`/user/detail/${row.id}`)}
                    >
                      <ViewIcon sx={{ color: "#FFFFFF" }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 20]}
                  count={data?.pagination.total || 0}
                  rowsPerPage={rowsPerPage}
                  page={page - 1} // Convert back to 0-based indexing for MUI
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  sx={{ color: "#FFFFFF" }}
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
