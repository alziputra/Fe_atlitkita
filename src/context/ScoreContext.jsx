import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {
  const [matches, setMatches] = useState([]); // Data pertandingan
  const [selectedMatchNumber, setSelectedMatchNumber] = useState(null); // Nomor pertandingan yang dipilih
  const [athlete1Scores, setAthlete1Scores] = useState({
    kick_score: 0,
    punch_score: 0,
    elbow_score: 0,
    knee_score: 0,
    throw_score: 0,
  }); // Skor untuk athlete1
  const [athlete2Scores, setAthlete2Scores] = useState({
    kick_score: 0,
    punch_score: 0,
    elbow_score: 0,
    knee_score: 0,
    throw_score: 0,
  }); // Skor untuk athlete2
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = Cookies.get("Token");

  // Fetch data matches dari API
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
        setMatches(response.data.data || []); // Ambil data dari response
        setError(null);
      } catch (error) {
        setError("Gagal memuat data pertandingan.");
        console.error(error);
      } finally {
        setLoading(false); // Setelah loading selesai
      }
    };

    fetchMatches();
  }, [token]);

  // Fungsi untuk menangani perubahan skor athlete1
  const handleAthlete1ScoreChange = (scoreType, value) => {
    setAthlete1Scores((prevScores) => ({
      ...prevScores,
      [scoreType]: value,
    }));
  };

  // Fungsi untuk menangani perubahan skor athlete2
  const handleAthlete2ScoreChange = (scoreType, value) => {
    setAthlete2Scores((prevScores) => ({
      ...prevScores,
      [scoreType]: value,
    }));
  };

  // Fungsi untuk mengirim penilaian ke server
  const submitScores = async (athleteId, scores) => {
    const selectedMatch = matches.find((match) => match.match_number === selectedMatchNumber);

    if (!selectedMatch || !athleteId) {
      toast.error("Pilih nomor pertandingan dan atlet terlebih dahulu.");
      return;
    }

    const body = {
      match_id: selectedMatch.match_id, // Gunakan match_id dari match yang dipilih
      judge_id: 4, // Asumsikan ID juri (misal dari context user)
      athlete_id: athleteId,
      ...scores,
    };

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
        loading,
        error,
      }}
    >
      {children}
    </ScoreContext.Provider>
  );
};

// Menambahkan propTypes untuk validasi properti
ScoreProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
