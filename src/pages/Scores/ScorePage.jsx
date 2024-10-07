import { useState } from "react";

const ScorePage = () => {
  const [kickScore, setKickScore] = useState(0);
  const [punchScore, setPunchScore] = useState(0);
  const [elbowScore, setElbowScore] = useState(0);
  const [kneeScore, setKneeScore] = useState(0);
  const [throwScore, setThrowScore] = useState(0);
  const [selectedAthlete, setSelectedAthlete] = useState("");
  const [selectedCompetition, setSelectedCompetition] = useState("");
  const [selectedMatch, setSelectedMatch] = useState("");

  const handleSubmit = () => {
    const scoreData = {
      kickScore,
      punchScore,
      elbowScore,
      kneeScore,
      throwScore,
      selectedAthlete,
      selectedCompetition,
      selectedMatch,
    };
    console.log("Score Data:", scoreData);
    // Kirim data ke backend menggunakan axios
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Input Scores</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label>Pilih Atlet</label>
          <input type="text" value={selectedAthlete} onChange={(e) => setSelectedAthlete(e.target.value)} className="border p-2 rounded w-full" />
        </div>
        <div>
          <label>Pilih Kompetisi</label>
          <input type="text" value={selectedCompetition} onChange={(e) => setSelectedCompetition(e.target.value)} className="border p-2 rounded w-full" />
        </div>
        <div>
          <label>Pilih Pertandingan</label>
          <input type="text" value={selectedMatch} onChange={(e) => setSelectedMatch(e.target.value)} className="border p-2 rounded w-full" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <button onClick={() => setKickScore(kickScore + 1)} className="bg-blue-500 text-white px-4 py-2 rounded">
          Kick Score (+1): {kickScore}
        </button>
        <button onClick={() => setPunchScore(punchScore + 1)} className="bg-green-500 text-white px-4 py-2 rounded">
          Punch Score (+1): {punchScore}
        </button>
        <button onClick={() => setElbowScore(elbowScore + 1)} className="bg-red-500 text-white px-4 py-2 rounded">
          Elbow Score (+1): {elbowScore}
        </button>
        <button onClick={() => setKneeScore(kneeScore + 1)} className="bg-yellow-500 text-white px-4 py-2 rounded">
          Knee Score (+1): {kneeScore}
        </button>
        <button onClick={() => setThrowScore(throwScore + 1)} className="bg-purple-500 text-white px-4 py-2 rounded">
          Throw Score (+1): {throwScore}
        </button>
      </div>

      <button onClick={handleSubmit} className="mt-6 bg-red-600 text-white px-4 py-2 rounded">
        Akhiri Pertandingan
      </button>
    </div>
  );
};

export default ScorePage;
