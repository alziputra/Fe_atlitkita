import { useContext, useState } from "react";
import { ScoreContext } from "../../context/ScoreContext"; // Gunakan ScoreContext
import toast from "react-hot-toast";

const Scores = () => {
  const { matches, scores, handleScoreChange, submitScores, loading, error } = useContext(ScoreContext); // Ambil data dari ScoreContext
  const [selectedMatchNumber, setSelectedMatchNumber] = useState(""); // Untuk menyimpan match_number
  const [showScoring, setShowScoring] = useState(false); // Mengatur apakah bilah penilaian akan ditampilkan

  // Mendapatkan match berdasarkan match_number yang dipilih
  const selectedMatch = matches.find((match) => match.match_number === selectedMatchNumber);

  // Fungsi untuk memulai penilaian
  const startScoring = () => {
    if (!selectedMatch) {
      toast.error("Pilih pertandingan terlebih dahulu.");
      return;
    }
    setShowScoring(true); // Tampilkan bilah penilaian
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white border-2 border-black shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Penilaian Juri</h2>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {/* Pilih Pertandingan berdasarkan match_number */}
        <div className="mb-4">
          <label className="block font-bold mb-2">Pilih Nomor Pertandingan</label>
          <select
            value={selectedMatchNumber || ""}
            onChange={(e) => setSelectedMatchNumber(e.target.value)} // Simpan match_number di selectedMatchNumber
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

        {/* Menampilkan informasi pertandingan setelah match_number dipilih */}
        {selectedMatch && (
          <div className="mb-4">
            <h3 className="text-xl font-bold">Informasi Pertandingan:</h3>
            <p>Kompetisi: {selectedMatch.competition_name}</p>
            <p>Atlet 1: {selectedMatch.athlete1_name}</p>
            <p>Atlet 2: {selectedMatch.athlete2_name}</p>
          </div>
        )}

        {/* Tombol Mulai Penilaian */}
        {selectedMatch && (
          <button className="btn btn-primary w-full" onClick={startScoring}>
            Mulai Penilaian
          </button>
        )}

        {/* Bilah Penilaian */}
        {showScoring && selectedMatch && (
          <div className="mt-6 grid grid-cols-2 gap-4">
            {/* Penilaian Athlete 1 */}
            <div className="flex flex-col items-center bg-blue-200 p-4 rounded-lg">
              <h3 className="text-xl font-bold">{selectedMatch.athlete1_name}</h3> {/* Nama Atlet 1 */}
              {["kick_score", "punch_score", "elbow_score", "knee_score", "throw_score"].map((scoreType) => (
                <div key={scoreType} className="mb-2">
                  <label className="block">{scoreType.replace("_", " ").toUpperCase()}</label>
                  <input type="number" value={scores[scoreType]} onChange={(e) => handleScoreChange(scoreType, parseInt(e.target.value))} className="input input-bordered w-full" />
                </div>
              ))}
              <button className="btn btn-primary w-full mt-4" onClick={() => submitScores(selectedMatch.athlete1_id)}>
                Submit Athlete 1
              </button>
            </div>

            {/* Penilaian Athlete 2 */}
            <div className="flex flex-col items-center bg-red-200 p-4 rounded-lg">
              <h3 className="text-xl font-bold">{selectedMatch.athlete2_name}</h3> {/* Nama Atlet 2 */}
              {["kick_score", "punch_score", "elbow_score", "knee_score", "throw_score"].map((scoreType) => (
                <div key={scoreType} className="mb-2">
                  <label className="block">{scoreType.replace("_", " ").toUpperCase()}</label>
                  <input type="number" value={scores[scoreType]} onChange={(e) => handleScoreChange(scoreType, parseInt(e.target.value))} className="input input-bordered w-full" />
                </div>
              ))}
              <button className="btn btn-primary w-full mt-4" onClick={() => submitScores(selectedMatch.athlete2_id)}>
                Submit Athlete 2
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Scores;
