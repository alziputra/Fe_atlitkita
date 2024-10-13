import { useNavigate } from "react-router-dom";
import { useScore } from "../../context/ScoreContext";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const Scores = () => {
  const navigate = useNavigate();
  const { athletes, matches, error } = useScore();
  const [selectedMatch, setSelectedMatch] = useState("");
  const [selectedAthleteBlue, setSelectedAthleteBlue] = useState("");
  const [selectedAthleteRed, setSelectedAthleteRed] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleStartScoring = async () => {
    if (!selectedMatch || !selectedAthleteBlue || !selectedAthleteRed) {
      toast.error("Pilih pertandingan dan kedua atlet terlebih dahulu.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/scores`,
        {
          match_id: selectedMatch,
          athlete_blue_id: selectedAthleteBlue,
          athlete_red_id: selectedAthleteRed,
        },
        {
          headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
        }
      );

      toast.success(response.data.message);
      navigate("/results");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to start scoring.");
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Penilaian Atlet</h2>

      <div className="mb-4">
        <label className="block font-bold mb-2">Pilih Pertandingan</label>
        <select
          value={selectedMatch}
          onChange={(e) => {
            const selectedMatchId = parseInt(e.target.value); // Pastikan ID di-convert ke angka
            setSelectedMatch(selectedMatchId); // Update state dengan ID pertandingan yang dipilih

            // Temukan detail pertandingan berdasarkan ID
            const selectedMatch = matches.find((match) => match.match_id === selectedMatchId);

            if (selectedMatch) {
              console.log("Pertandingan yang dipilih:", selectedMatch.match_name); // Cetak nama pertandingan yang dipilih
            } else {
              console.log("Pertandingan tidak ditemukan");
            }
          }}
          className="select select-bordered w-full"
        >
          <option value="" disabled>
            Pilih Pertandingan
          </option>
          {matches.map((match) => (
            <option key={match.match_id} value={match.match_id}>
              {match.match_name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block font-bold mb-2">Pilih Atlet Biru</label>
          <select value={selectedAthleteBlue} onChange={(e) => setSelectedAthleteBlue(e.target.value)} className="select select-bordered w-full">
            <option value="" disabled>
              Pilih Atlet
            </option>
            {athletes.map((athlete) => (
              <option key={athlete.athlete_id} value={athlete.athlete_id}>
                {athlete.athlete_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-bold mb-2">Pilih Atlet Merah</label>
          <select value={selectedAthleteRed} onChange={(e) => setSelectedAthleteRed(e.target.value)} className="select select-bordered w-full">
            <option value="" disabled>
              Pilih Atlet
            </option>
            {athletes.map((athlete) => (
              <option key={athlete.athlete_id} value={athlete.athlete_id}>
                {athlete.athlete_name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button className="btn btn-primary w-full" onClick={handleStartScoring}>
        Nilai Atlet
      </button>
    </div>
  );
};

export default Scores;
