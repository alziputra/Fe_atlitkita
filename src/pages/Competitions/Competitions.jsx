import { useContext, useState } from "react";
import { CompetitionContext } from "../../context/CompetitionContext";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import CompetitionModal from "./CompetitionModal";
import ModalConfirmation from "../../components/ModalConfirmation";
import toast from "react-hot-toast";

const Competitions = () => {
  const { competitions, loading, error, deleteCompetition } = useContext(CompetitionContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedCompetition, setSelectedCompetition] = useState(null);

  const handleAdd = () => {
    setSelectedCompetition(null); // Reset untuk mode add
    setIsModalOpen(true);
  };

  const handleEdit = (competition) => {
    setSelectedCompetition(competition); // Set competition untuk di-edit
    setIsModalOpen(true);
  };

  const handleDelete = (competition) => {
    setSelectedCompetition(competition); // Set competition untuk dihapus
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteCompetition(selectedCompetition.competition_id);
      toast.success("Data kompetisi berhasil dihapus!"); // Toast success
    } catch (err) {
      toast.error("Gagal menghapus data kompetisi: " + err.message); // Toast error
    } finally {
      setIsConfirmOpen(false);
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Competitions</h2>
        <button className="btn btn-primary btn-sm" onClick={handleAdd}>
          <FaPlus className="mr-1" />
          Add Competition
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full table-zebra">
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {competitions.map((competition) => (
              <tr key={competition.competition_id}>
                <td>{competition.competition_name}</td>
                <td>{new Date(competition.competition_date).toLocaleDateString()}</td>
                <td>{competition.status}</td>
                <td className="flex justify-center space-x-2">
                  <button className="btn btn-warning btn-xs" onClick={() => handleEdit(competition)}>
                    <FaEdit className="mr-1" />
                    Edit
                  </button>
                  <button className="btn btn-error btn-xs" onClick={() => handleDelete(competition)}>
                    <FaTrashAlt className="mr-1" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && <CompetitionModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} competition={selectedCompetition} />}

      {isConfirmOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <ModalConfirmation message="Apakah Anda yakin ingin menghapus kompetisi ini?" onConfirm={confirmDelete} onCancel={() => setIsConfirmOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Competitions;
