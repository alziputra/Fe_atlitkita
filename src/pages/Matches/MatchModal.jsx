import { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { MatchContext } from "../../context/MatchContext";
import { AthleteContext } from "../../context/AthleteContext";
import { CompetitionContext } from "../../context/CompetitionContext";
import { FaTimes, FaCheck } from "react-icons/fa";
import toast from "react-hot-toast";

const MatchModal = ({ isOpen, setIsOpen, match }) => {
  const { addMatch, editMatch } = useContext(MatchContext);
  const { athletes } = useContext(AthleteContext); // Mendapatkan data atlet
  const { competitions } = useContext(CompetitionContext); // Mendapatkan data kompetisi

  const [competitionId, setCompetitionId] = useState("");
  const [athlete1Id, setAthlete1Id] = useState("");
  const [athlete2Id, setAthlete2Id] = useState("");
  const [matchNumber, setMatchNumber] = useState("");
  const [matchDate, setMatchDate] = useState("");

  // Filter athletes based on team
  const athletesBlueTeam = athletes.filter((athlete) => athlete.team === "Biru");
  const athletesRedTeam = athletes.filter((athlete) => athlete.team === "Merah");

  useEffect(() => {
    if (match) {
      setCompetitionId(match.competition_id);
      setAthlete1Id(match.athlete1_id);
      setAthlete2Id(match.athlete2_id);
      setMatchNumber(match.match_number);
      setMatchDate(match.match_date.split("T")[0]); // Menyesuaikan format tanggal untuk input
    } else {
      setCompetitionId("");
      setAthlete1Id("");
      setAthlete2Id("");
      setMatchNumber("");
      setMatchDate("");
    }
  }, [match]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const matchData = {
      competition_id: competitionId,
      athlete1_id: athlete1Id,
      athlete2_id: athlete2Id,
      match_number: matchNumber,
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
      <div className="modal-box mx-auto border-2 border-slate-700 shadow-[4px_4px_0px_rgba(0,0,0,1)] p-4 max-h-screen overflow-y-auto bg-[#F5F5DC]">
        <div className="flex justify-between items-center p-2">
          <h2 className="text-lg font-bold text-black">{match ? "Edit Match" : "Add Match"}</h2>
          <div className="flex gap-2">
            {/* Close Button */}
            <button className="btn btn-sm bg-red-500 text-black border-2 border-slate-700 hover:bg-red-600 focus:shadow-[2px_2px_0px_rgba(0,0,0,1)]" onClick={() => setIsOpen(false)}>
              <FaTimes />
            </button>
            {/* Submit Button */}
            <button
              type="submit"
              form="matchForm" // Connect button with form ID
              className="btn btn-sm bg-[#78f8ff] text-black border-2 border-slate-700 hover:bg-[#3ae2e2] hover:text-black"
            >
              <FaCheck />
            </button>
          </div>
        </div>

        {/* Form yang bisa di-scroll */}
        <form id="matchForm" onSubmit={handleSubmit} className="overflow-y-auto max-h-[60vh] pr-2">
          <div className="form-control mb-2">
            <label className="label">
              <span className="label-text text-black">Competition</span>
            </label>
            <select className="select select-sm bg-slate-500 focus:shadow-[inset_0_0_5px_rgba(0,0,0,0.8),_inset_0_0_10px_rgba(255,255,255,0.2)] text-white" value={competitionId} onChange={(e) => setCompetitionId(e.target.value)} required>
              <option value="" disabled>
                Select Competition
              </option>
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
            <select className="select select-sm bg-blue-400 focus:shadow-[inset_0_0_5px_rgba(0,0,0,0.8),_inset_0_0_10px_rgba(255,255,255,0.2)] text-white" value={athlete1Id} onChange={(e) => setAthlete1Id(e.target.value)} required>
              <option value="" disabled>
                Select Blue Athlete
              </option>
              {athletesBlueTeam.map((athlete) => (
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
            <select className="select select-sm bg-red-400 focus:shadow-[inset_0_0_5px_rgba(0,0,0,0.8),_inset_0_0_10px_rgba(255,255,255,0.2)] text-white" value={athlete2Id} onChange={(e) => setAthlete2Id(e.target.value)} required>
              <option value="" disabled>
                Select Red Athlete
              </option>
              {athletesRedTeam.map((athlete) => (
                <option key={athlete.athlete_id} value={athlete.athlete_id}>
                  {athlete.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-control mb-2">
            <label className="label">
              <span className="label-text text-black">Match Number</span>
            </label>
            <input
              type="number"
              className="input input-sm bg-slate-500 focus:shadow-[inset_0_0_5px_rgba(0,0,0,0.8),_inset_0_0_10px_rgba(255,255,255,0.2)]"
              value={matchNumber}
              onChange={(e) => {
                // Limit the input to 3 digits
                if (e.target.value.length <= 3) {
                  setMatchNumber(e.target.value);
                }
              }}
              required
            />
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text text-black">Match Date</span>
            </label>
            <input type="date" className="input input-sm bg-slate-500 focus:shadow-[inset_0_0_5px_rgba(0,0,0,0.8),_inset_0_0_10px_rgba(255,255,255,0.2)]" value={matchDate} onChange={(e) => setMatchDate(e.target.value)} required />
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
    match_number: PropTypes.string,
    match_date: PropTypes.string,
  }),
};

export default MatchModal;
