// src/pages/Scores/Scores.jsx
import { useEffect, useState } from "react";
import { useScore } from "../../context/ScoreContext";
import toast from "react-hot-toast";

const Scores = () => {
  const { matches, scores, error } = useScore();
  const [selectedCompetition, setSelectedCompetition] = useState("");
  const [selectedAthlete, setSelectedAthlete] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // Handle competition selection
  const handleCompetitionChange = (e) => {
    setSelectedCompetition(e.target.value);
    setSelectedAthlete("");
    console.log("Selected competition:", e.target.value);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Penilaian Atlet</h2>

        {/* Select Competition */}
        <div className="mb-4">
          <label className="block font-bold mb-2">Pilih Pertandingan</label>
          <select value={selectedCompetition} onChange={handleCompetitionChange} className="select select-bordered w-full">
            <option value="" disabled>
              Pilih Pertandingan
            </option>
            {matches
              .filter((match, index, self) => index === self.findIndex((m) => m.competition_id === match.competition_id))
              .map((match) => (
                <option key={match.competition_id} value={match.competition_id}>
                  {match.competition_name}
                </option>
              ))}
          </select>
        </div>

        {/* Select Athletes */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block font-bold mb-2">Pilih Atlet</label>
            <select
              value={selectedAthlete}
              onChange={(e) => setSelectedAthlete(e.target.value)}
              className="select select-bordered w-full"
              disabled={!selectedCompetition} // Disable if no competition is selected
            >
              <option value="" disabled>
                Pilih Atlet
              </option>
              {matches
                .filter((match) => match.competition_id.toString() === selectedCompetition) // Filter atlet berdasarkan kompetisi yang dipilih
                .map((match) => (
                  <option key={match.athlete1_id} value={match.athlete1_id}>
                    {match.athlete1_name} VS {match.athlete2_name}
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
            <strong>Atlet Biru:</strong> {selectedAthlete ? selectedAthlete : "Belum dipilih"}
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
    </div>
  );
};

export default Scores;
