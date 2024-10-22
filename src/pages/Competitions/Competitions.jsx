import { useContext, useState } from "react";
import { CompetitionContext } from "../../context/CompetitionContext";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import CompetitionModal from "./CompetitionModal";
import ModalConfirmation from "../../components/ModalConfirmation";
import toast from "react-hot-toast";
import Pagination from "../../components/Pagination";
import Search from "../../components/Search";

const Competitions = () => {
  const { competitions, loading, error, deleteCompetition } = useContext(CompetitionContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedCompetition, setSelectedCompetition] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5; // Jumlah record per halaman

  // Search state
  const [searchQuery, setSearchQuery] = useState("");

  // Fungsi untuk handle pencarian
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset ke halaman pertama saat pencarian berubah
  };

  // Filter kompetisi berdasarkan search query
  const filteredCompetitions = competitions.filter((competition) => competition.competition_name.toLowerCase().includes(searchQuery.toLowerCase()));

  // Hitung jumlah halaman
  const totalPages = Math.ceil(filteredCompetitions.length / recordsPerPage);

  // Data kompetisi berdasarkan pagination
  const currentCompetitions = filteredCompetitions.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage);

  const handleAdd = () => {
    setSelectedCompetition(null);
    setIsModalOpen(true);
  };

  const handleEdit = (competition) => {
    setSelectedCompetition(competition);
    setIsModalOpen(true);
  };

  const handleDelete = (competition) => {
    setSelectedCompetition(competition);
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteCompetition(selectedCompetition.competition_id);
      toast.success("Data kompetisi berhasil dihapus!");
    } catch (err) {
      toast.error("Gagal menghapus data kompetisi: " + err.message);
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
          <h2 className="text-2xl font-bold text-slate-600">Competitions</h2>
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
                <th className="border-black border-r-2 p-2">Location</th>
                <th className="border-black border-r-2 p-2">Date</th>
                <th className="border-black border-r-2 p-2">Status</th>
                <th className="border-black p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentCompetitions.length > 0 ? (
                currentCompetitions.map((competition, index) => (
                  <tr key={competition.competition_id} className="hover:bg-[#e3dd9a]">
                    <td className="border-black border-r-2 p-2 text-center">{(currentPage - 1) * recordsPerPage + index + 1}</td>
                    <td className="border-black border-r-2 p-2">{competition.competition_name}</td>
                    <td className="border-black border-r-2 p-2">{competition.location}</td>
                    <td className="border-black border-r-2 p-2">{new Date(competition.competition_date).toLocaleDateString()}</td>
                    <td className="border-black border-r-2 p-2 text-center">
                      <span
                        className={`px-2 py-1 rounded border-2 border-slate-500 ${
                          competition.status === "ongoing"
                            ? "bg-yellow-300 text-yellow-900"
                            : competition.status === "finished"
                            ? "bg-green-300 text-green-900"
                            : competition.status === "upcoming"
                            ? "bg-red-300 text-red-900"
                            : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        {competition.status}
                      </span>
                    </td>
                    <td className="flex justify-center space-x-2 p-2">
                      <button className="btn bg-[#378CE7] text-white border-2 border-[#378CE7] hover:border-black hover:bg-[#5aa9ff] btn-xs" onClick={() => handleEdit(competition)}>
                        <FaEdit />
                      </button>
                      <button className="btn bg-[#FF204E] text-white border-2 border-[#FF204E] hover:border-black hover:bg-[#ff5b7c] hover:text-white btn-xs" onClick={() => handleDelete(competition)}>
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    No competitions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />

        {isModalOpen && <CompetitionModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} competition={selectedCompetition} />}

        {isConfirmOpen && (
          <div className="modal modal-open">
            <div className="modal-box">
              <ModalConfirmation message="Apakah Anda yakin ingin menghapus kompetisi ini?" onConfirm={confirmDelete} onCancel={() => setIsConfirmOpen(false)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Competitions;
