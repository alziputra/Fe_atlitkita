import { createContext, useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

export const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [matches, setMatches] = useState([]);
  const [selectedMatchNumber, setSelectedMatchNumber] = useState(null);
  const [athlete1Scores, setAthlete1Scores] = useState({
    kick_score: 0,
    punch_score: 0,
    elbow_score: 0,
    knee_score: 0,
    throw_score: 0,
  });
  const [athlete2Scores, setAthlete2Scores] = useState({
    kick_score: 0,
    punch_score: 0,
    elbow_score: 0,
    knee_score: 0,
    throw_score: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = Cookies.get("Token");

  const scoreWeights = {
    kick_score: 2,
    punch_score: 1,
    elbow_score: 1,
    knee_score: 2,
    throw_score: 3,
  };

  useEffect(() => {
    const fetchMatches = async () => {
      if (!token) {
        setError("Token tidak tersedia.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/matches`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMatches(response.data.data || []);
        setError(null);
      } catch (error) {
        setError("Gagal memuat data pertandingan.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [token]);

  const handleAthlete1ScoreChange = (scoreType, increment) => {
    setAthlete1Scores((prevScores) => ({
      ...prevScores,
      [scoreType]: Math.max(0, prevScores[scoreType] + increment),
    }));
  };

  const handleAthlete2ScoreChange = (scoreType, increment) => {
    setAthlete2Scores((prevScores) => ({
      ...prevScores,
      [scoreType]: Math.max(0, prevScores[scoreType] + increment),
    }));
  };

  // Function to submit match results to /api/results
  const submitMatchResults = async (matchId) => {
    if (!matchId) {
      toast.error("Pilih pertandingan terlebih dahulu.");
      return;
    }

    const body = { match_id: matchId };

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/results`, body, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Hasil penilaian berhasil disimpan.");
    } catch (error) {
      toast.error("Gagal menyimpan hasil penilaian.");
      console.error(error);
    }
  };

  const submitScores = async (athleteId, scores) => {
    const selectedMatch = matches.find((match) => match.match_number === selectedMatchNumber);

    if (!selectedMatch || !athleteId) {
      toast.error("Pilih nomor pertandingan dan atlet terlebih dahulu.");
      return;
    }

    const weightedScores = {
      kick_score: scores.kick_score * scoreWeights.kick_score,
      punch_score: scores.punch_score * scoreWeights.punch_score,
      elbow_score: scores.elbow_score * scoreWeights.elbow_score,
      knee_score: scores.knee_score * scoreWeights.knee_score,
      throw_score: scores.throw_score * scoreWeights.throw_score,
    };

    const body = {
      match_id: selectedMatch.match_id,
      judge_id: user?.id,
      athlete_id: athleteId,
      ...weightedScores,
    };

    console.log("Data yang dikirim ke server:", body);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/scores`, body, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Penilaian berhasil dikirim!");
    } catch (error) {
      toast.error("Gagal mengirim penilaian.");
      console.error(error);
    }
  };

  return (
    <ScoreContext.Provider
      value={{
        matches,
        selectedMatchNumber,
        setSelectedMatchNumber,
        athlete1Scores,
        athlete2Scores,
        handleAthlete1ScoreChange,
        handleAthlete2ScoreChange,
        submitScores,
        submitMatchResults, // New function added here
        loading,
        error,
      }}
    >
      {children}
    </ScoreContext.Provider>
  );
};

ScoreProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
