// src/context/ScoreContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Cookies from "js-cookie";

const ScoreContext = createContext();

export const useScore = () => {
  return useContext(ScoreContext);
};

export const ScoreProvider = ({ children }) => {
  const [data, setData] = useState({
    athletes: [],
    competitions: [],
    scores: [],
    loading: false,
    error: null,
  });

  // Function to fetch data from API
  const fetchData = async (endpoint, key) => {
    const token = Cookies.get("Token");
    if (!token) {
      setData((prevData) => ({
        ...prevData,
        error: "Token is missing",
      }));
      return;
    }

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData((prevData) => ({
        ...prevData,
        [key]: response.data.data, // Assuming data is in response.data.data
      }));
    } catch (err) {
      setData((prevData) => ({
        ...prevData,
        error: err.message,
      }));
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      setData((prevData) => ({ ...prevData, loading: true }));
      await fetchData("scores", "scores");
      await fetchData("athletes", "athletes");
      await fetchData("competitions", "competitions");
      setData((prevData) => ({ ...prevData, loading: false }));
    };

    fetchAllData();
  }, []);
  return <ScoreContext.Provider value={{ ...data }}>{children}</ScoreContext.Provider>;
};

ScoreProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
