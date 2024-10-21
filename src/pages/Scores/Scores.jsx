import { useContext, useState } from "react";
import { ScoreContext } from "../../context/ScoreContext"; // Use ScoreContext
import toast from "react-hot-toast";

const Scores = () => {
  const { matches, selectedMatchNumber, setSelectedMatchNumber, athlete1Scores, athlete2Scores, handleAthlete1ScoreChange, handleAthlete2ScoreChange, submitScores, loading, error } = useContext(ScoreContext);

  const [showScoring, setShowScoring] = useState(false); // Toggle scoring visibility
  const [submissionMessages, setSubmissionMessages] = useState({ athlete1: "", athlete2: "" }); // Submission messages

  // Get the match based on selected match_number
  const selectedMatch = matches.find((match) => match.match_number === selectedMatchNumber);

  // Start scoring process
  const startScoring = () => {
    if (!selectedMatch) {
      toast.error("Pilih pertandingan terlebih dahulu.");
      return;
    }
    setShowScoring(true); // Show the scoring section
  };

  // Handle score submission for either athlete
  const handleSubmitScores = async (athleteId, scores, athlete) => {
    try {
      await submitScores(athleteId, scores);
      setSubmissionMessages((prev) => ({ ...prev, [athlete]: "Skor berhasil disimpan." }));
    } catch {
      setSubmissionMessages((prev) => ({ ...prev, [athlete]: "Gagal menyimpan skor." }));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white border-2 border-black shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Penilaian Juri</h2>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {/* Select match based on match_number */}
        <div className="mb-4">
          <label className="block font-bold mb-2">Pilih Nomor Pertandingan</label>
          <select
            value={selectedMatchNumber || ""}
            onChange={(e) => setSelectedMatchNumber(e.target.value)} // Store match_number
            className="select select-bordered w-full"
          >
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

        {/* Show match details after selecting match_number */}
        {selectedMatch && (
          <div className="mb-4">
            <h3 className="text-xl font-bold">Informasi Pertandingan:</h3>
            <p>Kompetisi: {selectedMatch.competition_name}</p>
            <p>Atlet 1: {selectedMatch.athlete1_name}</p>
            <p>Atlet 2: {selectedMatch.athlete2_name}</p>
          </div>
        )}

        {/* Start scoring button */}
        {selectedMatch && (
          <button className="btn btn-primary w-full" onClick={startScoring}>
            Mulai Penilaian
          </button>
        )}

        {/* Scoring section */}
        {showScoring && selectedMatch && (
          <div className="mt-6 grid grid-cols-2 gap-4">
            {/* Scoring for Athlete 1 */}
            <div className="flex flex-col items-center bg-blue-200 p-4 rounded-lg">
              <h3 className="text-xl font-bold">{selectedMatch.athlete1_name}</h3>
              {["kick_score", "punch_score", "elbow_score", "knee_score", "throw_score"].map((scoreType) => (
                <div key={scoreType} className="mb-2">
                  <label className="block">{scoreType.replace("_", " ").toUpperCase()}</label>
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleAthlete1ScoreChange(scoreType, -1)} // Decrement score
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={athlete1Scores[scoreType]} // Athlete 1 score from context
                      className="input input-bordered text-center w-16"
                      readOnly
                    />
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleAthlete1ScoreChange(scoreType, 1)} // Increment score
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
              <button className="btn btn-primary w-full mt-4" onClick={() => handleSubmitScores(selectedMatch.athlete1_id, athlete1Scores, "athlete1")}>
                Submit Athlete 1
              </button>
              {submissionMessages.athlete1 && <p className="text-green-600 mt-2">{submissionMessages.athlete1}</p>}
            </div>

            {/* Scoring for Athlete 2 */}
            <div className="flex flex-col items-center bg-red-200 p-4 rounded-lg">
              <h3 className="text-xl font-bold">{selectedMatch.athlete2_name}</h3>
              {["kick_score", "punch_score", "elbow_score", "knee_score", "throw_score"].map((scoreType) => (
                <div key={scoreType} className="mb-2">
                  <label className="block">{scoreType.replace("_", " ").toUpperCase()}</label>
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleAthlete2ScoreChange(scoreType, -1)} // Decrement score
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={athlete2Scores[scoreType]} // Athlete 2 score from context
                      className="input input-bordered text-center w-16"
                      readOnly
                    />
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleAthlete2ScoreChange(scoreType, 1)} // Increment score
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
              <button className="btn btn-primary w-full mt-4" onClick={() => handleSubmitScores(selectedMatch.athlete2_id, athlete2Scores, "athlete2")}>
                Submit Athlete 2
              </button>
              {submissionMessages.athlete2 && <p className="text-green-600 mt-2">{submissionMessages.athlete2}</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Scores;
