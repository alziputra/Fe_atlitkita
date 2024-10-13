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
        <button className="btn bg-[#A6FAFF] text-black border-2 border-black hover:bg-[#79F7FF] btn-sm flex items-center" onClick={handleAdd}>
          <FaPlus />
          Add Match
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)]">
          <thead className="bg-[#F4A460] border-b-4 border-black text-gray-700">
            <tr className="text-center">
              <th className="border-black border-r-2 p-2">No</th>
              <th className="border-black border-r-2 p-2">Competition</th>
              <th className="border-black border-r-2 p-2">Athlete 1</th>
              <th className="border-black border-r-2 p-2">Athlete 2</th>
              <th className="border-black border-r-2 p-2">Match Date</th>
              <th className="text-center border-black p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((match, index) => (
              <tr key={match.match_id} className="hover:bg-[#F5F5DC]">
                <td className="border-black border-r-2 p-2 text-center">{index + 1}</td>
                <td className="border-black border-r-2 p-2">{match.competition_name}</td>
                <td className="border-black border-r-2 p-2">{match.athlete1_name}</td>
                <td className="border-black border-r-2 p-2">{match.athlete2_name}</td>
                <td className="border-black border-r-2 p-2">{new Date(match.match_date).toLocaleString()}</td>
                <td className="flex justify-center space-x-2 p-2 text-sm">
                  <button className="btn bg-[#FFA07A] text-black border-2 border-black hover:bg-[#FF7F50] btn-xs" onClick={() => handleEdit(match)}>
                    <FaEdit />
                  </button>
                  <button className="btn bg-[#a33521] text-white border-2 border-[#CC3E28] hover:bg-[#ee4b4b] hover:border-[#B22222] hover:text-white btn-xs" onClick={() => handleDelete(match)}>
                    <FaTrashAlt />
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
