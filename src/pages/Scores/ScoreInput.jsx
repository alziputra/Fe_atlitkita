import PropTypes from "prop-types";

const ScoreInput = ({ athleteName, scores, handleScoreChange, handleSubmitScores, submissionMessage, athleteId, scoreTypes }) => {
  return (
    <div className="flex flex-col items-center bg-gray-100 p-4 rounded-lg">
      <h3 className="text-xl font-bold">{athleteName}</h3>
      {scoreTypes.map((scoreType) => (
        <div key={scoreType} className="mb-2">
          <label className="block">{scoreType.replace("_", " ").toUpperCase()}</label>
          <div className="flex items-center justify-center space-x-2">
            <button className="btn btn-secondary" onClick={() => handleScoreChange(scoreType, -1)}>
              -
            </button>
            <input type="number" value={scores[scoreType]} className="input input-bordered text-center w-16" readOnly />
            <button className="btn btn-secondary" onClick={() => handleScoreChange(scoreType, 1)}>
              +
            </button>
          </div>
        </div>
      ))}
      <button className="btn btn-primary w-full mt-4" onClick={() => handleSubmitScores(athleteId, scores)}>
        Submit {athleteName}
      </button>
      {submissionMessage && <p className="text-green-600 mt-2">{submissionMessage}</p>}
    </div>
  );
};

ScoreInput.propTypes = {
  athleteName: PropTypes.string.isRequired,
  scores: PropTypes.object.isRequired,
  handleScoreChange: PropTypes.func.isRequired,
  handleSubmitScores: PropTypes.func.isRequired,
  submissionMessage: PropTypes.string,
  athleteId: PropTypes.number.isRequired,
  scoreTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ScoreInput;
