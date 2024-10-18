import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";

export const MatchContext = createContext();

export const MatchProvider = ({ children }) => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = Cookies.get("Token"); // Mengganti accessToken dengan Token
  const location = useLocation();

  // Fetch matches data from API
  useEffect(() => {
    // Hanya panggil fetchMatches jika token tersedia dan user berada di halaman /matches
    if (!token || location.pathname !== "/matches") {
      setLoading(false);
      return; // Tidak fetch data jika token tidak ada atau bukan di halaman /matches
    }

    const fetchMatches = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/matches`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMatches(response.data.data || []); // Ambil data dari response
        setError(null); // Reset error jika sukses
      } catch (error) {
        setError("Failed to fetch matches data.");
        console.error(error);
      } finally {
        setLoading(false); // Matikan loading setelah fetch selesai
      }
    };

    fetchMatches();
  }, [token, location.pathname]); // Pastikan token dan pathname sesuai sebelum memanggil useEffect

  // Add new match
  const addMatch = async (matchData) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/matches`, matchData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const newMatch = response.data.data;

      if (!newMatch.match_id) {
        throw new Error("Match ID is missing in response");
      }

      setMatches((prev) => [...prev, newMatch]); // Tambahkan pertandingan baru ke state
      setError(null);
    } catch (error) {
      setError("Failed to add match.");
      console.error(error);
    }
  };

  // Edit match
  const editMatch = async (id, updatedMatch) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/matches/${id}`, updatedMatch, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMatches(
        (prev) => prev.map((match) => (match.match_id === id ? { ...match, ...updatedMatch } : match)) // Perbarui match
      );
      setError(null);
    } catch (error) {
      setError("Failed to update match.");
      console.error(error);
    }
  };

  // Delete match
  const deleteMatch = async (id) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/matches/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.status === "success") {
        setMatches((prev) => prev.filter((match) => match.match_id !== id));
        setError(null);
      } else if (response.data.status === "error") {
        setError(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Failed to delete match.");
      }
      console.error(error);
    }
  };

  return (
    <MatchContext.Provider
      value={{
        matches,
        loading,
        error,
        addMatch,
        editMatch,
        deleteMatch,
      }}
    >
      {children}
    </MatchContext.Provider>
  );
};

// Menambahkan propTypes untuk validasi properti
MatchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
