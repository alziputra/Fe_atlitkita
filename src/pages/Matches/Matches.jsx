import { useContext, useState } from "react";
import { MatchContext } from "../../context/MatchContext";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import MatchModal from "./MatchModal";
import ModalConfirmation from "../../components/ModalConfirmation";
import toast from "react-hot-toast";
import Pagination from "../../components/Pagination";
import Search from "../../components/Search";

const Matches = () => {
  const { matches, loading, error, deleteMatch } = useContext(MatchContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5; // Biar datanya tampil per 5 di tiap halaman

  // Search state
  const [searchQuery, setSearchQuery] = useState("");

  // Fungsi untuk handle pencarian
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset halaman tiap kali ada perubahan di search
  };

  // Filter pertandingan berdasarkan search query
  const filteredMatches = matches.filter((match) => match.match_number.toLowerCase().includes(searchQuery.toLowerCase()));

  // Hitung jumlah halaman
  const totalPages = Math.ceil(filteredMatches.length / recordsPerPage);

  // Data pertandingan sesuai dengan pagination
  const currentMatches = filteredMatches.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage);

  const handleAdd = () => {
    setSelectedMatch(null);
    setIsModalOpen(true);
  };

  const handleEdit = (match) => {
    setSelectedMatch(match);
    setIsModalOpen(true);
  };

  const handleDelete = (match) => {
    setSelectedMatch(match);
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteMatch(selectedMatch.match_id);
      toast.success("Data pertandingan berhasil dihapus!");
    } catch (err) {
      toast.error("Gagal menghapus data pertandingan: " + err.message);
    } finally {
      setIsConfirmOpen(false);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) return <p className="text-center">Loading... 🎾</p>;
  if (error) return <p className="text-center text-red-500">Uh-oh! {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] rounded-lg p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-600">Matches</h2>
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
                <th className="border-black border-r-2 p-2">Competition</th>
                <th className="border-black border-r-2 p-2">Athlete 1</th>
                <th className="border-black border-r-2 p-2">Athlete 2</th>
                <th className="border-black border-r-2 p-2">Match Number</th>
                <th className="border-black border-r-2 p-2">Match Date</th>
                <th className="text-center border-black p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentMatches.length > 0 ? (
                currentMatches.map((match, index) => (
                  <tr key={match.match_id} className="hover:bg-[#e3dd9a]">
                    <td className="border-black border-r-2 p-2 text-center">{(currentPage - 1) * recordsPerPage + index + 1}</td>
                    <td className="border-black border-r-2 p-2">{match.competition_name}</td>
                    <td className="border-black border-r-2 p-2 text-blue-600 font-medium">{match.athlete1_name}</td>
                    <td className="border-black border-r-2 p-2 text-red-600 font-medium">{match.athlete2_name}</td>
                    <td className="border-black border-r-2 p-2">{match.match_number}</td>
                    <td className="border-black border-r-2 p-2">{new Date(match.match_date).toLocaleString()}</td>
                    <td className="flex justify-center space-x-2 p-2">
                      <button className="btn bg-[#378CE7] text-white border-2 border-[#378CE7] hover:border-black hover:bg-[#5aa9ff] btn-xs" onClick={() => handleEdit(match)}>
                        <FaEdit />
                      </button>
                      <button className="btn bg-[#FF204E] text-white border-2 border-[#FF204E] hover:border-black hover:bg-[#ff5b7c] hover:text-white btn-xs" onClick={() => handleDelete(match)}>
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    No matches found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />

        {isModalOpen && <MatchModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} match={selectedMatch} />}

        {isConfirmOpen && (
          <div className="modal modal-open">
            <div className="modal-box">
              <ModalConfirmation message="Apakah Anda yakin ingin menghapus pertandingan ini?" onConfirm={confirmDelete} onCancel={() => setIsConfirmOpen(false)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Matches;
