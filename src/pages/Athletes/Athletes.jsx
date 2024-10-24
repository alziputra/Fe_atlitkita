import { useContext, useState } from "react";
import { AthleteContext } from "../../context/AthleteContext";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import AthleteModal from "./AthleteModal";
import ModalConfirmation from "../../components/ModalConfirmation";
import toast from "react-hot-toast";
import Pagination from "../../components/Pagination";
import Search from "../../components/Search";

const Athletes = () => {
  const { athletes, loading, error, deleteAthlete } = useContext(AthleteContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedAthlete, setSelectedAthlete] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const filteredAthletes = athletes.filter((athlete) => athlete.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const totalPages = Math.ceil(filteredAthletes.length / recordsPerPage);
  const currentAthletes = filteredAthletes.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage);

  const handleAdd = () => {
    setSelectedAthlete(null);
    setIsModalOpen(true);
  };

  const handleEdit = (athlete) => {
    setSelectedAthlete(athlete);
    setIsModalOpen(true);
  };

  const handleDelete = (athlete) => {
    setSelectedAthlete(athlete);
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteAthlete(selectedAthlete.athlete_id);
      toast.success("Data atlet berhasil dihapus!");
    } catch (err) {
      toast.error("Gagal menghapus data atlet: " + err.message);
    } finally {
      setIsConfirmOpen(false);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] rounded-lg p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-600">Athletes</h2>
        </div>
        <div className="flex gap-2 justify-end p-2">
          <Search searchQuery={searchQuery} onSearchChange={handleSearch} placeholder="Search by name" />
          <button className="flex btn btn-sm bg-[#2ac34b] hover:bg-[#74f590] text-white hover:text-black border-2 border-black hover:shadow-[2px_2px_0px_rgba(0,0,0,1)]" onClick={handleAdd}>
            <FaPlus />
            Add
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="table w-full bg-[#F5F5DC] text-zinc-700 border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)]">
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
              {currentAthletes.length > 0 ? (
                currentAthletes.map((athlete, index) => (
                  <tr key={athlete.athlete_id} className="hover:bg-[#e3dd9a]">
                    <td className="border-black border-r-2 p-2 text-center">{(currentPage - 1) * recordsPerPage + index + 1}</td>
                    <td className="border-black border-r-2 p-2">{athlete.name}</td>
                    <td className="border-black border-r-2 p-2">{athlete.team}</td>
                    <td className="border-black border-r-2 p-2">{athlete.martial}</td>
                    <td className="border-black border-r-2 p-2">{athlete.height} cm</td>
                    <td className="border-black border-r-2 p-2">{athlete.weight} kg</td>
                    <td className="flex justify-center space-x-2 p-2">
                      <button className="btn bg-[#378CE7] text-white border-2 border-[#378CE7] hover:border-black hover:bg-[#5aa9ff] btn-xs" onClick={() => handleEdit(athlete)}>
                        <FaEdit />
                      </button>
                      <button className="btn bg-[#FF204E] text-white border-2 border-[#FF204E] hover:border-black hover:bg-[#ff5b7c] hover:text-white btn-xs" onClick={() => handleDelete(athlete)}>
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    No athletes found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Gunakan komponen Pagination */}
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />

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
