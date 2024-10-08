import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Cookies from "js-cookie";

export const AthleteContext = createContext();

export const AthleteProvider = ({ children }) => {
  AthleteProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
  const [athletes, setAthletes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = Cookies.get("accessToken");

  // Fetch data from API
  useEffect(() => {
    const fetchAthletes = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/athletes`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAthletes(response.data.data);
      } catch {
        setError("Failed to fetch athletes data.");
      } finally {
        setLoading(false);
      }
    };
    fetchAthletes();
  }, [token]);

  // Add new athlete
  const addAthlete = async (athlete) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/athletes`, athlete, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAthletes((prev) => [...prev, response.data.data]);
    } catch {
      setError("Failed to add athlete.");
    }
  };

  // Edit athlete
  const editAthlete = async (id, updatedAthlete) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/athletes/${id}`, updatedAthlete, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAthletes((prev) => prev.map((athlete) => (athlete.id === id ? updatedAthlete : athlete)));
    } catch {
      setError("Failed to update athlete.");
    }
  };

  // Delete athlete
  const deleteAthlete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/athletes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAthletes((prev) => prev.filter((athlete) => athlete.id !== id));
    } catch {
      setError("Failed to delete athlete.");
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
