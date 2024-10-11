import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";

export const CompetitionContext = createContext();

export const CompetitionProvider = ({ children }) => {
  CompetitionProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
  
  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = Cookies.get("accessToken");
  const location = useLocation();

  // Fetch competitions data from API
  useEffect(() => {
    const fetchCompetitions = async () => {
      if (!token || location.pathname !== "/competitions") {
        setLoading(false);
        return; // Tidak fetch data jika token tidak ada atau bukan di halaman /competitions
      }

      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/competitions`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCompetitions(response.data.data); // Ambil data kompetisi dari server
        setError(null); // Bersihkan error jika sukses
      } catch (error) {
        setError("Failed to fetch competitions data.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompetitions();
  }, [token, location.pathname]); // Tambahkan location.pathname sebagai dependency untuk memantau halaman aktif

  // Add new competition
  const addCompetition = async (competition) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/competitions`, competition, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const newCompetition = response.data.data;

      if (!newCompetition.competition_id) {
        throw new Error("Competition ID is missing in response");
      }

      setCompetitions((prev) => [...prev, newCompetition]); // Tambahkan data baru ke list kompetisi
      setError(null); // Bersihkan error jika sukses
    } catch (err) {
      setError("Failed to add competition.");
      console.error(err);
    }
  };

  // Edit competition
  const editCompetition = async (id, updatedCompetition) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/competitions/${id}`, updatedCompetition, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCompetitions((prev) => prev.map((competition) => (competition.competition_id === id ? { ...competition, ...updatedCompetition } : competition)));
      setError(null); // Bersihkan error jika sukses
    } catch (err) {
      setError("Failed to update competition.");
      console.error(err);
    }
  };

  // Delete competition
  const deleteCompetition = async (id) => {
    try {
      // Kirim permintaan DELETE ke server
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/competitions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Cek status di dalam respons server
      if (response.data.status === "success") {
        // Jika penghapusan berhasil, hapus data dari state
        setCompetitions((prev) => prev.filter((competition) => competition.competition_id !== id));
        setError(null); // Bersihkan error jika sukses
      } else if (response.data.status === "error") {
        // Jika server mengembalikan status error, set pesan error dari server
        setError(response.data.message); // Gunakan pesan error dari server
      }
    } catch (err) {
      // Tangani jika terjadi error lain (misalnya, kegagalan jaringan atau status bukan 200)
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message); // Tampilkan pesan error dari server
      } else {
        setError("Failed to delete competition."); // Pesan default jika tidak ada pesan dari server
      }
      console.error(err);
    }
  };

  return (
    <CompetitionContext.Provider
      value={{
        competitions,
        loading,
        error,
        addCompetition,
        editCompetition,
        deleteCompetition,
      }}
    >
      {children}
    </CompetitionContext.Provider>
  );
};
