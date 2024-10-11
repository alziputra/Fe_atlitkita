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
  const token = Cookies.get("accessToken");
  const location = useLocation();

  // Fetch results data from API
  useEffect(() => {
    const fetchResults = async () => {
      if (!token || location.pathname !== "/results") {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/results`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setResults(response.data.data);
        setError(null);
      } catch (error) {
        setError("Failed to fetch results data.");
        console.error(error);
      } finally {
        setLoading(false);
    };
    
  };
  fetchResults();
}, [token, location.pathname]);

// Add new result
const addResult = async (result) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/results`, result, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const newResult = response.data.data;
    
    if (!newResult.result_id) {
      throw new Error("Result ID is missing in response");
    }
    
    setResults((prev) => [...prev, newResult]);
    setError(null);
  } catch (err) {
    setError("Failed to add result.");
    console.error(err);
  }
};

// Edit result
const editResult = async (id, updatedResult) => {
  try {
    await axios.put(`${import.meta.env.VITE_API_URL}/results/${id}`, updatedResult, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setResults((prev) =>
      prev.map((result) =>
        result.result_id === id ? { ...result, ...updatedResult } : result
  )
);
setError(null);
} catch (err) {
  setError("Failed to update result.");
  console.error(err);
}
};

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
      setError(response.data.message);
    }
  } catch (err) {
    if (err.response && err.response.data && err.response.data.message) {
      setError(err.response.data.message);
    } else {
      setError("Failed to delete result.");
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
    addResult,
    editResult,
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