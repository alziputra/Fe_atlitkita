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
        <table className="table w-full table-zebra">
          <thead>
            <tr>
              <th>Competition Name</th>
              <th>Athlete 1</th>
              <th>Athlete 2</th>
              <th>Athlete 1 Score</th>
              <th>Athlete 2 Score</th>
              <th>Winner</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result.result_id}>
                <td>{result.competition_name}</td> {/* Menampilkan nama kompetisi */}
                <td>{result.athlete1_name}</td> {/* Menampilkan nama atlet 1 */}
                <td>{result.athlete2_name}</td> {/* Menampilkan nama atlet 2 */}
                <td>{result.athlete1_final_score}</td> {/* Menampilkan skor atlet 1 */}
                <td>{result.athlete2_final_score}</td> {/* Menampilkan skor atlet 2 */}
                <td>{result.winner_name}</td> {/* Menampilkan pemenang */}
                <td>{new Date(result.created_at).toLocaleString()}</td> {/* Menampilkan tanggal pembuatan */}
                <td className="flex justify-center space-x-2">
                  <button className="btn btn-warning btn-xs" onClick={handlePrint}>
                    <FaPrint className="mr-1" />
                    Print
                  </button>
                  <button className="btn btn-error btn-xs" onClick={() => handleDelete(result)}>
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
