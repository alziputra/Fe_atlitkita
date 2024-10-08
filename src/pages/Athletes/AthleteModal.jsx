import { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { AthleteContext } from "../../context/AthleteContext";
import { FaTimes } from "react-icons/fa";

const AthleteModal = ({ isOpen, setIsOpen, athlete }) => {
  const { addAthlete, editAthlete } = useContext(AthleteContext);
  const [name, setName] = useState("");
  const [team, setTeam] = useState("");
  const [martial, setMartial] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  useEffect(() => {
    if (athlete) {
      setName(athlete.name);
      setTeam(athlete.team);
      setMartial(athlete.martial);
      setHeight(athlete.height);
      setWeight(athlete.weight);
    } else {
      setName("");
      setTeam("");
      setMartial("");
      setHeight("");
      setWeight("");
    }
  }, [athlete]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const athleteData = { name, team, martial, height, weight };

    if (athlete) {
      editAthlete(athlete.athlete_id, athleteData);
    } else {
      addAthlete(athleteData);
    }

    setIsOpen(false); // Tutup modal setelah submit
  };

  return (
    <div className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">{athlete ? "Edit Athlete" : "Add Athlete"}</h2>
          <button className="btn btn-ghost" onClick={() => setIsOpen(false)}>
            <FaTimes />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input type="text" className="input input-bordered" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Team</span>
            </label>
            <input type="text" className="input input-bordered" value={team} onChange={(e) => setTeam(e.target.value)} required />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Martial</span>
            </label>
            <input type="text" className="input input-bordered" value={martial} onChange={(e) => setMartial(e.target.value)} required />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Height</span>
            </label>
            <input type="text" className="input input-bordered" value={height} onChange={(e) => setHeight(e.target.value)} required />
          </div>
          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text">Weight</span>
            </label>
            <input type="text" className="input input-bordered" value={weight} onChange={(e) => setWeight(e.target.value)} required />
          </div>
          <div className="modal-action">
            <button type="submit" className="btn btn-primary">
              {athlete ? "Save Changes" : "Add Athlete"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


AthleteModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  athlete: PropTypes.shape({
    name: PropTypes.string,
    team: PropTypes.string,
    martial: PropTypes.string,
    height: PropTypes.number,
    weight: PropTypes.number,
    athlete_id: PropTypes.number,
  }),
};

export default AthleteModal;
