import { useContext, useState } from "react";
import { ScoreContext } from "../../context/ScoreContext"; // Gunakan ScoreContext
import toast from "react-hot-toast";

const Scores = () => {
  const { matches, selectedMatchNumber, setSelectedMatchNumber, athlete1Scores, athlete2Scores, handleAthlete1ScoreChange, handleAthlete2ScoreChange, submitScores, loading, error } = useContext(ScoreContext);

  const [showScoring, setShowScoring] = useState(false); // Mengatur apakah bilah penilaian akan ditampilkan
  const [athlete1Message, setAthlete1Message] = useState(""); // Untuk menyimpan pesan Athlete 1
  const [athlete2Message, setAthlete2Message] = useState(""); // Untuk menyimpan pesan Athlete 2

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

  // Fungsi untuk mengirim skor Athlete 1
  const handleSubmitAthlete1 = async () => {
    try {
      await submitScores(selectedMatch.athlete1_id, athlete1Scores);
      setAthlete1Message("Skor disimpan");
    } catch (error) {
      setAthlete1Message("Gagal menyimpan skor");
    }
  };

  // Fungsi untuk mengirim skor Athlete 2
  const handleSubmitAthlete2 = async () => {
    try {
      await submitScores(selectedMatch.athlete2_id, athlete2Scores);
      setAthlete2Message("Skor disimpan");
    } catch (error) {
      setAthlete2Message("Gagal menyimpan skor");
    }
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
                Nomor {match.match_number} - {match.competition_name}
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
              <h3 className="text-xl font-bold">{selectedMatch.athlete1_name}</h3>
              {["kick_score", "punch_score", "elbow_score", "knee_score", "throw_score"].map((scoreType) => (
                <div key={scoreType} className="mb-2">
                  <label className="block">{scoreType.replace("_", " ").toUpperCase()}</label>
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleAthlete1ScoreChange(scoreType, -1)} // Kurangi sesuai dengan bobot
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={athlete1Scores[scoreType]} // Ambil skor athlete1 dari context
                      className="input input-bordered text-center w-16"
                      readOnly
                    />
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleAthlete1ScoreChange(scoreType, 1)} // Tambahkan sesuai dengan bobot
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
              <button className="btn btn-primary w-full mt-4" onClick={() => submitScores(selectedMatch.athlete1_id, athlete1Scores)}>
                Submit Athlete 1
              </button>
              {athlete1Message && <p className="text-green-600 mt-2">{athlete1Message}</p>}
            </div>

            {/* Penilaian Athlete 2 */}
            <div className="flex flex-col items-center bg-red-200 p-4 rounded-lg">
              <h3 className="text-xl font-bold">{selectedMatch.athlete2_name}</h3>
              {["kick_score", "punch_score", "elbow_score", "knee_score", "throw_score"].map((scoreType) => (
                <div key={scoreType} className="mb-2">
                  <label className="block">{scoreType.replace("_", " ").toUpperCase()}</label>
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleAthlete2ScoreChange(scoreType, -1)} // Kurangi sesuai dengan bobot
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={athlete2Scores[scoreType]} // Ambil skor athlete2 dari context
                      className="input input-bordered text-center w-16"
                      readOnly
                    />
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleAthlete2ScoreChange(scoreType, 1)} // Tambahkan sesuai dengan bobot
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
              <button className="btn btn-primary w-full mt-4" onClick={() => submitScores(selectedMatch.athlete2_id, athlete2Scores)}>
                Submit Athlete 2
              </button>
              {athlete2Message && <p className="text-green-600 mt-2">{athlete2Message}</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Scores;
