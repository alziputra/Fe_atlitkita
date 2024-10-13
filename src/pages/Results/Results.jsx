import { useContext } from "react";
import { ResultContext } from "../../context/ResultContext";
import { FaPrint, FaTrashAlt } from "react-icons/fa";
import toast from "react-hot-toast";

const Results = () => {
  const { results, loading, error, deleteResult } = useContext(ResultContext);

  // Fungsi untuk mencetak hasil pertandingan
  const handlePrint = () => {
    window.print(); // Panggil fungsi print bawaan browser
  };

  const handleDelete = async (result) => {
    try {
      await deleteResult(result.result_id);
      toast.success("Data hasil pertandingan berhasil dihapus!"); // Toast success
    } catch (err) {
      toast.error("Gagal menghapus data hasil pertandingan: " + err.message); // Toast error
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Results</h2>
      <div className="overflow-x-auto">
        <table className="table w-full border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)]">
          <thead className="bg-[#F4A460] border-b-4 border-black text-gray-700">
            <tr>
              <th className="border-black border-r-2 p-2">Competition Name</th>
              <th className="border-black border-r-2 p-2">Athlete 1</th>
              <th className="border-black border-r-2 p-2">Athlete 2</th>
              <th className="border-black border-r-2 p-2">Athlete 1 Score</th>
              <th className="border-black border-r-2 p-2">Athlete 2 Score</th>
              <th className="border-black border-r-2 p-2">Winner</th>
              <th className="border-black border-r-2 p-2">Date</th>
              <th className="text-center border-black p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result.result_id} className="hover:bg-[#F5F5DC]">
                <td className="border-black border-r-2 p-2">{result.competition_name}</td>
                <td className="border-black border-r-2 p-2">{result.athlete1_name}</td>
                <td className="border-black border-r-2 p-2">{result.athlete2_name}</td>
                <td className="border-black border-r-2 p-2">{result.athlete1_final_score}</td>
                <td className="border-black border-r-2 p-2">{result.athlete2_final_score}</td>
                <td className="border-black border-r-2 p-2">{result.winner_name}</td>
                <td className="border-black border-r-2 p-2">{new Date(result.created_at).toLocaleString()}</td>
                <td className="flex justify-center space-x-2 p-2 text-sm">
                  <button className="btn bg-[#FFA07A] text-black border-2 border-black hover:bg-[#FF7F50] btn-xs" onClick={handlePrint}>
                    <FaPrint className="mr-1" />
                    Print
                  </button>
                  <button className="btn bg-[#FF6347] text-black border-2 border-black hover:bg-[#FF4500] btn-xs" onClick={() => handleDelete(result)}>
                    <FaTrashAlt className="mr-1" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Results;
