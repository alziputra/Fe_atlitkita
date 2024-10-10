import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import ModalConfirmation from "../components/ModalConfirmation";

export const fetchData = async (endpoint) => {
  let token = Cookies.get("accessToken");
  const refreshToken = Cookies.get("refreshToken");

  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/${endpoint}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.data.length;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Jika accessToken kadaluarsa, gunakan refreshToken dari cookies
      if (refreshToken) {
        try {
          // Gunakan refreshToken untuk request ulang
          const res = await axios.get(`${import.meta.env.VITE_API_URL}/${endpoint}`, {
            headers: { Authorization: `Bearer ${refreshToken}` },
          });
          return res.data.data.length;
        } catch (refreshError) {
          // Jika refreshToken juga kadaluarsa
          toast(
            (t) => (
              <ModalConfirmation
                message="Masa aktif token sudah habis. Silakan login kembali."
                onConfirm={() => {
                  Cookies.remove("accessToken");
                  Cookies.remove("refreshToken");
                  toast.dismiss(t.id);
                  window.location.reload(); // Refresh halaman untuk login ulang
                }}
              />
            ),
            { duration: 0 } // Toast tetap muncul sampai ada aksi
          );
        }
      } else {
        // Jika refreshToken tidak ada, minta user untuk login ulang
        toast(
          (t) => (
            <ModalConfirmation
              message="Masa aktif token sudah habis. Silakan login kembali."
              onConfirm={() => {
                Cookies.remove("accessToken");
                Cookies.remove("refreshToken");
                toast.dismiss(t.id);
                window.location.reload(); // Refresh halaman untuk login ulang
              }}
            />
          ),
          { duration: 0 }
        );
      }
    } else {
      console.error(`Failed to fetch ${endpoint}`, error);
      throw new Error(`Failed to fetch ${endpoint} data.`);
    }
  }
};
