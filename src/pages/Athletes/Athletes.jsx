import { useContext, useState } from "react";
import { AthleteContext } from "../../context/AthleteContext";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import AthleteModal from "./AthleteModal";

const Athletes = () => {
  const { athletes, loading, error, deleteAthlete } = useContext(AthleteContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAthlete, setSelectedAthlete] = useState(null);

  const handleAdd = () => {
    setSelectedAthlete(null); 
    setIsModalOpen(true);
  };

  const handleEdit = (athlete) => {
    setSelectedAthlete(athlete); 
    setIsModalOpen(true);
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Athletes</h2>
        <button className="btn btn-primary" onClick={handleAdd}>
          <FaPlus className="mr-2" />
          Add Athlete
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full table-zebra">
          <thead>
            <tr>
              <th>Name</th>
              <th>Team</th>
              <th>Martial</th>
              <th>Height</th>
              <th>Weight</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {athletes.map((athlete) => (
              <tr key={athlete.athlete_id}>
                <td>{athlete.name}</td>
                <td>{athlete.team}</td>
                <td>{athlete.martial}</td>
                <td>{athlete.height}</td>
                <td>{athlete.weight}</td>
                <td className="flex justify-center space-x-2">
                  <button className="btn btn-warning btn-xs" onClick={() => handleEdit(athlete)}>
                    <FaEdit className="mr-1" />
                    Edit
                  </button>
                  <button className="btn btn-error btn-xs" onClick={() => deleteAthlete(athlete.athlete_id)}>
                    <FaTrashAlt className="mr-1" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && <AthleteModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} athlete={selectedAthlete} />}
    </div>
  );
};

export default Athletes;
