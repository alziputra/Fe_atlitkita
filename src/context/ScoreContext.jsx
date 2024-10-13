import { createContext, useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";

const ScoreContext = createContext();

const ScoreProvider = ({ children }) => {
  const [scores, setScores] = useState([]);
  const [athletes, setAthletes] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  const fetchData = async (endpoint, setData) => {
    const token = Cookies.get("accessToken");
    if (!token) return;

    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/${endpoint}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(response.data.data);
      setError(null);
    } catch (error) {
      if (error.response) {
        setError(`Failed to fetch ${endpoint} data: ${error.response.data.message || error.message}`);
      } else {
        setError(`Network error: Failed to fetch ${endpoint} data.`);
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch scores, athletes, and matches data from API
  useEffect(() => {
    if (location.pathname === "/scores") {
      fetchData("scores", setScores);
    }
    fetchData("athletes", setAthletes);
    fetchData("matches", setMatches);
  }, [location.pathname]);

  // Add new score
  const addScore = async (score) => {
    const token = Cookies.get("accessToken");
    if (!token) {
      setError("Authentication required.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/scores`, score, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const newScore = response.data.data;

      if (!newScore || !newScore.score_id) {
        throw new Error("Score ID is missing in response");
      }

      setScores((prev) => [...prev, newScore]);
      setError(null);
    } catch (error) {
      if (error.response) {
        setError(`Failed to add score: ${error.response.data.message || error.message}`);
      } else {
        setError("Network error: Failed to add score.");
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return <ScoreContext.Provider value={{ scores, athletes, matches, loading, error, addScore }}>{children}</ScoreContext.Provider>;
};

ScoreProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook to use the ScoreContext
const useScore = () => {
  const context = useContext(ScoreContext);
  if (!context) {
    throw new Error("useScore must be used within a ScoreProvider");
  }
  return context;
};

export { ScoreContext, ScoreProvider, useScore };
