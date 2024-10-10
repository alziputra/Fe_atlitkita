import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";

export const AthleteContext = createContext();

export const AthleteProvider = ({ children }) => {
  AthleteProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  const [athletes, setAthletes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const token = Cookies.get("accessToken");

  // fetch athletes data from API
  useEffect(() => {
    const fetchAthletes = async () => {
      if (!token || location.pathname !== "/athletes") {
        setLoading(false);
        return; // Tidak fetch data jika token tidak ada atau bukan di halaman /athletes
      }

      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/athletes`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAthletes(response.data.data);
        setError(null); // Bersihkan error jika sukses
      } catch (error) {
        setError("Failed to fetch athletes data.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAthletes();
  }, [token, location.pathname]); // Tambahkan location.pathname sebagai dependency untuk memantau halaman aktif

  // Add new athlete
  const addAthlete = async (athlete) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/athletes`, athlete, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const newAthlete = response.data.data;

      if (!newAthlete.athlete_id) {
        throw new Error("Athlete ID is missing in response");
      }

      setAthletes((prev) => [...prev, newAthlete]); // Tambahkan data baru ke list atlet
      setError(null); // Bersihkan error jika sukses
    } catch (err) {
      setError("Failed to add athlete.");
      console.error(err);
    }
  };

  // Edit athlete
  const editAthlete = async (id, updatedAthlete) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/athletes/${id}`, updatedAthlete, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAthletes((prev) =>
        prev.map(
          (athlete) => (athlete.athlete_id === id ? { ...athlete, ...updatedAthlete } : athlete) // Update data berdasarkan athlete_id
        )
      );
      setError(null); // Bersihkan error jika sukses
    } catch (err) {
      setError("Failed to update athlete.");
      console.error(err);
    }
  };

  // Delete athlete
  const deleteAthlete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/athletes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAthletes((prev) => prev.filter((athlete) => athlete.athlete_id !== id)); // Hapus data berdasarkan athlete_id
      setError(null); // Bersihkan error jika sukses
    } catch (err) {
      setError("Failed to delete athlete.");
      console.error(err);
    }
  };

  return (
    <AthleteContext.Provider
      value={{
        athletes,
        loading,
        error,
        addAthlete,
        editAthlete,
        deleteAthlete,
      }}
    >
      {children}
    </AthleteContext.Provider>
  );
};
