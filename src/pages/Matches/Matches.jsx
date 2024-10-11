import { useContext, useState } from "react";
import { MatchContext } from "../../context/MatchContext";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import MatchModal from "./MatchModal";
import ModalConfirmation from "../../components/ModalConfirmation";
import toast from "react-hot-toast";

const Matches = () => {
  const { matches, loading, error, deleteMatch } = useContext(MatchContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);

  const handleAdd = () => {
    setSelectedMatch(null); // Reset untuk mode add
    setIsModalOpen(true);
  };

  const handleEdit = (match) => {
    setSelectedMatch(match); // Set match untuk di-edit
    setIsModalOpen(true);
  };

  const handleDelete = (match) => {
    setSelectedMatch(match); // Set match untuk dihapus
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteMatch(selectedMatch.match_id);
      toast.success("Data pertandingan berhasil dihapus!"); // Toast success
    } catch (err) {
      toast.error("Gagal menghapus data pertandingan: " + err.message); // Toast error
    } finally {
      setIsConfirmOpen(false);
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Matches</h2>
        <button className="btn btn-primary btn-sm" onClick={handleAdd}>
          <FaPlus className="mr-1" />
          Add Match
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full table-zebra">
          <thead>
            <tr>
              <th>Competition</th>
              <th>Athlete 1</th>
              <th>Athlete 2</th>
              <th>Match Date</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((match) => (
              <tr key={match.match_id}>
                <td>{match.competition_name}</td>
                <td>{match.athlete1_name}</td>
                <td>{match.athlete2_name}</td>
                <td>{new Date(match.match_date).toLocaleString()}</td>
                <td className="flex justify-center space-x-2">
                  <button className="btn btn-warning btn-xs" onClick={() => handleEdit(match)}>
                    <FaEdit className="mr-1" />
                    Edit
                  </button>
                  <button className="btn btn-error btn-xs" onClick={() => handleDelete(match)}>
                    <FaTrashAlt className="mr-1" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && <MatchModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} match={selectedMatch} />}

      {isConfirmOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <ModalConfirmation message="Apakah Anda yakin ingin menghapus pertandingan ini?" onConfirm={confirmDelete} onCancel={() => setIsConfirmOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Matches;
