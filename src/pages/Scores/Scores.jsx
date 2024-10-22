import { useContext, useState } from "react";
import { ScoreContext } from "../../context/ScoreContext";
import ScoreInput from "./ScoreInput";
import toast from "react-hot-toast";

const Scores = () => {
  const { matches, selectedMatchNumber, setSelectedMatchNumber, athlete1Scores, athlete2Scores, handleAthlete1ScoreChange, handleAthlete2ScoreChange, submitScores, submitMatchResults, loading, error } = useContext(ScoreContext);

  const [showScoring, setShowScoring] = useState(false);
  const [submissionMessages, setSubmissionMessages] = useState({ athlete1: "", athlete2: "" });
  const [resultsMessage, setResultsMessage] = useState("");

  const selectedMatch = matches.find((match) => match.match_number === selectedMatchNumber);

  const startScoring = () => {
    if (!selectedMatch) {
      toast.error("Pilih pertandingan terlebih dahulu.");
      return;
    }
    setShowScoring(true);
  };

  const handleSubmitScores = async (athleteId, scores, athlete) => {
    try {
      await submitScores(athleteId, scores);
      setSubmissionMessages((prev) => ({ ...prev, [athlete]: "Skor berhasil disimpan." }));
    } catch {
      setSubmissionMessages((prev) => ({ ...prev, [athlete]: "Gagal menyimpan skor." }));
    }
  };

  const handleSubmitMatchResults = async () => {
    if (selectedMatch) {
      await submitMatchResults(selectedMatch.match_id);
      setResultsMessage("Hasil penilaian berhasil disimpan.");
    }
  };

  const scoreTypes = ["kick_score", "punch_score", "elbow_score", "knee_score", "throw_score"];

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white border-2 border-black shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Penilaian Juri</h2>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="mb-4">
          <label className="block font-bold mb-2">Pilih Nomor Pertandingan</label>
          <select value={selectedMatchNumber || ""} onChange={(e) => setSelectedMatchNumber(e.target.value)} className="select select-bordered w-full">
            <option value="" disabled>
              Pilih Nomor Pertandingan
            </option>
            {matches.map((match) => (
              <option key={match.match_id} value={match.match_number}>
                Nomor {match.match_number}
              </option>
            ))}
          </select>
        </div>

        {selectedMatch && (
          <div className="mb-4">
            <div className="mb-4">
              <label className="block text-sm md:text-base font-semibold mb-1">Kompetisi</label>
              <input type="text" value={selectedMatch.competition_name} readOnly className="w-full p-2 border rounded-lg text-sm md:text-base" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm md:text-base font-semibold mb-1">Atlet 1</label>
                <input type="text" value={selectedMatch.athlete1_name} readOnly className="w-full p-2 border rounded-lg text-sm md:text-base" />
              </div>
              <div>
                <label className="block text-sm md:text-base font-semibold mb-1">Atlet 2</label>
                <input type="text" value={selectedMatch.athlete2_name} readOnly className="w-full p-2 border rounded-lg text-sm md:text-base" />
              </div>
            </div>
          </div>
        )}

        {selectedMatch && (
          <button className="btn btn-primary w-full" onClick={startScoring}>
            Mulai Penilaian
          </button>
        )}

        {/* Scoring Input Section */}
        {showScoring && selectedMatch && (
          <div className="mt-6 grid grid-cols-2 gap-4">
            <ScoreInput
              athleteName={selectedMatch.athlete1_name}
              scores={athlete1Scores}
              handleScoreChange={handleAthlete1ScoreChange}
              handleSubmitScores={(id, scores) => handleSubmitScores(id, scores, "athlete1")}
              submissionMessage={submissionMessages.athlete1}
              athleteId={selectedMatch.athlete1_id}
              scoreTypes={scoreTypes}
            />

            <ScoreInput
              athleteName={selectedMatch.athlete2_name}
              scores={athlete2Scores}
              handleScoreChange={handleAthlete2ScoreChange}
              handleSubmitScores={(id, scores) => handleSubmitScores(id, scores, "athlete2")}
              submissionMessage={submissionMessages.athlete2}
              athleteId={selectedMatch.athlete2_id}
              scoreTypes={scoreTypes}
            />
          </div>
        )}

        {/* Button to submit final results */}
        {showScoring && selectedMatch && (
          <button className="btn btn-success w-full mt-6" onClick={handleSubmitMatchResults}>
            Simpan Hasil Penilaian
          </button>
        )}
        {resultsMessage && <p className="text-green-600 mt-2">{resultsMessage}</p>}
      </div>
    </div>
  );
};

export default Scores;
