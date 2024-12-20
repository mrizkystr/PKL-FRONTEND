import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
} from "@mui/icons-material";
import toast from "react-hot-toast";
import { salesApi } from "../../api/api";
import SidebarSales from "../../components/layout/SidebarSales"; // Import SidebarSales

const SalesPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [openImportDialog, setOpenImportDialog] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // Query to fetch the data
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["sales", page, rowsPerPage],
    queryFn: () => salesApi.dataPsApi.getList(page, rowsPerPage),
    onError: (err) => toast.error(`Error: ${err.message}`),
  });

  const deleteMutation = useMutation({
    mutationFn: salesApi.dataPsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries(["sales"]);
      toast.success("Data deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const importMutation = useMutation({
    mutationFn: salesApi.dataPsApi.import,
    onSuccess: () => {
      queryClient.invalidateQueries(["sales"]);
      toast.success("Data imported successfully");
      setOpenImportDialog(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleImport = () => {
    if (!selectedFile) {
      toast.error("Please select a file");
      return;
    }
    importMutation.mutate(selectedFile);
  };

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
      {/* Sidebar */}
      <SidebarSales />
      
      {/* Main Content */}
      <Box sx={{ flex: 1, p: 3 }}>
        <Box sx={{ mb: 3, display: "flex", gap: 2 }}>
          <Button variant="contained" onClick={() => setOpenImportDialog(true)}>
            Import Excel
          </Button>
          <Button variant="contained" onClick={() => navigate("/sales/create")}>
            Add New Data
          </Button>
        </Box>

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
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(data?.data) && data?.data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.ORDER_ID}</TableCell>
                  <TableCell>{row.REGIONAL}</TableCell>
                  <TableCell>{row.WITEL}</TableCell>
                  <TableCell>{row.DATEL}</TableCell>
                  <TableCell>{row.STO}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => navigate(`/sales/detail/${row.id}`)}
                    >
                      <ViewIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => navigate(`/sales/update/${row.id}`)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => deleteMutation.mutate(row.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 20]}
                  count={data?.pagination && data?.pagination.total ? data?.pagination.total : 0}
                  rowsPerPage={rowsPerPage}
                  page={page - 1} // Convert back to 0-based indexing for MUI
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>

        <Dialog open={openImportDialog} onClose={() => setOpenImportDialog(false)}>
          <Box sx={{ p: 2 }}>
            <h2>Import Data</h2>
            <input
              type="file"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
            <Button onClick={handleImport} variant="contained">
              Import
            </Button>
          </Box>
        </Dialog>
      </Box>
    </Box>
  );
};

export default SalesPage;
