import PropTypes from "prop-types";
import { BiFirstPage, BiSkipNext, BiSkipPrevious, BiLastPage } from "react-icons/bi";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pagesToShow = 3; // Maksimal 5 halaman yang akan ditampilkan di sekitar currentPage
  const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex justify-center mt-4 gap-2">
      <div className="flex btn-group gap-[1px]">
        {/* Tombol halaman pertama */}
        {currentPage > 1 && (
          <>
            <button className="btn btn-sm border-2 bg-[#F5F5DC] hover:bg-orange-300 text-zinc-700" onClick={() => onPageChange(1)}>
              <BiFirstPage />
            </button>
            <button className="btn btn-sm border-2 bg-[#F5F5DC] hover:bg-orange-300 text-zinc-700" onClick={handlePrevious}>
              <BiSkipPrevious />
            </button>
          </>
        )}

        {/* Halaman sebelumnya dan berikutnya di sekitar currentPage */}
        {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
          <button key={page} className={`btn btn-sm border-2 bg-[#F5F5DC] hover:bg-orange-300 text-zinc-700 ${currentPage === page ? "btn-active" : ""}`} onClick={() => onPageChange(page)}>
            {page}
          </button>
        ))}

        {/* Tombol halaman terakhir */}
        {currentPage < totalPages && (
          <>
            <button className="btn btn-sm border-2 bg-[#F5F5DC] hover:bg-orange-300 text-zinc-700" onClick={handleNext}>
              <BiSkipNext />
            </button>
            <button className="btn btn-sm border-2 bg-[#F5F5DC] hover:bg-orange-300 text-zinc-700" onClick={() => onPageChange(totalPages)}>
              <BiLastPage />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
