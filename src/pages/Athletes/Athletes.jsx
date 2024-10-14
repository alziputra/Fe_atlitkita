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
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Athletes</h2>
          <button className="btn bg-[#FF6700] text-white border-2 border-[#CC5200] hover:bg-[#FF4500] hover:text-white btn-sm flex hover:shadow-[2px_2px_0px_rgba(255,255,255,1)] items-center" onClick={handleAdd}>
            <FaPlus />
            Add Athlete
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="table w-full text-zinc-700 border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] bg-gradient-to-r from-[#9CDBA6] to-[#468585]">
            <thead className="bg-[#F4A460] border-b-4 border-black text-gray-700">
              <tr className="text-center">
                <th className="border-black border-r-2 p-2">No</th>
                <th className="border-black border-r-2 p-2">Name</th>
                <th className="border-black border-r-2 p-2">Team</th>
                <th className="border-black border-r-2 p-2">Martial Art</th>
                <th className="border-black border-r-2 p-2">Height</th>
                <th className="border-black border-r-2 p-2">Weight</th>
                <th className="text-center border-black p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {athletes.map((athlete, index) => (
                <tr key={athlete.athlete_id} className="hover:bg-[#F5F5DC]">
                  <td className="border-black border-r-2 p-2 text-center">{index + 1}</td>
                  <td className="border-black border-r-2 p-2">{athlete.name}</td>
                  <td className="border-black border-r-2 p-2">{athlete.team}</td>
                  <td className="border-black border-r-2 p-2">{athlete.martial}</td>
                  <td className="border-black border-r-2 p-2">{athlete.height} cm</td>
                  <td className="border-black border-r-2 p-2">{athlete.weight} kg</td>
                  <td className="flex justify-center space-x-2 p-2">
                    <button className="btn bg-[#FFA07A] text-black border-2 border-black hover:bg-[#FF7F50] btn-xs" onClick={() => handleEdit(athlete)}>
                      <FaEdit />
                    </button>
                    <button className="btn bg-[#a33521] text-white border-2 border-[#CC3E28] hover:bg-[#ee4b4b] hover:border-[#B22222] hover:text-white btn-xs" onClick={() => handleDelete(athlete)}>
                      <FaTrashAlt />
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
    </div>
  );
};

export default Athletes;
