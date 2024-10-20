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
  const token = Cookies.get("Token"); // Mengambil token
  const location = useLocation();

  useEffect(() => {
    // Pastikan token ada dan halaman sesuai sebelum memulai fetching
    if (!token) {
      setError("Token tidak tersedia.");
      setLoading(false);
      return;
    }
    if (location.pathname !== "/matches") {
      setLoading(false);
      return;
    }

    const fetchMatches = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/matches`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMatches(response.data.data || []); // Pastikan selalu ada default data
        setError(null); // Reset error setelah sukses
      } catch (error) {
        setError("Failed to fetch matches data.");
        console.error("Fetch error:", error);
      } finally {
        setLoading(false); // Set loading selesai setelah fetch
      }
    };

    fetchMatches();
  }, [token, location.pathname]);

  // Fungsi untuk menambah match baru
  const addMatch = async (matchData) => {
    if (!token) {
      setError("Token tidak tersedia.");
      return;
    }
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/matches`, matchData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const newMatch = response.data.data;

      if (!newMatch.match_id) {
        throw new Error("Match ID is missing in response");
      }

      setMatches((prev) => [...prev, newMatch]); // Tambahkan match baru ke state
      setError(null);
    } catch (error) {
      setError("Failed to add match.");
      console.error("Add error:", error);
    }
  };

  // Fungsi untuk mengedit match
  const editMatch = async (id, updatedMatch) => {
    if (!token) {
      setError("Token tidak tersedia.");
      return;
    }
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/matches/${id}`, updatedMatch, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMatches((prev) => prev.map((match) => (match.match_id === id ? { ...match, ...updatedMatch } : match)));
      setError(null);
    } catch (error) {
      setError("Failed to update match.");
      console.error("Update error:", error);
    }
  };

  // Fungsi untuk menghapus match
  const deleteMatch = async (id) => {
    if (!token) {
      setError("Token tidak tersedia.");
      return;
    }
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
      console.error("Delete error:", error);
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

MatchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
