import { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { MatchContext } from "../../context/MatchContext";
import { AthleteContext } from "../../context/AthleteContext";
import { CompetitionContext } from "../../context/CompetitionContext";
import { FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";

const MatchModal = ({ isOpen, setIsOpen, match }) => {
  const { addMatch, editMatch } = useContext(MatchContext);
  const { athletes } = useContext(AthleteContext); // Mendapatkan data atlet
  const { competitions } = useContext(CompetitionContext); // Mendapatkan data kompetisi

  const [competitionId, setCompetitionId] = useState("");
  const [athlete1Id, setAthlete1Id] = useState("");
  const [athlete2Id, setAthlete2Id] = useState("");
  const [matchDate, setMatchDate] = useState("");

  useEffect(() => {
    if (match) {
      setCompetitionId(match.competition_id);
      setAthlete1Id(match.athlete1_id);
      setAthlete2Id(match.athlete2_id);
      setMatchDate(match.match_date.split("T")[0]); // Menyesuaikan format tanggal untuk input
    } else {
      setCompetitionId("");
      setAthlete1Id("");
      setAthlete2Id("");
      setMatchDate("");
    }
  }, [match]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const matchData = {
      competition_id: competitionId,
      athlete1_id: athlete1Id,
      athlete2_id: athlete2Id,
      match_date: matchDate,
    };

    try {
      if (match) {
        await editMatch(match.match_id, matchData);
        toast.success("Data pertandingan berhasil diperbarui!");
      } else {
        await addMatch(matchData);
        toast.success("Data pertandingan berhasil ditambahkan!");
      }
      setIsOpen(false);
    } catch (err) {
      toast.error("Gagal menyimpan data pertandingan: " + err.message);
    }
  };

  return (
    <div className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box mx-auto border-2 border-slate-700 shadow-[4px_4px_0px_rgba(0,0,0,1)] p-4 max-h-[calc(100vh-8rem)] overflow-hidden bg-[#F5F5DC]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-black">{match ? "Edit Match" : "Add Match"}</h2>
          <button className="btn bg-red-500 text-black border-2 border-black hover:bg-red-600" onClick={() => setIsOpen(false)}>
            <FaTimes />
          </button>
        </div>

        {/* Form yang bisa di-scroll */}
        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[60vh] pr-2">
          <div className="form-control mb-2">
            <label className="label">
              <span className="label-text text-black">Competition</span>
            </label>
            <select className="input bg-slate-500 focus:shadow-[inset_0_0_5px_rgba(0,0,0,0.8),_inset_0_0_10px_rgba(255,255,255,0.2)] text-white" value={competitionId} onChange={(e) => setCompetitionId(e.target.value)} required>
              <option value="">Select Competition</option>
              {competitions.map((comp) => (
                <option key={comp.competition_id} value={comp.competition_id}>
                  {comp.competition_name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control mb-2">
            <label className="label">
              <span className="label-text text-black">Athlete 1</span>
            </label>
            <select className="input bg-slate-500 focus:shadow-[inset_0_0_5px_rgba(0,0,0,0.8),_inset_0_0_10px_rgba(255,255,255,0.2)] text-white" value={athlete1Id} onChange={(e) => setAthlete1Id(e.target.value)} required>
              <option value="">Select Athlete 1</option>
              {athletes.map((athlete) => (
                <option key={athlete.athlete_id} value={athlete.athlete_id}>
                  {athlete.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control mb-2">
            <label className="label">
              <span className="label-text text-black">Athlete 2</span>
            </label>
            <select className="input bg-slate-500 focus:shadow-[inset_0_0_5px_rgba(0,0,0,0.8),_inset_0_0_10px_rgba(255,255,255,0.2)] text-white" value={athlete2Id} onChange={(e) => setAthlete2Id(e.target.value)} required>
              <option value="">Select Athlete 2</option>
              {athletes.map((athlete) => (
                <option key={athlete.athlete_id} value={athlete.athlete_id}>
                  {athlete.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text text-black">Match Date</span>
            </label>
            <input type="date" className="input bg-slate-500 focus:shadow-[inset_0_0_5px_rgba(0,0,0,0.8),_inset_0_0_10px_rgba(255,255,255,0.2)]" value={matchDate} onChange={(e) => setMatchDate(e.target.value)} required />
          </div>

          {/* Submit button */}
          <div className="modal-action">
            <button type="submit" className="btn bg-[#A6FAFF] text-black border-2 border-slate-700 hover:bg-[#62f2f2] hover:text-black">
              {match ? "Save Changes" : "Add Match"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

MatchModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  match: PropTypes.shape({
    match_id: PropTypes.number,
    competition_id: PropTypes.number,
    athlete1_id: PropTypes.number,
    athlete2_id: PropTypes.number,
    match_date: PropTypes.string,
  }),
};

export default MatchModal;
