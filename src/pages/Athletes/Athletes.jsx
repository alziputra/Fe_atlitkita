import { useContext, useState } from "react";
import { AthleteContext } from "../../context/AthleteContext";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import AthleteModal from "./AthleteModal";
import ModalConfirmation from "../../components/ModalConfirmation";
import toast from "react-hot-toast";

const Athletes = () => {
  const { athletes, loading, error, deleteAthlete } = useContext(AthleteContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedAthlete, setSelectedAthlete] = useState(null);

  const handleAdd = () => {
    setSelectedAthlete(null); // Reset untuk mode add
    setIsModalOpen(true);
  };

  const handleEdit = (athlete) => {
    setSelectedAthlete(athlete); // Set athlete untuk di-edit
    setIsModalOpen(true);
  };

  const handleDelete = (athlete) => {
    setSelectedAthlete(athlete); // Set athlete untuk dihapus
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteAthlete(selectedAthlete.athlete_id);
      toast.success("Data atlet berhasil dihapus!"); // Toast success
    } catch (err) {
      toast.error("Gagal menghapus data atlet: " + err.message); // Toast error
    } finally {
      setIsConfirmOpen(false);
    }
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
              <th>Martial Art</th>
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
                  <button className="btn btn-error btn-xs" onClick={() => handleDelete(athlete)}>
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

      {isConfirmOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <ModalConfirmation message="Apakah Anda yakin ingin menghapus atlet ini?" onConfirm={confirmDelete} onCancel={() => setIsConfirmOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Athletes;
