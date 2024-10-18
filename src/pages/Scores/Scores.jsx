// src/pages/Scores/Scores.jsx
import { useEffect, useState } from "react";
import { useScore } from "../../context/ScoreContext";
import toast from "react-hot-toast";

const Scores = () => {
  const { athletes, competitions, scores, error } = useScore();
  const [selectedCompetition, setSelectedCompetition] = useState("");
  const [selectedAthleteBlue, setSelectedAthleteBlue] = useState("");
  const [selectedAthleteRed, setSelectedAthleteRed] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // Handle competition selection
  const handleCompetitionChange = (e) => {
    setSelectedCompetition(e.target.value);
    setSelectedAthleteBlue(""); // Reset selected athlete blue
    setSelectedAthleteRed(""); // Reset selected athlete red
  };

  // Filter athletes based on team
  const athletesBlueTeam = athletes.filter((athlete) => athlete.team === "Biru");
  const athletesRedTeam = athletes.filter((athlete) => athlete.team === "Merah");

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Penilaian Atlet</h2>

      {/* Select Competition */}
      <div className="mb-4">
        <label className="block font-bold mb-2">Pilih Pertandingan</label>
        <select value={selectedCompetition} onChange={handleCompetitionChange} className="select select-bordered w-full">
          <option value="" disabled>
            Pilih Pertandingan
          </option>
          {competitions.map((competition) => (
            <option key={competition.competition_id} value={competition.competition_id}>
              {competition.competition_name}
            </option>
          ))}
        </select>
      </div>

      {/* Select Athletes */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block font-bold mb-2">Pilih Atlet Biru</label>
          <select
            value={selectedAthleteBlue}
            onChange={(e) => setSelectedAthleteBlue(e.target.value)}
            className="select select-bordered w-full"
            disabled={!selectedCompetition} // Disable if no competition is selected
          >
            <option value="" disabled>
              Pilih Atlet
            </option>
            {athletesBlueTeam.map((athlete) => (
              <option key={athlete.athlete_id} value={athlete.athlete_id}>
                {athlete.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-bold mb-2">Pilih Atlet Merah</label>
          <select
            value={selectedAthleteRed}
            onChange={(e) => setSelectedAthleteRed(e.target.value)}
            className="select select-bordered w-full"
            disabled={!selectedCompetition} // Disable if no competition is selected
          >
            <option value="" disabled>
              Pilih Atlet
            </option>
            {athletesRedTeam.map((athlete) => (
              <option key={athlete.athlete_id} value={athlete.athlete_id}>
                {athlete.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Display Selected Choices */}
      <div className="mb-4">
        <h3 className="text-xl font-bold mb-4">Pilihan Anda:</h3>
        <p>
          <strong>Pertandingan:</strong> {selectedCompetition ? selectedCompetition : "Belum dipilih"}
        </p>
        <p>
          <strong>Atlet Biru:</strong> {selectedAthleteBlue ? selectedAthleteBlue : "Belum dipilih"}
        </p>
        <p>
          <strong>Atlet Merah:</strong> {selectedAthleteRed ? selectedAthleteRed : "Belum dipilih"}
        </p>
      </div>

      {/* Render Skor dan Data Lainnya */}
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
