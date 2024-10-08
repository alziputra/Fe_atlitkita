import PropTypes from "prop-types";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import ModalConfirmation from "../components/ModalConfirmation";

// Membuat konteks untuk autentikasi
export const AuthContext = createContext();

// Fungsi untuk menangani login
const useLogin = (setUser, navigate) => {
  const login = async (usernameOrEmail, password) => {
    if (!usernameOrEmail || !password) {
      toast.error("Username atau password tidak boleh kosong.");
      return;
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/users/login`, {
        usernameOrEmail,
        password,
      });
      const { accessToken, refreshToken } = res.data;

      Cookies.set("accessToken", accessToken);
      Cookies.set("refreshToken", refreshToken);

      toast.success("Login berhasil.");
      await fetchUser(setUser);

      navigate("/dashboard");
    } catch (error) {
      handleLoginError(error);
    }
  };

  return { login };
};

// Fungsi untuk menangani error login
const handleLoginError = (error) => {
  if (error.response) {
    const statusCode = error.response.status;
    const errorMessage = error.response.data.message;

    switch (statusCode) {
      case 400:
        toast.error(errorMessage || "Permintaan login tidak valid. Mohon cek input Anda.");
        break;
      case 401:
        toast.error(errorMessage || "Username atau password salah. Silakan coba lagi.");
        break;
      case 403:
        toast.error(errorMessage || "Akses ditolak. Silakan hubungi dukungan.");
        break;
      case 500:
        toast.error("Kesalahan server. Silakan coba lagi nanti.");
        break;
      default:
        toast.error("Gagal login. Silakan coba lagi.");
    }
  } else if (error.request) {
    toast.error("Tidak dapat terhubung ke server. Periksa koneksi Anda atau coba lagi nanti.");
  } else {
    toast.error("Terjadi kesalahan yang tidak terduga. Silakan coba lagi.");
  }
};

// Fungsi untuk mengambil data user
const fetchUser = async (setUser) => {
  try {
    const token = Cookies.get("accessToken");
    if (!token) return;

    const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setUser(res.data);
  } catch {
    toast.error("Gagal mengambil data pengguna.");
  }
};

// Fungsi untuk menangani logout dengan konfirmasi
const useLogout = (setUser, navigate) => {
  const logout = () => {
    toast(
      (t) => (
        <ModalConfirmation
          message="Apakah Anda ingin logout?" 
          onConfirm={() => {
            Cookies.remove("accessToken");
            Cookies.remove("refreshToken");
            setUser(null);
            toast.dismiss(t.id);
            navigate("/login"); // Arahkan ke halaman login
            window.location.reload(); // Reload halaman
          }}
          onCancel={() => toast.dismiss(t.id)}
        />
      ),
      { duration: 0 }
    );
  };

  return { logout };
};

// Provider untuk konteks autentikasi
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { login } = useLogin(setUser, navigate);
  const { logout } = useLogout(setUser, navigate);

  useEffect(() => {
    fetchUser(setUser);
  }, []);

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

// Menambahkan propTypes untuk validasi properti
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
