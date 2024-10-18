import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";

export const ResultContext = createContext();

export const ResultProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = Cookies.get("Token");
  const location = useLocation();

  // Fetch results data from API
  useEffect(() => {
    const fetchResults = async () => {
      if (!token || location.pathname !== "/results") {
        setLoading(false);
        return; // Tidak fetch data jika token tidak ada atau bukan di halaman /results
      }

      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/results`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log(response.data); // Debugging untuk melihat data yang diterima
        setResults(response.data.data || []); // Menangani jika data tidak ada
        setError(null);
      } catch (error) {
        setError("Failed to fetch results data.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [token, location.pathname]); // Tambahkan dependency untuk memantau perubahan

  // Delete result
  const deleteResult = async (id) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/results/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.status === "success") {
        setResults((prev) => prev.filter((result) => result.result_id !== id));
        setError(null);
      } else {
        setError(response.data.message); // Jika ada error dari server
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message); // Menampilkan pesan error dari server
      } else {
        setError("Failed to delete result."); // Pesan default jika tidak ada pesan dari server
      }
      console.error(err);
    }
  };

  return (
    <ResultContext.Provider
      value={{
        results,
        loading,
        error,
        deleteResult,
      }}
    >
      {children}
    </ResultContext.Provider>
  );
};

// Menambahkan propTypes untuk validasi properti
ResultProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
