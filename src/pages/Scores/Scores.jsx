import { useContext, useState } from "react";
import { ScoreContext } from "../../context/ScoreContext"; // Use ScoreContext
import toast from "react-hot-toast";

const Scores = () => {
  const {
    matches,
    selectedMatchNumber,
    setSelectedMatchNumber,
    athlete1Scores,
    athlete2Scores,
    handleAthlete1ScoreChange,
    handleAthlete2ScoreChange,
    submitScores,
    submitMatchResults, // Function to submit match results
    loading,
    error,
  } = useContext(ScoreContext);

  const [showScoring, setShowScoring] = useState(false);
  const [submissionMessages, setSubmissionMessages] = useState({ athlete1: "", athlete2: "" });
  const [resultsMessage, setResultsMessage] = useState({ match_id: "" });

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
      setResultsMessage({ match_id: "Hasil penilaian berhasil disimpan." });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] rounded-lg p-6">
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

        {/* Tampilan untuk mengisi skor */}
        {showScoring && selectedMatch && (
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center bg-blue-200 p-4 rounded-lg">
              <h3 className="text-xl font-bold">{selectedMatch.athlete1_name}</h3>
              {["kick_score", "punch_score", "elbow_score", "knee_score", "throw_score"].map((scoreType) => (
                <div key={scoreType} className="mb-2">
                  <label className="block">{scoreType.replace("_", " ").toUpperCase()}</label>
                  <div className="flex items-center justify-center space-x-2">
                    <button className="btn btn-secondary" onClick={() => handleAthlete1ScoreChange(scoreType, -1)}>
                      -
                    </button>
                    <input type="number" value={athlete1Scores[scoreType]} className="input input-bordered text-center w-16" readOnly />
                    <button className="btn btn-secondary" onClick={() => handleAthlete1ScoreChange(scoreType, 1)}>
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

            <div className="flex flex-col items-center bg-red-200 p-4 rounded-lg">
              <h3 className="text-xl font-bold">{selectedMatch.athlete2_name}</h3>
              {["kick_score", "punch_score", "elbow_score", "knee_score", "throw_score"].map((scoreType) => (
                <div key={scoreType} className="mb-2">
                  <label className="block">{scoreType.replace("_", " ").toUpperCase()}</label>
                  <div className="flex items-center justify-center space-x-2">
                    <button className="btn btn-secondary" onClick={() => handleAthlete2ScoreChange(scoreType, -1)}>
                      -
                    </button>
                    <input type="number" value={athlete2Scores[scoreType]} className="input input-bordered text-center w-16" readOnly />
                    <button className="btn btn-secondary" onClick={() => handleAthlete2ScoreChange(scoreType, 1)}>
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

        {/* Button to submit final results */}
        {showScoring && selectedMatch && (
          <button className="btn btn-success w-full mt-6" onClick={handleSubmitMatchResults}>
            Simpan Hasil Penilaian
          </button>
        )}
        {resultsMessage.match_id && <p className="text-green-600 mt-2">{resultsMessage.match_id}</p>}
      </div>
    </div>
  );
};

export default Scores;
