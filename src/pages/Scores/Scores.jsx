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
      <div className="bg-white border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] rounded-lg p-4">
        <div className="border-2 border-black rounded-lg p-6 mb-3">
          <h2 className="text-2xl font-bold mb-6">Penilaian Atlet</h2>

          <div className="grid grid-cols-2 gap-4">
            {/* Select Competition */}
            <div className="mb-6">
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
            <div className="mb-6">
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
          </div>

          <button className="flex btn btn-sm bg-[#2ac34b] hover:bg-[#74f590] text-white hover:text-black border-2 border-black items-center hover:shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            <a href="">Masuk penilaian</a>
          </button>
        </div>
        
        {/* Display Selected Choices */}
        <div className="border-2 border-black rounded-lg p-6">
          <div className="mb-4">
            <div className="flex justify-between gap-2">
              <div className="flex flex-col items-center w-1/2 bg-blue-500 p-4 rounded-lg">
                <div className="text-white">
                  {selectedAthlete
                    ? (() => {
                        const match = matches.find((match) => match.athlete1_id.toString() === selectedAthlete || match.athlete2_id.toString() === selectedAthlete);
                        if (match) {
                          return match.athlete1_id.toString() === selectedAthlete ? match.athlete1_name : match.athlete2_name;
                        }
                        return "Belum dipilih";
                      })()
                    : "Belum dipilih"}
                </div>
                <div className="flex flex-col mt-4 gap-2">
                  <button className="btn btn-primary">Kick Score</button>
                  <button className="btn btn-primary">Punch Score</button>
                  <button className="btn btn-primary">Elbow Score</button>
                  <button className="btn btn-primary">Knee Score</button>
                  <button className="btn btn-primary">Throw Score</button>
                </div>
              </div>

              <div className="flex flex-col items-center w-1/2 bg-red-500 p-4 rounded-lg">
                <div className="text-white">
                  {selectedAthlete
                    ? (() => {
                        const match = matches.find((match) => match.athlete1_id.toString() === selectedAthlete || match.athlete2_id.toString() === selectedAthlete);
                        if (match) {
                          return match.athlete1_id.toString() === selectedAthlete ? match.athlete2_name : match.athlete1_name;
                        }
                        return "Belum dipilih";
                      })()
                    : "Belum dipilih"}
                </div>
                <div className="flex flex-col mt-4 gap-2">
                  <button className="btn btn-primary">Kick Score</button>
                  <button className="btn btn-primary">Punch Score</button>
                  <button className="btn btn-primary">Elbow Score</button>
                  <button className="btn btn-primary">Knee Score</button>
                  <button className="btn btn-primary">Throw Score</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scores;
