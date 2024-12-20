import axios from "./axios";
import Cookies from "js-cookie";
import axiosInstance, { endpoints } from "./axios";

// Fungsi login
export const login = async (username, password) => {
  try {
    const response = await axios.post(endpoints.auth.login, {
      username,
      password,
    });

    const token = response.data?.data?.token;
    if (token) {
      Cookies.set("token", token, { expires: 1 }); // Token disimpan dengan cookie
    } else {
      throw new Error("Token tidak ditemukan dalam respons API.");
    }

    return response.data;
  } catch (error) {
    console.error("Login error:", error.response || error);
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const logout = async () => {
  try {
    await axios.post(endpoints.auth.logout);
    Cookies.remove("token"); // Hapus token dari cookies
  } catch (error) {
    console.error("Logout error:", error.response || error);
    throw new Error(error.response?.data?.message || "Logout failed");
  }
};

export const getDashboardData = async () => {
  try {
    const response = await axiosInstance.get(endpoints.common.dashboard);
    return response.data;
  } catch (error) {
    console.error("Dashboard error:", error.response || error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch dashboard data"
    );
  }
};

export const getSalesDashboardData = async () => {
  try {
    console.log("Fetching dashboard data");
    const response = await axiosInstance.get(endpoints.common.salesDashboard);
    console.log("Dashboard response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Sales Dashboard error details:", {
      response: error.response,
      message: error.message,
      config: error.config,
    });
    throw new Error(
      error.response?.data?.message || "Failed to fetch sales dashboard data"
    );
  }
};

export const getUserDashboardData = async () => {
  try {
    // Memanggil endpoint user dashboard
    const response = await axiosInstance.get(endpoints.common.userDashboard);
    return response.data;
  } catch (error) {
    // Menangani kesalahan dan menampilkan detail error
    console.error("User Dashboard error details:", {
      response: error.response,
      message: error.message,
      config: error.config,
    });
    // Melempar error dengan pesan yang lebih informatif
    throw new Error(
      error.response?.data?.message || "Failed to fetch user dashboard data"
    );
  }
};

export const getLandingPageData = async () => {
  try {
    const response = await axios.get(endpoints.common.landingPage);
    console.log("Landing Page Data:", response.data); // Debugging
    return response.data;
  } catch (error) {
    console.error("Landing Page Error:", error.response || error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch landing page data"
    );
  }
};

// Ambil daftar data PS
export const dataPsApi = {
  getList: async (page = 1, perPage = 10) => {
    try {
      const response = await axiosInstance.get(
        `${endpoints.admin.dataPs.list}?page=${page}&per_page=${perPage}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch data");
    }
  },
  getDetail: async (id) => {
    try {
      const response = await axiosInstance.get(endpoints.admin.dataPs.show(id)); // Menggunakan endpoints untuk mendapatkan URL dengan metode show
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch detail"
      );
    }
  },
  create: async (data) => {
    try {
      const response = await axiosInstance.post(
        endpoints.admin.dataPs.store,
        data
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to create data");
    }
  },
  update: async (id, data) => {
    try {
      const response = await axiosInstance.put(
        endpoints.admin.dataPs.update(id),
        data
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to update data");
    }
  },
  delete: async (id) => {
    try {
      const response = await axiosInstance.delete(
        endpoints.admin.dataPs.delete(id)
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to delete data");
    }
  },
  import: async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await axiosInstance.post(
        endpoints.admin.dataPs.import,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to import data");
    }
  },
  getStoAnalysis: async (params) => {
    try {
      const response = await axiosInstance.get(
        endpoints.admin.dataPs.stoAnalysis,
        {
          params,
        }
      );
      return response.data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch STO analysis data"
      );
    }
  },
  getMonthAnalysis: async (params) => {
    try {
      const response = await axiosInstance.get(
        endpoints.admin.dataPs.monthAnalysis,
        {
          params,
        }
      );
      return response.data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch monthly analysis data"
      );
    }
  },
  getStoChart: async (params) => {
    try {
      const response = await axiosInstance.get(
        endpoints.admin.dataPs.stoChart,
        {
          params,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch STO chart data"
      );
    }
  },
  getStoPieChart: async (params) => {
    try {
      const response = await axiosInstance.get(
        endpoints.admin.dataPs.stoPieChart,
        {
          params,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch STO pie chart data"
      );
    }
  },
  getMitraBarChart: async (params) => {
    try {
      const response = await axiosInstance.get(
        endpoints.admin.dataPs.mitraBarChart,
        {
          params,
        }
      );
      return response.data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch Mitra bar chart data"
      );
    }
  },
  getMitraPieChart: async (params) => {
    try {
      const response = await axiosInstance.get(
        endpoints.admin.dataPs.mitraPieChart,
        {
          params,
        }
      );
      return response.data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch Mitra pie chart data"
      );
    }
  },
  getCodeAnalysis: async (params) => {
    try {
      const response = await axiosInstance.get(
        endpoints.admin.dataPs.codeAnalysis,
        {
          params,
        }
      );
      return response.data.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch code analysis data"
      );
    }
  },
  getMonthList: async () => {
    try {
      const response = await axiosInstance.get(
        endpoints.admin.dataPs.monthList
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch month list");
    }
  },

  getStoList: async () => {
    try {
      const response = await axiosInstance.get(endpoints.admin.dataPs.stoList);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch STO list");
    }
  },

  getMitraList: async () => {
    try {
      const response = await axiosInstance.get(
        endpoints.admin.dataPs.mitraList
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch Mitra list");
    }
  },

  getMitraAnalysis: async () => {
    try {
      const response = await axiosInstance.get(
        endpoints.admin.dataPs.mitraAnalysis
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch Mitra analysis");
    }
  },

  getDayAnalysis: async (page = 1) => {
    try {
      const response = await axiosInstance.get(
        `${endpoints.admin.dataPs.dayAnalysis}?page=${page}`
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch day analysis"
      );
    }
  },
  getTargetTrackingAndSalesChart: async (month, year) => {
    try {
      const response = await axios.get(
        endpoints.admin.dataPs.targetTrackingAndSalesChart,
        {
          params: {
            month: month.toString(), // Ensure string conversion
            year: year.toString(), // Ensure string conversion
          },
          headers: {
            Accept: "application/json",
          },
        }
      );

      // Validate response structure
      if (!response.data || !response.data.success) {
        throw new Error(
          response.data?.message || "Invalid response from server"
        );
      }

      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch target tracking and sales data"
      );
    }
  },

  saveTargetGrowth: async (data) => {
    try {
      const response = await axios.post(
        endpoints.admin.dataPs.setTarget,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.data || !response.data.success) {
        throw new Error(response.data?.message || "Failed to save target");
      }

      return response.data;
    } catch (error) {
      console.error("Save Target Error:", error);
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Failed to save target growth"
      );
    }
  },
};

export const salesCodesApi = {
  getList: async (page = 1, perPage = 10) => {
    try {
      const response = await axiosInstance.get(
        `${endpoints.admin.salesCodes.list}?page=${page}&per_page=${perPage}`
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch sales codes"
      );
    }
  },

  getDetail: async (id) => {
    try {
      const response = await axiosInstance.get(
        endpoints.admin.salesCodes.show(id)
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch sales code details"
      );
    }
  },

  create: async (data) => {
    try {
      const response = await axiosInstance.post(
        endpoints.admin.salesCodes.store,
        data
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to create sales code"
      );
    }
  },

  update: async (id, data) => {
    try {
      const response = await axiosInstance.put(
        endpoints.admin.salesCodes.update(id),
        data
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update sales code"
      );
    }
  },

  delete: async (id) => {
    try {
      const response = await axiosInstance.delete(
        endpoints.admin.salesCodes.delete(id)
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to delete sales code"
      );
    }
  },

  import: async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await axiosInstance.post(
        endpoints.admin.salesCodes.import,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to import sales codes"
      );
    }
  },
};

export const adminApi = {
  users: {
    getList: async () => {
      try {
        const response = await axiosInstance.get(endpoints.admin.users.list);
        return response.data;
      } catch (error) {
        console.error("Error fetching users:", error.response || error);
        throw new Error(
          error.response?.data?.message || "Failed to fetch users list"
        );
      }
    },

    store: async (data) => {
      try {
        const response = await axiosInstance.post(
          endpoints.admin.users.store,
          data
        );
        return response.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || "Failed to create user"
        );
      }
    },
    import: async (file) => {
      try {
        const formData = new FormData();
        formData.append("file", file);
        const response = await axiosInstance.post(
          endpoints.admin.users.import,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        return response.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || "Failed to import users"
        );
      }
    },
    show: async (id) => {
      try {
        const response = await axiosInstance.get(
          endpoints.admin.users.show(id)
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching user by ID:", error.response || error);
        throw new Error(
          error.response?.data?.message || "Failed to fetch user details"
        );
      }
    },
    update: async (id, data) => {
      try {
        const response = await axiosInstance.put(
          endpoints.admin.users.update.replace("{id}", id),
          data
        );
        return response.data;
      } catch (error) {
        console.error("Error updating user:", error.response || error);
        throw new Error(
          error.response?.data?.message || "Failed to update user"
        );
      }
    },
  },
};

//Sales Api
export const salesApi = {
  dataPsApi: {
    getList: async (page = 1, perPage = 10) => {
      try {
        const response = await axiosInstance.get(endpoints.sales.dataPs.list, {
          params: { page, perPage },
        });
        return response.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || "Gagal mengambil daftar data"
        );
      }
    },

    getDetail: async (id) => {
      try {
        const response = await axiosInstance.get(`/api/sales/${id}`);
        return response.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || "Failed to fetch detail"
        );
      }
    },

    create: async (data) => {
      try {
        const response = await axiosInstance.post("/api/sales/store", data);
        return response.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || "Failed to create data"
        );
      }
    },

    update: async (id, data) => {
      try {
        const response = await axiosInstance.put(`/api/sales/${id}`, data);
        return response.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || "Failed to update data"
        );
      }
    },

    delete: async (id) => {
      try {
        const response = await axiosInstance.delete(`/api/sales/${id}`);
        return response.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || "Failed to delete data"
        );
      }
    },

    import: async (file) => {
      try {
        const formData = new FormData();
        formData.append("file", file);
        const response = await axiosInstance.post(
          "/api/sales/import",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        return response.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || "Failed to import data"
        );
      }
    },

    getStoChart: async (params) => {
      try {
        const response = await axiosInstance.get("/api/sales/sto/chart", {
          params,
        });
        return response.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || "Failed to fetch STO chart data"
        );
      }
    },

    getStoPieChart: async (params) => {
      try {
        const response = await axiosInstance.get("/api/sales/sto/pie-chart", {
          params,
        });
        return response.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || "Failed to fetch STO pie chart data"
        );
      }
    },

    getMitraBarChart: async (params) => {
      try {
        const response = await axiosInstance.get("/api/sales/mitra/bar-chart", {
          params,
        });
        return response.data.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message ||
            "Failed to fetch Mitra bar chart data"
        );
      }
    },

    getMitraPieChart: async (params) => {
      try {
        const response = await axiosInstance.get("/api/sales/mitra/pie-chart", {
          params,
        });
        return response.data.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message ||
            "Failed to fetch Mitra pie chart data"
        );
      }
    },

    getStoAnalysis: async (params) => {
      try {
        const response = await axiosInstance.get("/api/sales/analysis/sto", {
          params,
        });
        return response.data.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || "Failed to fetch STO analysis data"
        );
      }
    },

    getMonthAnalysis: async (params) => {
      try {
        const response = await axiosInstance.get("/api/sales/analysis/month", {
          params,
        });
        return response.data.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || "Failed to fetch month analysis data"
        );
      }
    },

    getCodeAnalysis: async (params) => {
      try {
        const response = await axiosInstance.get("/api/sales/analysis/code", {
          params,
        });
        return response.data.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || "Failed to fetch code analysis data"
        );
      }
    },

    getMitraAnalysis: async (params) => {
      try {
        const response = await axiosInstance.get("/api/sales/analysis/mitra", {
          params,
        });
        return response.data.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || "Failed to fetch Mitra analysis data"
        );
      }
    },

    getMitraList: async () => {
      try {
        const response = await axiosInstance.get("/api/sales/mitra-list");
        return response.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || "Failed to fetch Mitra list"
        );
      }
    },

    getStoList: async () => {
      try {
        const response = await axiosInstance.get("/api/sales/sto-list");
        return response.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || "Failed to fetch STO list"
        );
      }
    },

    getMonthList: async () => {
      try {
        const response = await axiosInstance.get("/api/sales/month-list");
        return response.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || "Failed to fetch month list"
        );
      }
    },
    getDayAnalysis: async (page = 1) => {
      try {
        const response = await axiosInstance.get(
          `${endpoints.sales.dataPs.dayAnalysis}?page=${page}`
        );
        return response.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || "Failed to fetch day analysis"
        );
      }
    },
    getTargetTrackingAndSalesChart: async (month, year) => {
      try {
        const response = await axios.get(
          endpoints.sales.dataPs.targetTrackingAndSalesChart,
          {
            params: {
              month: month.toString(), // Ensure string conversion
              year: year.toString(), // Ensure string conversion
            },
            headers: {
              Accept: "application/json",
            },
          }
        );
  
        // Validate response structure
        if (!response.data || !response.data.success) {
          throw new Error(
            response.data?.message || "Invalid response from server"
          );
        }
  
        return response.data;
      } catch (error) {
        console.error("API Error:", error);
        throw new Error(
          error.response?.data?.message ||
            error.message ||
            "Failed to fetch target tracking and sales data"
        );
      }
    },
  
    saveTargetGrowth: async (data) => {
      try {
        const response = await axios.post(
          endpoints.sales.dataPs.setTarget,
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        if (!response.data || !response.data.success) {
          throw new Error(response.data?.message || "Failed to save target");
        }
  
        return response.data;
      } catch (error) {
        console.error("Save Target Error:", error);
        throw new Error(
          error.response?.data?.message ||
            error.message ||
            "Failed to save target growth"
        );
      }
    },
  },

  salesCodesApi: {
    getList: async (page = 1, perPage = 10) => {
      try {
        const response = await axiosInstance.get(
          `/api/sales-codes?page=${page}&per_page=${perPage}`
        );
        return response.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || "Failed to fetch sales codes"
        );
      }
    },

    getDetail: async (id) => {
      try {
        const response = await axiosInstance.get(`/api/sales/sales-codes/${id}`);
        return response.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || "Failed to fetch sales code details"
        );
      }
    },
  },
};

//User Api
export const userApi = {
  getProfile: async () => {
    try {
      const response = await axiosInstance.get(endpoints.user.profile);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch user profile"
      );
    }
  },

  updateProfile: async (data) => {
    try {
      const response = await axiosInstance.post(endpoints.user.update, data);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update user profile"
      );
    }
  },

  dataPsApi: {
    getList: async (page = 1, perPage = 10) => {
      try {
        const response = await axiosInstance.get(endpoints.user.dataPs.list, {
          params: { page, perPage },
        });
        return response.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || "Failed to fetch data list"
        );
      }
    },

    getDetail: async (id) => {
      try {
        const response = await axiosInstance.get(
          endpoints.user.dataPs.show(id)
        );
        return response.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || "Failed to fetch data details"
        );
      }
    },

    edit: async (id) => {
      try {
        const response = await axiosInstance.get(
          endpoints.user.dataPs.edit(id)
        );
        return response.data;
      } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to edit data");
      }
    },

    getStoAnalysis: async (params) => {
      try {
        const response = await axiosInstance.get(
          endpoints.user.dataPs.stoAnalysis,
          { params }
        );
        return response.data.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || "Failed to fetch STO analysis data"
        );
      }
    },

    getMonthAnalysis: async (params) => {
      try {
        const response = await axiosInstance.get(
          endpoints.user.dataPs.monthAnalysis,
          { params }
        );
        return response.data.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || "Failed to fetch month analysis data"
        );
      }
    },

    getCodeAnalysis: async (params) => {
      try {
        const response = await axiosInstance.get(
          endpoints.user.dataPs.codeAnalysis,
          { params }
        );
        return response.data.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || "Failed to fetch code analysis data"
        );
      }
    },

    getMitraAnalysis: async (params) => {
      try {
        const response = await axiosInstance.get(
          endpoints.user.dataPs.mitraAnalysis,
          { params }
        );
        return response.data.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || "Failed to fetch Mitra analysis data"
        );
      }
    },

    getStoChart: async (params) => {
      try {
        const response = await axiosInstance.get("/api/user/sto/chart", {
          params,
        });
        return response.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || "Failed to fetch STO chart data"
        );
      }
    },

    getStoPieChart: async (params) => {
      try {
        const response = await axiosInstance.get("/api/user/sto/pie-chart", {
          params,
        });
        return response.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || "Failed to fetch STO pie chart data"
        );
      }
    },

    getDayAnalysis: async (page = 1) => {
      try {
        const response = await axiosInstance.get(
          `${endpoints.user.dataPs.dayAnalysis}?page=${page}`
        );
        return response.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || "Failed to fetch day analysis"
        );
      }
    },

    getMitraBarChart: async (params) => {
      try {
        const response = await axiosInstance.get("/api/user/mitra/bar-chart", {
          params,
        });
        return response.data.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message ||
            "Failed to fetch Mitra bar chart data"
        );
      }
    },

    getMitraPieChart: async (params) => {
      try {
        const response = await axiosInstance.get("/api/user/mitra/pie-chart", {
          params,
        });
        return response.data.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message ||
            "Failed to fetch Mitra pie chart data"
        );
      }
    },

    getTargetTrackingAndSalesChart: async (month, year) => {
      try {
        const response = await axios.get(
          endpoints.user.dataPs.targetTrackingAndSalesChart,
          {
            params: {
              month: month.toString(), // Ensure string conversion
              year: year.toString(), // Ensure string conversion
            },
            headers: {
              Accept: "application/json",
            },
          }
        );
  
        // Validate response structure
        if (!response.data || !response.data.success) {
          throw new Error(
            response.data?.message || "Invalid response from server"
          );
        }
  
        return response.data;
      } catch (error) {
        console.error("API Error:", error);
        throw new Error(
          error.response?.data?.message ||
            error.message ||
            "Failed to fetch target tracking and sales data"
        );
      }
    },
    getMitraList: async () => {
      try {
        const response = await axiosInstance.get(
          endpoints.user.dataPs.mitraList
        );
        return response.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || "Failed to fetch Mitra list"
        );
      }
    },

    getStoList: async () => {
      try {
        const response = await axiosInstance.get(endpoints.user.dataPs.stoList);
        return response.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || "Failed to fetch STO list"
        );
      }
    },

    getMonthList: async () => {
      try {
        const response = await axiosInstance.get(
          endpoints.user.dataPs.monthList
        );
        return response.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || "Failed to fetch month list"
        );
      }
    },

    getDateList: async () => {
      try {
        const response = await axiosInstance.get(
          endpoints.user.dataPs.dateList
        );
        return response.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || "Failed to fetch date list"
        );
      }
    },
  },

  salesCodesApi: {
    getList: async (page = 1, perPage = 10) => {
      try {
        const response = await axiosInstance.get(
          `/api/sales-codes?page=${page}&per_page=${perPage}`
        );
        return response.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || "Failed to fetch sales codes"
        );
      }
    },

    getDetail: async (id) => {
      try {
        const response = await axiosInstance.get(`/api/user/sales-codes/${id}`);
        return response.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || "Failed to fetch sales code details"
        );
      }
    },
  },
};
