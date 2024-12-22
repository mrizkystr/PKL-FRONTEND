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
  Grid,
  CircularProgress,
} from "@mui/material";
import { dataPsApi } from "../../api/api";
import Sidebar from "../../components/layout/Sidebar";

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["dataPs", id],
    queryFn: () => dataPsApi.getDetail(id),
  });

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          backgroundColor: "#001F3F",
        }}
      >
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  const details = data?.data || {};
  const half = Math.ceil(Object.entries(details).length / 2);
  const firstHalf = Object.entries(details).slice(0, half);
  const secondHalf = Object.entries(details).slice(half);

  return (
    <Box
      sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#001F3F" }}
    >
      {/* Sidebar */}
      <Box
      sx={{
        display: "flex",
        backgroundColor: "#001f3f", // Background biru dongker
        minHeight: "100vh",
        color: "white", // Warna teks menjadi putih untuk kontras
      }}
    >
        <Sidebar />
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, p: 3, mt: 3}}>
        <Typography variant="h5" sx={{ mb: 3, color: "#FFFFFF" }}>
          Detail Data ID: {id}
        </Typography>

        <Paper
          sx={{
            p: 3,
            backgroundColor: "#0D47A1",
            color: "#FFFFFF",
            borderRadius: 2,
          }}
        >
          <Grid container spacing={3}>
            {/* First Half */}
            <Grid item xs={12} sm={6}>
              <Table sx={{ backgroundColor: "#E3F2FD", borderRadius: 2 }}>
                <TableBody>
                  {firstHalf.map(([key, value]) => (
                    <TableRow key={key}>
                      <TableCell sx={{ fontWeight: "bold", color: "#0D47A1" }}>
                        {key}
                      </TableCell>
                      <TableCell sx={{ color: "#000000" }}>{value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>

            {/* Second Half */}
            <Grid item xs={12} sm={6}>
              <Table sx={{ backgroundColor: "#E3F2FD", borderRadius: 2 }}>
                <TableBody>
                  {secondHalf.map(([key, value]) => (
                    <TableRow key={key}>
                      <TableCell sx={{ fontWeight: "bold", color: "#0D47A1" }}>
                        {key}
                      </TableCell>
                      <TableCell sx={{ color: "#000000" }}>{value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </Paper>

        <Button
          sx={{
            mt: 3,
            backgroundColor: "#4FC3F7",
            color: "#FFFFFF",
            "&:hover": { backgroundColor: "#0288D1" },
          }}
          variant="contained"
          onClick={() => navigate("/data-ps")}
        >
          Back to List
        </Button>
      </Box>
    </Box>
  );
};

export default DetailPage;
