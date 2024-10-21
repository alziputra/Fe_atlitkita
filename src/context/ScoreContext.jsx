import { createContext, useState, useEffect, useContext } from "react"; // Impor useContext dari react
import PropTypes from "prop-types";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext"; // Impor AuthContext untuk mengambil user

export const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {
  const { user } = useContext(AuthContext); // Ambil user dari AuthContext
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

  // Bobot poin untuk setiap jenis skor
  const scoreWeights = {
    kick_score: 2,
    punch_score: 1,
    elbow_score: 1,
    knee_score: 2,
    throw_score: 3,
  };

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

  // Fungsi untuk menangani perubahan skor athlete1 (increment/decrement by 1)
  const handleAthlete1ScoreChange = (scoreType, increment) => {
    setAthlete1Scores((prevScores) => ({
      ...prevScores,
      [scoreType]: Math.max(0, prevScores[scoreType] + increment), // Tambahkan atau kurangi 1
    }));
  };

  // Fungsi untuk menangani perubahan skor athlete2 (increment/decrement by 1)
  const handleAthlete2ScoreChange = (scoreType, increment) => {
    setAthlete2Scores((prevScores) => ({
      ...prevScores,
      [scoreType]: Math.max(0, prevScores[scoreType] + increment), // Tambahkan atau kurangi 1
    }));
  };

  // Fungsi untuk mengirim penilaian ke server
  const submitScores = async (athleteId, scores) => {
    const selectedMatch = matches.find((match) => match.match_number === selectedMatchNumber);

    if (!selectedMatch || !athleteId) {
      toast.error("Pilih nomor pertandingan dan atlet terlebih dahulu.");
      return;
    }

    // Apply weights before sending the scores
    const weightedScores = {
      kick_score: scores.kick_score * scoreWeights.kick_score,
      punch_score: scores.punch_score * scoreWeights.punch_score,
      elbow_score: scores.elbow_score * scoreWeights.elbow_score,
      knee_score: scores.knee_score * scoreWeights.knee_score,
      throw_score: scores.throw_score * scoreWeights.throw_score,
    };

    const body = {
      match_id: selectedMatch.match_id, // Gunakan match_id dari match yang dipilih
      judge_id: user?.id, // Gunakan user.id dari AuthContext sebagai judge_id, fallback jika user.id tidak ada
      athlete_id: athleteId, // ID atlet
      ...weightedScores,
    };

    // Tampilkan inputan user di konsol
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
