import { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { AthleteContext } from "../../context/AthleteContext";
import { FaTimes, FaCheck } from "react-icons/fa";
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
      <div className="modal-box mx-auto border-2 border-slate-700 shadow-[4px_4px_0px_rgba(0,0,0,1)] p-4 max-h-screen overflow-y-auto bg-[#F5F5DC]">
        <div className="flex justify-between items-center p-2">
          <h2 className="text-lg font-bold text-black">{athlete ? "Edit Athlete" : "Add Athlete"}</h2>
          <div className="flex gap-2">
            {/* Close Button */}
            <button type="button" className="btn btn-sm bg-red-500 text-black border-2 border-slate-700 hover:bg-red-600 focus:shadow-[2px_2px_0px_rgba(0,0,0,1)]" onClick={() => setIsOpen(false)}>
              <FaTimes />
            </button>

            {/* Submit Button */}
            <button
              type="submit"
              form="athleteForm" // Connect button with form ID
              className="btn btn-sm bg-blue-500 text-black border-2 border-slate-700 hover:bg-blue-600 focus:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
            >
              <FaCheck />
            </button>
          </div>
        </div>

        {/* Form yang bisa di-scroll */}
        <form id="athleteForm" onSubmit={handleSubmit} className="overflow-y-auto max-h-[60vh] pr-2">
          <div className="form-control mb-2">
            <label className="label">
              <span className="label-text text-black">Name</span>
            </label>
            <input type="text" className="input input-sm bg-slate-500 focus:shadow-[inset_0_0_5px_rgba(0,0,0,0.8),_inset_0_0_10px_rgba(255,255,255,0.2)] text-white" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-control mb-2">
            <label className="label">
              <span className="label-text text-black">Team</span>
            </label>
            <select className="select select-sm bg-slate-500 focus:shadow-[inset_0_0_5px_rgba(0,0,0,0.8),_inset_0_0_10px_rgba(255,255,255,0.2)] text-white" value={team} onChange={(e) => setTeam(e.target.value)} required>
              <option value="" disabled>
                Select a team
              </option>
              <option value="Merah">Merah</option>
              <option value="Biru">Biru</option>
            </select>
          </div>
          <div className="form-control mb-2">
            <label className="label">
              <span className="label-text text-black">Martial Art</span>
            </label>
            <input type="text" className="input input-sm bg-slate-500 focus:shadow-[inset_0_0_5px_rgba(0,0,0,0.8),_inset_0_0_10px_rgba(255,255,255,0.2)] text-white" value={martial} onChange={(e) => setMartial(e.target.value)} required />
          </div>
          <div className="form-control mb-2">
            <label className="label">
              <span className="label-text text-black">Height</span>
            </label>
            <input
              type="text"
              className="input input-sm bg-slate-500 focus:shadow-[inset_0_0_5px_rgba(0,0,0,0.8),_inset_0_0_10px_rgba(255,255,255,0.2)] text-white"
              placeholder="cm"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              required
            />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text text-black">Weight</span>
            </label>
            <input
              type="text"
              className="input input-sm bg-slate-500 focus:shadow-[inset_0_0_5px_rgba(0,0,0,0.8),_inset_0_0_10px_rgba(255,255,255,0.2)] text-white"
              placeholder="kg"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
            />
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
