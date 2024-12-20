import PropTypes from "prop-types";
import { useEffect, useReducer, useCallback, useMemo } from "react";
import Cookies from "js-cookie";
import axiosInstance, { endpoints } from "../api/axios";
import { AuthContext } from "./auth-context";

// ----------------------------------------------------------------------
const initialState = {
  user: null,
  roles: [],
  loading: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INITIAL":
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        roles: action.payload.roles,
      };
    case "LOGIN":
    case "REGISTER":
      return {
        ...state,
        user: action.payload.user,
        roles: action.payload.roles,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        roles: [],
      };
    default:
      return state;
  }
};

// ----------------------------------------------------------------------

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = useCallback(async (email, password) => {
    const data = { email, password };

    try {
      const response = await axiosInstance.post(endpoints.auth.login, data);
      const { roles, user } = response.data;

      dispatch({
        type: "LOGIN",
        payload: {
          user,
          roles,
        },
      });

      return { roles, user };
    } catch (error) {
      console.error("Login Error:", error);
      throw error;
    }
  }, []);

  const register = useCallback(async (email, password, firstName, lastName) => {
    const data = { email, password, firstName, lastName };

    try {
      const response = await axiosInstance.post(endpoints.auth.register, data);
      const { user } = response.data;

      dispatch({
        type: "REGISTER",
        payload: {
          user,
          roles: user.roles || [],
        },
      });
    } catch (error) {
      console.error("Registration Error:", error);
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await axiosInstance.post(endpoints.auth.logout);
    } catch (error) {
      console.error("Logout Error:", error);
    } finally {
      dispatch({ type: "LOGOUT" });
    }
  }, [state]);

  const checkAuthenticated = state.user ? "authenticated" : "unauthenticated";
  const status = state.loading ? "loading" : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: "jwt",
      loading: status === "loading",
      authenticated: status === "authenticated",
      unauthenticated: status === "unauthenticated",
      login,
      register,
      logout,
    }),
    [login, logout, register, state.user, status]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
