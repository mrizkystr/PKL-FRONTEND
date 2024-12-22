import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  Drawer as MuiDrawer,
  CssBaseline,
  List,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Avatar,
  Collapse,
} from "@mui/material";
import {
  Analytics,
  ChevronLeft,
  ChevronRight,
  Dashboard,
  ListAlt,
  Code,
  Logout,
  BarChart,
  PieChart,
  ExpandLess,
  ExpandMore,
  Person,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  width: `calc(${theme.spacing(7)} + 1px)`,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  minHeight: "48px",
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const SidebarUser = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openStoChart, setOpenStoChart] = React.useState(false);
  const [openMitraChart, setOpenMitraChart] = React.useState(false);
  const [openPsAnalysis, setOpenPsAnalysis] = React.useState(false);
  const navigate = useNavigate();

  const toggleDrawer = () => setOpen(!open);

  const handleStoChartClick = () => setOpenStoChart((prev) => !prev);
  const handleMitraChartClick = () => setOpenMitraChart((prev) => !prev);
  const handlePSAnalysisClick = () => setOpenPsAnalysis((prev) => !prev);

  const handleLogout = () => {
    if (window.confirm("Apakah Anda yakin ingin logout?")) {
      toast.success("Logout berhasil!");
      navigate("/");
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={toggleDrawer}>
            {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem button onClick={() => navigate("/user/dashboard")}>
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button onClick={() => navigate("/user")}>
            <ListItemIcon>
              <ListAlt />
            </ListItemIcon>
            <ListItemText primary="Data PS" />
          </ListItem>
          <ListItem button onClick={() => navigate("/user/sales-codes")}>
            <ListItemIcon>
              <Code />
            </ListItemIcon>
            <ListItemText primary="Sales Code" />
          </ListItem>
          
          {/* STO Chart */}
          <ListItem button onClick={handleStoChartClick}>
            <ListItemIcon>
              <BarChart />
            </ListItemIcon>
            <ListItemText primary="STO Chart" />
            {openStoChart ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openStoChart} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                sx={{ pl: 4 }}
                onClick={() => navigate("/user/sto-chart")}
              >
                <ListItemIcon>
                  <BarChart />
                </ListItemIcon>
                <ListItemText primary="Bar Chart" />
              </ListItem>
              <ListItem
                button
                sx={{ pl: 4 }}
                onClick={() => navigate("/user/sto-pie-chart")}
              >
                <ListItemIcon>
                  <PieChart />
                </ListItemIcon>
                <ListItemText primary="Pie Chart" />
              </ListItem>
            </List>
          </Collapse>

          {/* Mitra Chart */}
          <ListItem button onClick={handleMitraChartClick}>
            <ListItemIcon>
              <BarChart />
            </ListItemIcon>
            <ListItemText primary="Mitra Chart" />
            {openMitraChart ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openMitraChart} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                sx={{ pl: 4 }}
                onClick={() => navigate("/user/mitra-bar-chart")}
              >
                <ListItemIcon>
                  <BarChart />
                </ListItemIcon>
                <ListItemText primary="Bar Chart" />
              </ListItem>
              <ListItem
                button
                sx={{ pl: 4 }}
                onClick={() => navigate("/user/mitra-pie-chart")}
              >
                <ListItemIcon>
                  <PieChart />
                </ListItemIcon>
                <ListItemText primary="Pie Chart" />
              </ListItem>
            </List>
          </Collapse>

          {/* PS Analysis */}
          <ListItem button onClick={handlePSAnalysisClick}>
            <ListItemIcon>
              <Analytics />
            </ListItemIcon>
            <ListItemText primary="PS Analysis" />
            {openPsAnalysis ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openPsAnalysis} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                sx={{ pl: 4 }}
                onClick={() => navigate("/user/ps-analysis/sto")}
              >
                <ListItemIcon>
                  <BarChart />
                </ListItemIcon>
                <ListItemText primary="By STO" />
              </ListItem>
              <ListItem
                button
                sx={{ pl: 4 }}
                onClick={() => navigate("/user/ps-analysis/month")}
              >
                <ListItemIcon>
                  <BarChart />
                </ListItemIcon>
                <ListItemText primary="Monthly Analysis" />
              </ListItem>
              <ListItem
                button
                sx={{ pl: 4 }}
                onClick={() => navigate("/user/ps-analysis/code")}
              >
                <ListItemIcon>
                  <BarChart />
                </ListItemIcon>
                <ListItemText primary="By Code" />
              </ListItem>
              <ListItem
                button
                sx={{ pl: 4 }}
                onClick={() => navigate("/user/ps-analysis/mitra")}
              >
                <ListItemIcon>
                  <BarChart />
                </ListItemIcon>
                <ListItemText primary="By Mitra" />
              </ListItem>
              <ListItem
                button
                sx={{ pl: 4 }}
                onClick={() => navigate("/user/data-ps/day-analysis")}
              >
                <ListItemIcon>
                  <BarChart />
                </ListItemIcon>
                <ListItemText primary="Data PS per Hari" />
              </ListItem>
            </List>
          </Collapse>

          {/* Target Tracking */}
          <ListItem button onClick={() => navigate("/user/data-ps/target/tracking")}>
            <ListItemIcon>
              <Analytics />
            </ListItemIcon>
            <ListItemText primary="Target Tracking" />
          </ListItem>
        </List>
        <Divider />
        <Box sx={{ mt: "auto", p: 2, textAlign: "center" }}>
          <Avatar alt="User Avatar" sx={{ mb: 1 }} />
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0,
          marginLeft: open ? `${drawerWidth}px` : `calc(${theme.spacing(7)} + 1px)`,
          transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        {/* Main Content Goes Here */}
      </Box>
    </Box>
  );
};

export default SidebarUser;