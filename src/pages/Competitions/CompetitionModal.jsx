import { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { CompetitionContext } from "../../context/CompetitionContext";
import { FaTimes, FaCheck } from "react-icons/fa";
import toast from "react-hot-toast";

const CompetitionModal = ({ isOpen, setIsOpen, competition }) => {
  const { addCompetition, editCompetition } = useContext(CompetitionContext);
  const [competitionName, setCompetitionName] = useState("");
  const [Location, setLocation] = useState("");
  const [competitionDate, setCompetitionDate] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (competition) {
      setCompetitionName(competition.competition_name);
      setLocation(competition.location);
      setCompetitionDate(new Date(competition.competition_date).toISOString().slice(0, 10)); // Convert to YYYY-MM-DD format
      setStatus(competition.status);
    } else {
      setCompetitionName("");
      setLocation("");
      setCompetitionDate("");
      setStatus("ongoing"); // Default value
    }
  }, [competition]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const competitionData = {
      competition_name: competitionName,
      location: Location,
      competition_date: competitionDate,
      status,
    };

    try {
      if (competition) {
        await editCompetition(competition.competition_id, competitionData);
        toast.success("Data kompetisi berhasil diperbarui!");
      } else {
        await addCompetition(competitionData);
        toast.success("Data kompetisi berhasil ditambahkan!");
      }
      setIsOpen(false);
    } catch (err) {
      toast.error("Gagal menyimpan data kompetisi: " + err.message);
    }
  };

  return (
    <div className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box mx-auto border-2 border-slate-700 shadow-[4px_4px_0px_rgba(0,0,0,1)] p-4 max-h-screen overflow-y-auto bg-[#F5F5DC]">
        <div className="flex justify-between items-center p-2">
          <h2 className="text-lg font-bold text-black">{competition ? "Edit Competition" : "Add Competition"}</h2>
          <div className="flex gap-2">
            {/* Close Button */}
            <button className="btn btn-sm bg-red-500 text-black border-2 border-slate-700 hover:bg-red-600 focus:shadow-[2px_2px_0px_rgba(0,0,0,1)]" onClick={() => setIsOpen(false)}>
              <FaTimes />
            </button>
            {/* Submit Button */}
            <button
              type="submit"
              form="competitionForm" // Connect button with form ID
              className="btn btn-sm bg-[#78f8ff] text-black border-2 border-slate-700 hover:bg-[#3ae2e2] hover:text-black"
            >
              <FaCheck />
            </button>
          </div>
        </div>

        {/* Form yang bisa di-scroll */}
        <form id="competitionForm" onSubmit={handleSubmit} className="overflow-y-auto max-h-[60vh] pr-2">
          <div className="form-control mb-2">
            <label className="label">
              <span className="label-text text-black">Competition Name</span>
            </label>
            <input
              type="text"
              className="input input-sm bg-slate-500 focus:shadow-[inset_0_0_5px_rgba(0,0,0,0.8),_inset_0_0_10px_rgba(255,255,255,0.2)] text-white"
              value={competitionName}
              onChange={(e) => setCompetitionName(e.target.value)}
              required
            />
          </div>
          <div className="form-control mb-2">
            <label className="label">
              <span className="label-text text-black">Location</span>
            </label>
            <input type="text" className="input input-sm bg-slate-500 focus:shadow-[inset_0_0_5px_rgba(0,0,0,0.8),_inset_0_0_10px_rgba(255,255,255,0.2)] text-white" value={Location} onChange={(e) => setLocation(e.target.value)} required />
          </div>
          <div className="form-control mb-2">
            <label className="label">
              <span className="label-text text-black">Competition Date</span>
            </label>
            <input
              type="date"
              className="input input-sm bg-slate-500 focus:shadow-[inset_0_0_5px_rgba(0,0,0,0.8),_inset_0_0_10px_rgba(255,255,255,0.2)] text-white"
              value={competitionDate}
              onChange={(e) => setCompetitionDate(e.target.value)}
              required
            />
          </div>
          <div className="form-control mb-2">
            <label className="label">
              <span className="label-text text-black">Status</span>
            </label>
            <select className="select select-sm bg-slate-500 focus:shadow-[inset_0_0_5px_rgba(0,0,0,0.8),_inset_0_0_10px_rgba(255,255,255,0.2)] text-white" value={status} onChange={(e) => setStatus(e.target.value)} required>
              <option value="" disabled>
                Select status
              </option>
              <option value="ongoing">Ongoing</option>
              <option value="finished">Finished</option>
              <option value="upcoming">Upcoming</option>
            </select>
          </div>
        </form>
      </div>
    </div>
  );
};

CompetitionModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  competition: PropTypes.shape({
    competition_id: PropTypes.number,
    competition_name: PropTypes.string,
    location: PropTypes.string,
    competition_date: PropTypes.string,
    status: PropTypes.string,
  }),
};

export default CompetitionModal;
