import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import toast from "react-hot-toast";
import { userApi } from "../../api/api";
import SidebarUser from "../../components/layout/SidebarUser"; // Import SidebarUser

const UserDetailPsPage = () => {
  const { id } = useParams(); // Mengambil parameter 'id' dari URL
  const navigate = useNavigate();

  // Query untuk mengambil detail data berdasarkan ID
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user", id],
    queryFn: () => userApi.dataPsApi.getDetail(id),
    onError: (err) => toast.error(`Error: ${err.message}`),
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const details = data?.data || {};

  return (
    <Box sx={{ display: "flex" }}>
      <SidebarUser /> {/* Panggil SidebarUser */}
      <Box sx={{ flex: 1, p: 3 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Detail Data ID: {id}
        </Typography>
        <Paper sx={{ p: 2 }}>
          <Table>
            <TableBody>
              {Object.entries(details).map(([key, value]) => (
                <TableRow key={key}>
                  <TableCell sx={{ fontWeight: "bold" }}>{key}</TableCell>
                  <TableCell>{value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        <Button
          sx={{ mt: 3 }}
          variant="contained"
          onClick={() => navigate("/user")}
        >
          Back to List
        </Button>
      </Box>
    </Box>
  );
};

export default UserDetailPsPage;
