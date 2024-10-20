import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";

export const CompetitionContext = createContext();

export const CompetitionProvider = ({ children }) => {
  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = Cookies.get("Token"); // Ambil token dari cookie
  const location = useLocation();

  // Fetch competitions data from API
  useEffect(() => {
    const fetchCompetitions = async () => {
      if (!token) {
        setError("Token tidak tersedia.");
        setLoading(false);
        return; // Tidak fetch data jika token tidak ada
      }
      if (location.pathname !== "/competitions") {
        setLoading(false);
        return; // Hanya fetch data jika berada di halaman /competitions
      }

      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/competitions`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCompetitions(response.data.data || []); // Ambil data dari response
        setError(null); // Bersihkan error jika sukses
      } catch (error) {
        setError("Failed to fetch competitions data.");
        console.error("Fetch error:", error);
      } finally {
        setLoading(false); // Selesai fetch, matikan loading
      }
    };

    fetchCompetitions();
  }, [token, location.pathname]); // Tambahkan lokasi untuk memantau halaman

  // Add new competition
  const addCompetition = async (competition) => {
    if (!token) {
      setError("Token tidak tersedia.");
      return;
    }
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/competitions`, competition, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const newCompetition = response.data.data;

      if (!newCompetition.competition_id) {
        throw new Error("Competition ID is missing in response");
      }

      setCompetitions((prev) => [...prev, newCompetition]); // Tambahkan data baru ke state
      setError(null); // Bersihkan error jika sukses
    } catch (err) {
      setError("Failed to add competition.");
      console.error("Add error:", err);
    }
  };

  // Edit competition
  const editCompetition = async (id, updatedCompetition) => {
    if (!token) {
      setError("Token tidak tersedia.");
      return;
    }
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/competitions/${id}`, updatedCompetition, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCompetitions((prev) => prev.map((competition) => (competition.competition_id === id ? { ...competition, ...updatedCompetition } : competition)));
      setError(null); // Bersihkan error jika sukses
    } catch (err) {
      setError("Failed to update competition.");
      console.error("Update error:", err);
    }
  };

  // Delete competition
  const deleteCompetition = async (id) => {
    if (!token) {
      setError("Token tidak tersedia.");
      return;
    }
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/competitions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.status === "success") {
        setCompetitions((prev) => prev.filter((competition) => competition.competition_id !== id));
        setError(null); // Bersihkan error jika sukses
      } else if (response.data.status === "error") {
        setError(response.data.message); // Jika error dari server
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message); // Tampilkan pesan error dari server
      } else {
        setError("Failed to delete competition."); // Pesan default jika tidak ada pesan dari server
      }
      console.error("Delete error:", err);
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

// Menambahkan propTypes untuk validasi properti
CompetitionProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
