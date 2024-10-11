import PropTypes from "prop-types";
import { createContext, useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
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

      // Pastikan respon dari server memiliki accessToken dan refreshToken
      const { accessToken, refreshToken } = res.data;

      if (!accessToken || !refreshToken) {
        throw new Error("Access token atau refresh token tidak ditemukan di response.");
      }

      // Simpan token di cookie
      Cookies.set("accessToken", accessToken);
      Cookies.set("refreshToken", refreshToken);

      // Ambil data user dan simpan di state
      toast.success("Login berhasil.");
      await fetchUser(setUser);

      // Redirect ke dashboard
      navigate("/dashboard");
    } catch (error) {
      handleLoginError(error);
    }
  };

  return { login };
};

// Fungsi untuk mengambil data user
const fetchUser = async (setUser) => {
  let token = Cookies.get("accessToken");
  const refreshToken = Cookies.get("refreshToken");

  // Hanya ambil data user jika token tersedia
  if (!token) return;

  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUser(res.data.data); // Simpan data user di state
  } catch (error) {
    if (error.response && error.response.status === 401 && refreshToken) {
      // Jika accessToken kadaluarsa, coba gunakan refreshToken
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/me`, {
          headers: { Authorization: `Bearer ${refreshToken}` },
        });

        // Simpan accessToken yang baru didapat dari refreshToken
        const { accessToken } = res.data;
        Cookies.set("accessToken", accessToken);

        // Ulangi permintaan dengan accessToken yang baru
        const retryRes = await axios.get(`${import.meta.env.VITE_API_URL}/users/me`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setUser(retryRes.data);
      } catch {
        // Jika refreshToken juga gagal atau kadaluarsa
        handleTokenExpired();
      }
    } else {
      handleTokenExpired(); // Jika kedua token sudah habis
    }
  }
};

// Fungsi untuk menangani token yang kadaluarsa
const handleTokenExpired = () => {
  toast(
    (t) => (
      <ModalConfirmation
        message="Masa aktif token sudah habis. Silakan login kembali."
        onConfirm={() => {
          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");
          toast.dismiss(t.id);
          Navigate("/login"); // Redirect ke halaman login
          window.location.reload(); // Reload halaman,
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
const useLogout = (setUser, navigate) => {
  const logout = () => {
    toast(
      (t) => (
        <ModalConfirmation
          message="Apakah Anda ingin logout?"
          onConfirm={() => {
            Cookies.remove("accessToken");
            Cookies.remove("refreshToken");
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

  return { logout };
};

// Provider untuk konteks autentikasi
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Menyimpan state user
  const navigate = useNavigate();
  const { login } = useLogin(setUser, navigate);
  const { logout } = useLogout(setUser, navigate);

  // panggil fetchUser jika token tersedia
  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (token) {
      fetchUser(setUser);
    }
  }, []); // Gunakan token untuk mengambil data user

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

// Menambahkan propTypes untuk validasi properti
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
