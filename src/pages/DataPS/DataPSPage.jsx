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
import { dataPsApi } from "../../api/api";
import Sidebar from "../../components/layout/Sidebar";

const DataPSPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [openImportDialog, setOpenImportDialog] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // Fetch data
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["dataPs", page, rowsPerPage],
    queryFn: () => dataPsApi.getList(page, rowsPerPage),
    onError: (err) => toast.error(`Error: ${err.message}`),
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: dataPsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries(["dataPs"]);
      toast.success("Data deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Import mutation
  const importMutation = useMutation({
    mutationFn: dataPsApi.import,
    onSuccess: () => {
      queryClient.invalidateQueries(["dataPs"]);
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
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#001F3F" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Box sx={{ flex: 1, p: 3 }}>
        {/* Header */}
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ color: "#FFFFFF", mb: 3 }}
        >
          Data PS
        </Typography>

        <Box sx={{ mb: 3, display: "flex", gap: 2, justifyContent: "center" }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#007BFF", ":hover": { backgroundColor: "#0056b3" } }}
            onClick={() => setOpenImportDialog(true)}
          >
            Import Excel
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#28A745", ":hover": { backgroundColor: "#1e7e34" } }}
            onClick={() => navigate("/data-ps/create")}
          >
            Add New Data
          </Button>
        </Box>

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
                      onClick={() => navigate(`/data-ps/detail/${row.id}`)}
                    >
                      <ViewIcon sx={{ color: "#FFFFFF" }} />
                    </IconButton>
                    <IconButton
                      onClick={() => navigate(`/data-ps/update/${row.id}`)}
                    >
                      <EditIcon sx={{ color: "#FFFFFF" }} />
                    </IconButton>
                    <IconButton onClick={() => deleteMutation.mutate(row.id)}>
                      <DeleteIcon sx={{ color: "#FFFFFF" }} />
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

        {/* Import Dialog */}
        <Dialog
          open={openImportDialog}
          onClose={() => setOpenImportDialog(false)}
        >
          <Box sx={{ p: 3 }}>
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
            <Button
              sx={{ mt: 2, backgroundColor: "#007BFF", ":hover": { backgroundColor: "#0056b3" } }}
              onClick={handleImport}
              disabled={!selectedFile}
            >
              Upload
            </Button>
          </Box>
        </Dialog>
      </Box>
    </Box>
  );
};

export default DataPSPage;