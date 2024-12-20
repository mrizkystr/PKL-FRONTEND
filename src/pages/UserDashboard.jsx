import { styled } from "@mui/material/styles";
import {
  Box,
  CssBaseline,
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  CardContent,
  Grid,
  Stack,
} from "@mui/material";
import SidebarUser from "../components/layout/SidebarUser";
import { useQuery } from "@tanstack/react-query";
import { getUserDashboardData } from "../api/api";

const drawerWidth = 240;

const UserDashboard = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["user-dashboard"],
    queryFn: getUserDashboardData,
  });

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h6" color="error">
          Failed to load dashboard data.
        </Typography>
      </Box>
    );
  }

  const recentSalesOrders = data?.recentSalesCodes || [];
  const recentOrders = data?.recentOrders || [];
  const { totalSalesCodes, completedOrders, totalOrders, pendingOrders } = data;

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "#001f3f",
        minHeight: "100vh",
        color: "#fff",
      }}
    >
      <CssBaseline />
      <SidebarUser />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          py: 5,
        }}
      >
        <Container>
          <Stack spacing={4} alignItems="center">
            {/* Summary Tables */}
            <Grid container spacing={3} justifyContent="center">
              {[
                {
                  title: "Total Sales Code",
                  value: totalSalesCodes,
                  bgColor: "#ffffff", // White
                  textColor: "#000000",
                },
                {
                  title: "Total Orders",
                  value: totalOrders,
                  bgColor: "#ffffff", // White
                  textColor: "#000000",
                },
                {
                  title: "Completed Orders",
                  value: completedOrders,
                  bgColor: "#007bff", // Light blue
                  textColor: "#ffffff",
                },
                {
                  title: "Pending Orders",
                  value: pendingOrders,
                  bgColor: "#007bff", // Light blue
                  textColor: "#ffffff",
                },
              ].map((item, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card
                    sx={{
                      textAlign: "center",
                      boxShadow: 3,
                      backgroundColor: item.bgColor,
                      color: item.textColor,
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" sx={{ mb: 1 }}>
                        {item.title}
                      </Typography>
                      <Typography variant="h4">{item.value}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Recent Tables */}
            <Grid container spacing={3} justifyContent="center">
              <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={{ textAlign: "center", mb: 2 }}>
                  Recent Sales Orders
                </Typography>
                <TableContainer
                  component={Paper}
                  sx={{
                    boxShadow: 3,
                    backgroundColor: "#ffffff", // White background
                  }}
                >
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Code</TableCell>
                        <TableCell>Mitra Name</TableCell>
                        <TableCell>Date</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {recentSalesOrders.map((order, index) => (
                        <TableRow key={index}>
                          <TableCell>{order.kode}</TableCell>
                          <TableCell>{order.mitra_nama}</TableCell>
                          <TableCell>
                            {new Date(order.created_at).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={{ textAlign: "center", mb: 2 }}>
                  Recent Orders
                </Typography>
                <TableContainer
                  component={Paper}
                  sx={{
                    boxShadow: 3,
                    backgroundColor: "#e0f7fa", // Light blue background
                  }}
                >
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Order ID</TableCell>
                        <TableCell>Customer</TableCell>
                        <TableCell>Date</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {recentOrders.map((order, index) => (
                        <TableRow key={index}>
                          <TableCell>{order.ORDER_ID}</TableCell>
                          <TableCell>{order.CUSTOMER_NAME}</TableCell>
                          <TableCell>
                            {new Date(order.ORDER_DATE).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default UserDashboard;
