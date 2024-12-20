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
import { salesApi } from "../../api/api";
import SidebarSales from "../../components/layout/SidebarSales"; // Import SidebarSales

const SalesDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["sales", id],
    queryFn: () => salesApi.dataPsApi.getDetail(id),
  });

  if (isLoading) return <div>Loading...</div>;

  const details = data?.data || {};

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <SidebarSales />

      {/* Main Content */}
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
          onClick={() => navigate("/sales")}
        >
          Back to List
        </Button>
      </Box>
    </Box>
  );
};

export default SalesDetailPage;
