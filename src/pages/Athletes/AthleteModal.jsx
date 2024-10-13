import { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { AthleteContext } from "../../context/AthleteContext";
import { FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";

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
      setHeight(athlete.height.toString());
      setWeight(athlete.weight.toString());
    } else {
      setName("");
      setTeam("");
      setMartial("");
      setHeight("");
      setWeight("");
    }
  }, [athlete]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const athleteData = { name, team, martial, height, weight };

    try {
      if (athlete) {
        await editAthlete(athlete.athlete_id, athleteData);
        toast.success("Data atlet berhasil diperbarui!"); // Toast success
      } else {
        await addAthlete(athleteData);
        toast.success("Data atlet berhasil ditambahkan!"); // Toast success
      }
      setIsOpen(false);
    } catch (err) {
      toast.error("Gagal menyimpan data atlet: " + err.message); // Toast error
    }
  };

  return (
    <div className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box mx-auto border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] p-4 bg-[#f3f4f6] max-h-[calc(100vh-8rem)] overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-black">{athlete ? "Edit Athlete" : "Add Athlete"}</h2>
          <button className="btn bg-red-500 text-black border-2 border-black hover:bg-red-600" onClick={() => setIsOpen(false)}>
            <FaTimes />
          </button>
        </div>

        {/* Form yang bisa di-scroll */}
        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[60vh] pr-2">
          <div className="form-control mb-2">
            <label className="label">
              <span className="label-text text-black">Name</span>
            </label>
            <input type="text" className="input border-4 border-black focus:shadow-[4px_4px_0px_rgba(0,0,0,1)]" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-control mb-2">
            <label className="label">
              <span className="label-text text-black">Team</span>
            </label>
            <input type="text" className="input border-4 border-black focus:shadow-[4px_4px_0px_rgba(0,0,0,1)]" value={team} onChange={(e) => setTeam(e.target.value)} required />
          </div>
          <div className="form-control mb-2">
            <label className="label">
              <span className="label-text text-black">Martial Art</span>
            </label>
            <input type="text" className="input border-4 border-black focus:shadow-[4px_4px_0px_rgba(0,0,0,1)]" value={martial} onChange={(e) => setMartial(e.target.value)} required />
          </div>
          <div className="form-control mb-2">
            <label className="label">
              <span className="label-text text-black">Height</span>
            </label>
            <input type="text" className="input border-4 border-black focus:shadow-[4px_4px_0px_rgba(0,0,0,1)]" placeholder="cm" value={height} onChange={(e) => setHeight(e.target.value)} required />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text text-black">Weight</span>
            </label>
            <input type="text" className="input border-4 border-black focus:shadow-[4px_4px_0px_rgba(0,0,0,1)]" placeholder="kg" value={weight} onChange={(e) => setWeight(e.target.value)} required />
          </div>

          {/* Submit button */}
          <div className="modal-action">
            <button type="submit" className="btn bg-[#A6FAFF] text-black border-2 border-black hover:bg-[#79F7FF] hover:text-black">
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
    athlete_id: PropTypes.number,
    name: PropTypes.string,
    team: PropTypes.string,
    martial: PropTypes.string,
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    weight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
};

export default AthleteModal;
