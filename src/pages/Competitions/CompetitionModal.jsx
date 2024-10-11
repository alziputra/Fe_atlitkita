import { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { CompetitionContext } from "../../context/CompetitionContext";
import { FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";

const CompetitionModal = ({ isOpen, setIsOpen, competition }) => {
  const { addCompetition, editCompetition } = useContext(CompetitionContext);
  const [competitionName, setCompetitionName] = useState("");
  const [competitionDate, setCompetitionDate] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (competition) {
      setCompetitionName(competition.competition_name);
      setCompetitionDate(new Date(competition.competition_date).toISOString().slice(0, 10)); // Convert to YYYY-MM-DD format
      setStatus(competition.status);
    } else {
      setCompetitionName("");
      setCompetitionDate("");
      setStatus("");
    }
  }, [competition]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const competitionData = {
      competition_name: competitionName,
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
      <div className="modal-box">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">{competition ? "Edit Competition" : "Add Competition"}</h2>
          <button className="btn btn-ghost" onClick={() => setIsOpen(false)}>
            <FaTimes />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Competition Name</span>
            </label>
            <input type="text" className="input input-bordered" value={competitionName} onChange={(e) => setCompetitionName(e.target.value)} required />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Competition Date</span>
            </label>
            <input type="date" className="input input-bordered" value={competitionDate} onChange={(e) => setCompetitionDate(e.target.value)} required />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Status</span>
            </label>
            <select className="input input-bordered" value={status} onChange={(e) => setStatus(e.target.value)} required>
              <option value="ongoing">Ongoing</option>
              <option value="finished">Finished</option>
              <option value="upcoming">Upcoming</option>
            </select>
          </div>
          <div className="modal-action">
            <button type="submit" className="btn btn-primary">
              {competition ? "Save Changes" : "Add Competition"}
            </button>
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
    competition_date: PropTypes.string,
    status: PropTypes.string,
  }),
};

export default CompetitionModal;
