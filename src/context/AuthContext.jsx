import PropTypes from "prop-types";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Login function
  const login = async (usernameOrEmail, password) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/users/login`, {
        usernameOrEmail,
        password,
      });
      const { accessToken, refreshToken } = res.data;
      Cookies.set("accessToken", accessToken);
      Cookies.set("refreshToken", refreshToken);
      toast.success("Login successful");
      fetchUser();
      navigate("/dashboard");
    } catch {
      toast.error("Login failed");
    }
  };

  // Fetch user info
  const fetchUser = async () => {
    try {
      const token = Cookies.get("accessToken");
      if (!token) return;
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data); // Pastikan res.data berisi role dan info user
      console.log("Fetched User Data:", res.data); // Debugging untuk melihat data user
    } catch {
      toast.error("Failed to fetch user data");
    }
  };

  // Logout function
  const logout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    setUser(null);
    navigate("/login");
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

// Menambahkan propTypes untuk validasi properti
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired, // children harus berupa elemen React dan wajib diisi
};
