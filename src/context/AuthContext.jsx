import PropTypes from "prop-types";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode"; 
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import ModalConfirmation from "../components/ModalConfirmation";

// Membuat konteks untuk autentikasi
export const AuthContext = createContext();

// Fungsi untuk menangani login
const login = async (usernameOrEmail, password, setUser, navigate) => {
  if (!usernameOrEmail || !password) {
    toast.error("Username atau password tidak boleh kosong.");
    return;
  }

  try {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/users/login`, {
      usernameOrEmail,
      password,
    });

    // Pastikan respon dari server memiliki Token
    const { Token } = res.data;

    if (!Token) {
      throw new Error("Token tidak ditemukan di response.");
    }

    // Simpan token di cookie
    Cookies.set("Token", Token, { secure: true, sameSite: "Strict" });

    // Dekode Token untuk mengambil informasi user
    const decodedToken = jwtDecode(Token);
    setUser(decodedToken); // Simpan data user di state

    toast.success("Login berhasil.");

    // Redirect ke dashboard
    navigate("/dashboard");
  } catch (error) {
    handleLoginError(error);
  }
};

// Fungsi untuk mengambil data user dari token
const getUserFromToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    // Optional: Periksa apakah token sudah kedaluwarsa
    const currentTime = Date.now() / 1000;
    if (decoded.exp && decoded.exp < currentTime) {
      return null;
    }
    return decoded;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

// Fungsi untuk mengambil data user
const fetchUser = async (setUser) => {
  let token = Cookies.get("Token");

  // Hanya ambil data user jika token tersedia
  if (!token) return;

  // Dekode token untuk mendapatkan user data
  const decodedUser = getUserFromToken(token);
  if (decodedUser) {
    setUser(decodedUser);
    return;
  }

  // Jika token tidak valid atau kedaluwarsa, tangani token yang kadaluarsa
  handleTokenExpired();
};

// Fungsi untuk menangani token yang kadaluarsa
const handleTokenExpired = () => {
  toast(
    (t) => (
      <ModalConfirmation
        message="Masa aktif token sudah habis. Silakan login kembali."
        onConfirm={() => {
          Cookies.remove("Token");
          toast.dismiss(t.id);
          window.location.href = "/login"; // Redirect ke halaman login
        }}
      />
    ),
    { duration: 0 } // Toast tetap muncul sampai ada aksi
  );
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
        toast.error("Username atau email tidak ditemukan.");
    }
  } else if (error.request) {
    toast.error("Tidak dapat terhubung ke server. Periksa koneksi Anda atau coba lagi nanti.");
  } else {
    toast.error("Terjadi kesalahan yang tidak terduga. Silakan coba lagi.");
  }
};

// Fungsi untuk menangani logout dengan konfirmasi
const logout = (setUser, navigate) => {
  toast(
    (t) => (
      <ModalConfirmation
        message="Apakah Anda ingin logout?"
        onConfirm={() => {
          Cookies.remove("Token");
          setUser(null); // Reset state user
          toast.dismiss(t.id);
          navigate("/login"); // Arahkan ke halaman login
          window.location.reload(); // Reload halaman
        }}
        onCancel={() => toast.dismiss(t.id)}
      />
    ),
    { duration: 0 } // Durasi toast 0 berarti toast akan tetap muncul sampai ada aksi konfirmasi
  );
};

// Provider untuk konteks autentikasi
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Menyimpan state user
  const navigate = useNavigate();

  // Panggil fetchUser jika token tersedia
  useEffect(() => {
    const token = Cookies.get("Token");
    if (token) {
      fetchUser(setUser);
    }
  }, []); // Gunakan token untuk mengambil data user

  return (
    <AuthContext.Provider
      value={{
        user,
        login: (usernameOrEmail, password) => login(usernameOrEmail, password, setUser, navigate),
        logout: () => logout(setUser, navigate),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Menambahkan propTypes untuk validasi properti
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
