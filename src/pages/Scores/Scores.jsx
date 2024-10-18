// src/pages/Scores/Scores.jsx
import { useEffect, useState } from "react";
import { useScore } from "../../context/ScoreContext";
import toast from "react-hot-toast";

const Scores = () => {
  const { athletes, matches, scores, error } = useScore();
  const [selectedMatch, setSelectedMatch] = useState("");
  const [selectedAthleteBlue, setSelectedAthleteBlue] = useState("");
  const [selectedAthleteRed, setSelectedAthleteRed] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Penilaian Atlet</h2>

      <div className="mb-4">
        <label className="block font-bold mb-2">Pilih Pertandingan</label>
        <select
          value={selectedMatch}
          onChange={(e) => {
            const selectedMatchId = parseInt(e.target.value);
            setSelectedMatch(selectedMatchId);
          }}
          className="select select-bordered w-full"
        >
          <option value="" disabled>
            Pilih Pertandingan
          </option>
          {matches.map((match) => (
            <option key={match.match_id} value={match.match_id}>
              {match.competition_name} - {match.athlete1_name} vs {match.athlete2_name}
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

      <h3 className="text-xl font-bold mb-4">Skor</h3>
      {scores.length === 0 ? (
        <p>Tidak ada skor untuk ditampilkan.</p>
      ) : (
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="border px-4 py-2">Atlet</th>
              <th className="border px-4 py-2">Poin Tendangan</th>
              <th className="border px-4 py-2">Poin Pukulan</th>
              <th className="border px-4 py-2">Poin Elbow</th>
              <th className="border px-4 py-2">Poin Lutut</th>
              <th className="border px-4 py-2">Poin Lemparan</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((score) => (
              <tr key={score.score_id}>
                <td className="border px-4 py-2">{score.athlete_name}</td>
                <td className="border px-4 py-2">{score.kick_score}</td>
                <td className="border px-4 py-2">{score.punch_score}</td>
                <td className="border px-4 py-2">{score.elbow_score}</td>
                <td className="border px-4 py-2">{score.knee_score}</td>
                <td className="border px-4 py-2">{score.throw_score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Scores;
