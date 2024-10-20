import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {
  const [matches, setMatches] = useState([]); // Data pertandingan
  const [selectedCompetition, setSelectedCompetition] = useState(null); // Kompetisi yang dipilih
  const [selectedAthlete, setSelectedAthlete] = useState(null); // Atlet yang dipilih
  const [scores, setScores] = useState({
    kick_score: 0,
    punch_score: 0,
    elbow_score: 0,
    knee_score: 0,
    throw_score: 0,
  }); // Skor yang akan diberikan
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

  // Fungsi untuk menangani perubahan skor
  const handleScoreChange = (scoreType, value) => {
    setScores((prevScores) => ({
      ...prevScores,
      [scoreType]: value,
    }));
  };

  // Fungsi untuk mengirim penilaian ke server
  const submitScores = async (athleteId) => {
    if (!selectedCompetition || !athleteId) {
      toast.error("Pilih pertandingan dan atlet terlebih dahulu.");
      return;
    }

    const body = {
      match_id: selectedCompetition,
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
        selectedCompetition,
        setSelectedCompetition,
        selectedAthlete,
        setSelectedAthlete,
        scores,
        handleScoreChange,
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
