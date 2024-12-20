import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";
import LandingPage from "../pages/LandingPage";
import Dashboard from "../pages/Dashboard";
import SalesDashboard from "../pages/SalesDashboard";
import UserDashboard from "../pages/UserDashboard";
import Header from "../components/Header";
import DataPSPage from "../pages/DataPS/DataPSPage";
import CreateForm from "../pages/DataPS/CreateForm";
import UpdateForm from "../pages/DataPS/UpdateForm";
import Sidebar from "../components/layout/Sidebar";
import SidebarSales from "../components/layout/SidebarSales";
import SidebarUser from "../components/layout/SidebarUser";
import DetailPage from "../pages/DataPS/DetailDataPage";
import SalesCodePage from "../pages/SalesCode/SalesCodePage";
import SalesCodeDetail from "../pages/SalesCode/SalesCodeDetail";
import SalesCodeCreateForm from "../pages/SalesCode/SalesCodeCreateForm";
import SalesCodeUpdateForm from "../pages/SalesCode/SalesCodeUpdateForm";
import StoAnalysisPage from "../pages/DataPS/StoAnalysisPage";
import PSAnalysisByCode from "../pages/DataPS/PSAnalysisByCode";
import MonthAnalysis from "../pages/DataPS/MonthAnalysis";
import MitraAnalysisPage from "../pages/DataPS/MitraAnalysisPage";
import DayAnalysis from "../pages/DataPS/DayAnalysis";
import StoChartPage from "../pages/DataPS/StoChartPage";
import StoPieChartPage from "../pages/DataPS/StoPieChart";
import MitraBarChart from "../pages/DataPS/MitraBarChart";
import MitraPieChart from "../pages/DataPS/MitraPieChart";
import TargetTrackingPage from "../pages/DataPS/TargetTrackingPage";
import UserRegisterAdmin from "../pages/UserRegisterAdmin/UserRegisterAdmin";
import ImportUserAdmin from "../pages/UserRegisterAdmin/ImportUserAdmin";
import CreateUserAdmin from "../pages/UserRegisterAdmin/CreateUserAdmin";
import UpdateUserAdmin from "../pages/UserRegisterAdmin/UpdateUserAdmin";
import SalesPage from "../pages/Sales/SalesPage";
import SalesCreateForm from "../pages/Sales/SalesCreateForm";
import SalesDetailPage from "../pages/Sales/SalesDetailPage";
import SalesUpdateForm from "../pages/Sales/SalesUpdateForm";
import SalesViewPage from "../pages/Sales/SalesViewPage";
import SalesViewDetail from "../pages/Sales/SalesViewDetail";
import SalesStoChart from "../pages/Sales/SalesStoChart";
import SalesStoPieChart from "../pages/Sales/SalesStoPieChart";
import SalesMitraChart from "../pages/Sales/SalesMitraChart";
import SalesMitraPieChart from "../pages/Sales/SalesMitraPieChart";
import SalesStoAnalysis from "../pages/Sales/SalesStoAnalysis";
import SalesMonthAnalysis from "../pages/Sales/SalesMonthAnalysis";
import SalesCodeAnalysis from "../pages/Sales/SalesCodeAnalysis";
import SalesMitraAnalysis from "../pages/Sales/SalesMitraAnalysis";
import SalesDayAnalysis from "../pages/Sales/SalesDayAnalysis";
import SalesTargetTracking from "../pages/Sales/SalesTargetTracking";
import UserDataPsPage from "../pages/User/UserDataPsPage";
import UserDetailPsPage from "../pages/User/UserDetailPsPage";
import UserSalesViewPage from "../pages/User/UserSalesViewPage";
import UserSalesViewDetail from "../pages/User/UserSalesViewDetail";
import UserStoChart from "../pages/User/UserStoChart";
import UserStoPieChart from "../pages/User/UserStoPieChart";
import UserMitraChart from "../pages/User/UserMitraChart";
import UserMitraPieChart from "../pages/User/UserMitraPieChart";
import UserStoAnalysis from "../pages/User/UserStoAnalysis";
import UserMonthAnalysis from "../pages/User/UserMonthAnalysis";
import UserCodeAnalysis from "../pages/User/UserCodeAnalysis";
import UserMitraAnalysis from "../pages/User/UserMitraAnalysis";
import UserDayAnalysis from "../pages/User/UserDayAnalysis";
import UserTargetTracking from "../pages/User/UserTargetTracking";

const isAuthenticated = () => {
  const token = Cookies.get("token");
  return !!token;
};

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem("authToken");
  const userRole = localStorage.getItem("userRole"); // Simpan role saat login

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && userRole !== requiredRole) {
    // Redirect jika role tidak sesuai
    return <Navigate to="/" />;
  }

  return children;
};

const AppRouter = () => (
  <Routes>
    {/* Public Routes */}
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<LoginPage />} />


    {/* Protected Routes */}

    {/* Admin Routes */}
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute role="admin">
          <Dashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/profile"
      element={
        <ProtectedRoute>
          <>
            <Header />
            <ProfilePage />
          </>
        </ProtectedRoute>
      }
    />
    <Route
      path="/data-ps"
      element={
        <ProtectedRoute>
          <>
            <DataPSPage />
          </>
        </ProtectedRoute>
      }
    />
    <Route
      path="/data-ps/create"
      element={
        <ProtectedRoute>
          <>
            <Sidebar />
            <CreateForm />
          </>
        </ProtectedRoute>
      }
    />
    <Route
      path="/data-ps/update/:id"
      element={
        <ProtectedRoute>
          <>
            <Sidebar />
            <UpdateForm />
          </>
        </ProtectedRoute>
      }
    />
    <Route
      path="/data-ps/detail/:id"
      element={
        <ProtectedRoute>
          <>
            <Sidebar />
            <DetailPage />
          </>
        </ProtectedRoute>
      }
    />
    <Route
      path="/sales-codes"
      element={
        <ProtectedRoute>
          <>
            <Sidebar />
            <SalesCodePage />
          </>
        </ProtectedRoute>
      }
    />
    <Route
      path="/sales-codes/create"
      element={
        <ProtectedRoute>
          <>
            <Sidebar />
            <SalesCodeCreateForm />
          </>
        </ProtectedRoute>
      }
    />
    <Route
      path="/sales-codes/update/:id"
      element={
        <ProtectedRoute>
          <>
            <Sidebar />
            <SalesCodeUpdateForm />
          </>
        </ProtectedRoute>
      }
    />
    <Route
      path="/sales-codes/:id"
      element={
        <ProtectedRoute>
          <>
            <Sidebar />
            <SalesCodeDetail />
          </>
        </ProtectedRoute>
      }
    />
    <Route
      path="/ps-analysis/sto"
      element={
        <ProtectedRoute>
          <>
            <Sidebar />
            <StoAnalysisPage />
          </>
        </ProtectedRoute>
      }
    />
    <Route
      path="/ps-analysis/month"
      element={
        <ProtectedRoute>
          <>
            <Sidebar />
            <MonthAnalysis />
          </>
        </ProtectedRoute>
      }
    />
    <Route
      path="/ps-analysis/code"
      element={
        <ProtectedRoute>
          <>
            <Sidebar />
            <PSAnalysisByCode />
          </>
        </ProtectedRoute>
      }
    />
    <Route
      path="/ps-analysis/mitra"
      element={
        <ProtectedRoute>
          <>
            <Sidebar />
            <MitraAnalysisPage />
          </>
        </ProtectedRoute>
      }
    />
    <Route
      path="/data-ps/day/analysis"
      element={
        <ProtectedRoute>
          <>
            <Sidebar />
            <DayAnalysis />
          </>
        </ProtectedRoute>
      }
    />
    <Route
      path="/sto-chart"
      element={
        <ProtectedRoute>
          <>
            <Sidebar />
            <StoChartPage />
          </>
        </ProtectedRoute>
      }
    />
    <Route
      path="/sto-pie-chart"
      element={
        <ProtectedRoute>
          <>
            <Sidebar />
            <StoPieChartPage />
          </>
        </ProtectedRoute>
      }
    />
    <Route
      path="/mitra-bar-chart"
      element={
        <ProtectedRoute>
          <>
            <Sidebar />
            <MitraBarChart />
          </>
        </ProtectedRoute>
      }
    />
    <Route
      path="/mitra-pie-chart"
      element={
        <ProtectedRoute>
          <>
            <Sidebar />
            <MitraPieChart />
          </>
        </ProtectedRoute>
      }
    />
    <Route
      path="/data-ps/target/tracking"
      element={
        <ProtectedRoute>
          <Sidebar />
          <TargetTrackingPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/data-ps/set-target"
      element={
        <ProtectedRoute>
          <Sidebar />
          <TargetTrackingPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/users"
      element={
        <ProtectedRoute>
          <>
            <Sidebar />
            <UserRegisterAdmin />
          </>
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/users/create"
      element={
        <ProtectedRoute>
          <>
            <Sidebar />
            <CreateUserAdmin />
          </>
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/users/update/:id"
      element={
        <ProtectedRoute>
          <>
            <Sidebar />
            <UpdateUserAdmin />
          </>
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/users/import"
      element={
        <ProtectedRoute>
          <>
            <Sidebar />
            <ImportUserAdmin />
          </>
        </ProtectedRoute>
      }
    />
    //Sales Routes
    {/* Sales Routes */}
    <Route
      path="/sales/dashboard"
      element={
        <ProtectedRoute role="sales">
          <SalesDashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/sales"
      element={
        <ProtectedRoute>
          <>
            <SidebarSales />
            <SalesPage />
          </>
        </ProtectedRoute>
      }
    />
    <Route
      path="/sales/create"
      element={
        <ProtectedRoute>
          <>
            <SidebarSales />
            <SalesCreateForm />
          </>
        </ProtectedRoute>
      }
    />
    <Route
      path="/sales/update/:id"
      element={
        <ProtectedRoute>
          <>
            <SidebarSales />
            <SalesUpdateForm />
          </>
        </ProtectedRoute>
      }
    />
    <Route
      path="/sales/detail/:id"
      element={
        <ProtectedRoute>
          <>
            <SidebarSales />
            <SalesDetailPage />
          </>
        </ProtectedRoute>
      }
    />
    <Route
      path="/sales/sales-codes/"
      element={
        <ProtectedRoute>
          <>
            <SidebarSales />
            <SalesViewPage />
          </>
        </ProtectedRoute>
      }
    />
    <Route
      path="/sales/sales-codes/detail/:id"
      element={
        <ProtectedRoute>
          <>
            <SidebarSales />
            <SalesViewDetail />
          </>
        </ProtectedRoute>
      }
    />
    <Route
      path="/sales/sto-chart"
      element={
        <ProtectedRoute>
          <>
            <SidebarSales />
            <SalesStoChart />
          </>
        </ProtectedRoute>
      }
    />
    <Route
      path="/sales/sto-pie-chart"
      element={
        <ProtectedRoute>
          <>
            <SidebarSales />
            <SalesStoPieChart />
          </>
        </ProtectedRoute>
      }
    />
    <Route
      path="/sales/mitra-bar-chart"
      element={
        <ProtectedRoute>
          <>
            <SidebarSales />
            <SalesMitraChart />
          </>
        </ProtectedRoute>
      }
    />
    <Route
      path="/sales/mitra-pie-chart"
      element={
        <ProtectedRoute>
          <>
            <SidebarSales />
            <SalesMitraPieChart />
          </>
        </ProtectedRoute>
      }
    />
    <Route
      path="/sales/ps-analysis/sto"
      element={
        <ProtectedRoute>
          <>
            <SidebarSales />
            <SalesStoAnalysis />
          </>
        </ProtectedRoute>
      }
    />
    <Route
      path="/sales/ps-analysis/month"
      element={
        <ProtectedRoute>
          <>
            <SidebarSales />
            <SalesMonthAnalysis />
          </>
        </ProtectedRoute>
      }
    />
    <Route
      path="/sales/ps-analysis/code"
      element={
        <ProtectedRoute>
          <>
            <SidebarSales />
            <SalesCodeAnalysis />
          </>
        </ProtectedRoute>
      }
    />
    <Route
      path="/sales/ps-analysis/mitra"
      element={
        <ProtectedRoute>
          <>
            <SidebarSales />
            <SalesMitraAnalysis />
          </>
        </ProtectedRoute>
      }
    />
    <Route
      path="/sales/data-ps/day-analysis"
      element={
        <ProtectedRoute>
          <>
            <SidebarSales />
            <SalesDayAnalysis />
          </>
        </ProtectedRoute>
      }
    />
    <Route
      path="/sales/data-ps/target/tracking"
      element={
        <ProtectedRoute>
          <>
            <SidebarSales />
            <SalesTargetTracking />
          </>
        </ProtectedRoute>
      }
    />
    <Route
      path="/sales/data-ps/set-target"
      element={
        <ProtectedRoute>
          <SidebarSales />
          <SalesTargetTracking />
        </ProtectedRoute>
      }
    />



    //User Routes
    {/* User Routes */}
    <Route
      path="/user/dashboard"
      element={
        <ProtectedRoute role="user">
          <UserDashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/user"
      element={
        <ProtectedRoute>
          <>
            <SidebarUser />
            <UserDataPsPage />
          </>
        </ProtectedRoute>
      }
    />
    <Route
      path="/user/detail/:id"
      element={
        <ProtectedRoute>
          <>
            <SidebarUser />
            <UserDetailPsPage />
          </>
        </ProtectedRoute>
      }
    />
    <Route
      path="/user/sales-codes/"
      element={
        <ProtectedRoute>
          <>
            <SidebarUser />
            <UserSalesViewPage />
          </>
        </ProtectedRoute>
      }
    />
    <Route
      path="/user/sales-codes/detail/:id"
      element={
        <ProtectedRoute>
          <>
            <SidebarUser />
            <UserSalesViewDetail />
          </>
        </ProtectedRoute>
      }
    />
    <Route
      path="/user/sto-chart"
      element={
        <ProtectedRoute>
          <>
            <SidebarUser />
            <UserStoChart />
          </>
        </ProtectedRoute>
      }
    />
    <Route
      path="/user/sto-pie-chart"
      element={
        <ProtectedRoute>
          <>
            <SidebarUser />
            <UserStoPieChart />
          </>
        </ProtectedRoute>
      }
    />
    <Route
      path="/user/mitra-bar-chart"
      element={
        <ProtectedRoute>
          <>
            <SidebarUser />
            <UserMitraChart />
          </>
        </ProtectedRoute>
      }
    />
    <Route
      path="/user/mitra-pie-chart"
      element={
        <ProtectedRoute>
          <>
            <SidebarUser />
            <UserMitraPieChart />
          </>
        </ProtectedRoute>
      }
    />
    <Route
      path="/user/ps-analysis/sto"
      element={
        <ProtectedRoute>
          <>
            <SidebarUser />
            <UserStoAnalysis />
          </>
        </ProtectedRoute>
      }
    />
    <Route
      path="/user/ps-analysis/month"
      element={
        <ProtectedRoute>
          <>
            <SidebarUser />
            <UserMonthAnalysis />
          </>
        </ProtectedRoute>
      }
    />
    <Route
      path="/user/ps-analysis/code"
      element={
        <ProtectedRoute>
          <>
            <SidebarUser />
            <UserCodeAnalysis />
          </>
        </ProtectedRoute>
      }
    />
    <Route
      path="/user/ps-analysis/mitra"
      element={
        <ProtectedRoute>
          <>
            <SidebarUser />
            <UserMitraAnalysis />
          </>
        </ProtectedRoute>
      }
    />
    <Route
      path="/user/data-ps/day-analysis"
      element={
        <ProtectedRoute>
          <>
            <SidebarUser />
            <UserDayAnalysis />
          </>
        </ProtectedRoute>
      }
    />
    <Route
      path="/user/data-ps/target/tracking"
      element={
        <ProtectedRoute>
          <>
            <SidebarUser />
            <UserTargetTracking />
          </>
        </ProtectedRoute>
      }
    />
    {/* Redirect unknown routes to landing page */}
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

export default AppRouter;
