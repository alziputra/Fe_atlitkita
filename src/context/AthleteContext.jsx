import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";

export const AthleteContext = createContext();

export const AthleteProvider = ({ children }) => {
  const [athletes, setAthletes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const token = Cookies.get("Token"); // Ambil token dari cookie

  // Fetch athletes data from API
  useEffect(() => {
    const fetchAthletes = async () => {
      if (!token) {
        setError("Token tidak tersedia.");
        setLoading(false);
        return; // Tidak fetch data jika token tidak ada
      }
      if (location.pathname !== "/athletes") {
        setLoading(false);
        return; // Hanya fetch data jika berada di halaman /athletes
      }

      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/athletes`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAthletes(response.data.data || []); // Ambil data dari response
        setError(null); // Bersihkan error jika sukses
      } catch (error) {
        setError("Failed to fetch athletes data.");
        console.error("Fetch error:", error);
      } finally {
        setLoading(false); // Matikan loading setelah selesai
      }
    };

    fetchAthletes();
  }, [token, location.pathname]); // Tambahkan token dan lokasi sebagai dependency

  // Add new athlete
  const addAthlete = async (athlete) => {
    if (!token) {
      setError("Token tidak tersedia.");
      return;
    }
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/athletes`, athlete, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const newAthlete = response.data.data;

      if (!newAthlete.athlete_id) {
        throw new Error("Athlete ID is missing in response");
      }

      setAthletes((prev) => [...prev, newAthlete]); // Tambahkan atlet baru ke state
      setError(null); // Bersihkan error jika sukses
    } catch (err) {
      setError("Failed to add athlete.");
      console.error("Add error:", err);
    }
  };

  // Edit athlete
  const editAthlete = async (id, updatedAthlete) => {
    if (!token) {
      setError("Token tidak tersedia.");
      return;
    }
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
      console.error("Update error:", err);
    }
  };

  // Delete athlete
  const deleteAthlete = async (id) => {
    if (!token) {
      setError("Token tidak tersedia.");
      return;
    }
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/athletes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.status === "success") {
        setAthletes((prev) => prev.filter((athlete) => athlete.athlete_id !== id)); // Hapus atlet dari state
        setError(null); // Bersihkan error jika sukses
      } else if (response.data.status === "error") {
        setError(response.data.message); // Gunakan pesan error dari server
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message); // Pesan error dari server
      } else {
        setError("Failed to delete athlete."); // Pesan default jika tidak ada pesan dari server
      }
      console.error("Delete error:", err);
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

// Menambahkan propTypes untuk validasi properti
AthleteProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
