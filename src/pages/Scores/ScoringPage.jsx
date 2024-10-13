import { useState } from "react";

const ScoringPage = () => {
  const [blueScores, setBlueScores] = useState({
    punch: 0,
    kick: 0,
    takedown: 0,
    submission: 0,
  });
  const [redScores, setRedScores] = useState({
    punch: 0,
    kick: 0,
    takedown: 0,
    submission: 0,
  });

  const handleScore = (color, action) => {
    if (color === "blue") {
      setBlueScores({ ...blueScores, [action]: blueScores[action] + 1 });
    } else {
      setRedScores({ ...redScores, [action]: redScores[action] + 1 });
    }
  };

  const handleEndMatch = () => {
    const totalBlue = Object.values(blueScores).reduce((a, b) => a + b, 0);
    const totalRed = Object.values(redScores).reduce((a, b) => a + b, 0);

    if (totalBlue > totalRed) {
      alert("Atlet Biru Menang!");
    } else if (totalRed > totalBlue) {
      alert("Atlet Merah Menang!");
    } else {
      alert("Pertandingan Seri!");
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Penilaian Pertandingan</h2>

      <div className="flex justify-around mb-8">
        <div className="text-center">
          <h3 className="text-xl font-bold mb-2">Atlet Biru</h3>
          {Object.keys(blueScores).map(action => (
            <button
              key={action}
              className="btn btn-outline btn-blue m-2"
              onClick={() => handleScore("blue", action)}
            >
              {action.toUpperCase()}
            </button>
          ))}
          <h4 className="mt-4">Total Skor Biru: {Object.values(blueScores).reduce((a, b) => a + b, 0)}</h4>
        </div>

        <div className="text-center">
          <h3 className="text-xl font-bold mb-2">Atlet Merah</h3>
          {Object.keys(redScores).map(action => (
            <button
              key={action}
              className="btn btn-outline btn-red m-2"
              onClick={() => handleScore("red", action)}
            >
              {action.toUpperCase()}
            </button>
          ))}
          <h4 className="mt-4">Total Skor Merah: {Object.values(redScores).reduce((a, b) => a + b, 0)}</h4>
        </div>
      </div>

      <button className="btn btn-success w-full" onClick={handleEndMatch}>
        Akhiri Pertandingan
      </button>
    </div>
  );
};

export default ScoringPage;
