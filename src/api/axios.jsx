import axios from "axios";
import Cookies from "js-cookie";
import { config } from "../config-global";

// Buat instance axios dengan konfigurasi default
const axiosInstance = axios.create({
  baseURL: config.HOST_API, // Pastikan `HOST_API` diisi URL backend yang benar
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token"); // Ambil token dari cookies
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Jika ada error saat setup request
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response, // Jika tidak ada error, langsung kembalikan respons
  (error) => {
    // Tangani error respons
    if (error.response) {
      const { status, data } = error.response;

      // Handle unauthorized access (401)
      if (status === 401) {
        Cookies.remove("token"); // Hapus token dari cookies
        window.location.href = "/login"; // Redirect ke halaman login
      }

      // Handle server errors (500)
      if (status === 500) {
        console.error(
          "Server Error:",
          data?.message || "Internal Server Error"
        );
      }

      // Handle validation errors (422)
      if (status === 422) {
        console.error("Validation Error:", data?.errors || data);
      }

      // Tambahkan handler untuk error lain jika diperlukan
    } else {
      // Tangani kasus di mana tidak ada respons dari server
      console.error("Network Error:", error.message || "Something went wrong");
    }

    return Promise.reject(error); // Lempar kembali error agar bisa ditangani di API caller
  }
);

export const endpoints = {
  auth: {
    login: "/api/auth/login",
    logout: "/api/auth/logout",
  },

  // Endpoints untuk Admin
  admin: {
    users: {
      list: "/api/admin/users",
      show: (id) => `/api/admin/users/${id}`,
      store: "/api/admin/users/store",
      import: "/api/admin/users/import",
      update: "/api/admin/users/update/{id}",
    },
    dataPs: {
      // Semua endpoint data-ps dengan akses penuh
      ...{
        list: "/api/data-ps",
        show: (id) => `/api/data-ps/${id}`,
        store: "/api/data-ps/store",
        update: (id) => `/api/data-ps/${id}`,
        delete: (id) => `/api/data-ps/${id}`,
        import: "/api/data-ps/import",

        // Analisis dan chart
        stoChart: "/api/data-ps/sto/chart",
        stoPieChart: "/api/data-ps/sto/pie-chart",
        mitraBarChart: "/api/data-ps/mitra/bar-chart",
        mitraPieChart: "/api/data-ps/mitra/pie-chart",
        stoAnalysis: "/api/data-ps/analysis/sto",
        monthAnalysis: "/api/data-ps/analysis/month",
        codeAnalysis: "/api/data-ps/analysis/code",
        mitraAnalysis: "/api/data-ps/analysis/mitra",

        // List dan utility
        mitraList: "/api/data-ps/mitra-list",
        stoList: "/api/data-ps/sto-list",
        monthList: "/api/data-ps/month-list",
        dayAnalysis: "/api/data-ps/day/analysis",
        targetTrackingAndSalesChart: "/api/data-ps/target/tracking",
        setTarget: "/api/data-ps/set-target",
      },
    },
    salesCodes: {
      list: "/api/sales-codes",
      show: (id) => `/api/sales-codes/${id}`,
      store: "/api/sales-codes/store",
      update: (id) => `/api/sales-codes/update/${id}`,
      delete: (id) => `/api/sales-codes/${id}`,
      import: "/api/sales-codes/import",
    },
  },

  // Endpoints untuk Sales
  // Endpoints for Sales
  sales: {
    dataPs: {
      // Endpoint terbatas untuk sales
      list: "/api/sales",
      show: (id) => `/api/sales/${id}`,
      store: "/api/sales/store",
      update: (id) => `/api/sales/${id}`,
      delete: (id) => `/api/sales/${id}`,

      // Analisis yang diperbolehkan untuk sales
      stoChart: "/api/sales/sto/chart",
      stoPieChart: "/api/sales/sto/pie-chart",
      mitraBarChart: "/api/sales/mitra/bar-chart",
      mitraPieChart: "/api/sales/mitra/pie-chart",
      analysisBySto: "/api/sales/analysis/sto",
      analysisByMonth: "/api/sales/analysis/month",
      analysisByCode: "/api/sales/analysis/code",
      analysisByMitra: "/api/sales/analysis/mitra",
      targetTrackingAndSalesChart: "/api/sales/target/tracking",
      dayAnalysis: "/api/sales/day/analysis",
      setTarget: "/api/sales/set-target",
      importExcel: "/api/sales/import/excel",

      // List utility
      mitraList: "/api/sales/mitra-list",
      stoList: "/api/sales/sto-list",
      monthList: "/api/sales/month-list",
    },
    salesCodes: {
      // Akses terbatas untuk sales
      list: "/api/sales/sales-codes",
      show: (id) => `/api/sales/sales-codes/${id}`,
    },
  },

  // Endpoints untuk User
  user: {
    profile: "/api/user/profile",
    update: "/api/user/update",
    dataPs: {
      // Endpoint read-only untuk user
      list: "/api/user",
      show: (id) => `/api/user/${id}`,

      // Analisis yang diperbolehkan untuk user
      mitraBarChart: "/api/user/mitra/bar-chart",
      mitraPieChart: "/api/user/mitra/pie-chart",
      stoAnalysis: "/api/user/analysis/sto",
      monthAnalysis: "/api/user/analysis/month",
      codeAnalysis: "/api/user/analysis/code",
      mitraAnalysis: "/api/user/analysis/mitra",
      stoChart: "/api/user/sto-chart",
      stoPieChart: "/api/user/sto-pie-chart",
      dayAnalysis: "/api/user/day/analysis",
      targetTrackingAndSalesChart: "/api/user/target/tracking",

      // List utility
      mitraList: "/api/user/mitra-list",
      stoList: "/api/user/sto-list",
      monthList: "/api/user/month-list",
      dateList: "/api/user/date-list",
    },
    salesCodes: {
      // Akses read-only untuk user
      list: "/api/user/sales-codes/",
      show: (id) => `/api/user/sales-codes/${id}`,
    },
  },

  // Endpoints umum
  common: {
    landingPage: "/api/landing-page",
    dashboard: "/api/dashboard",
    salesDashboard: "/api/sales/dashboard",
    userDashboard: "/api/user/dashboard",
  },
};

export default axiosInstance;
