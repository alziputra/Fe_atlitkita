import PropTypes from "prop-types";

const ModalConfirmation = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="p-4 border-black border-2 shadow-[4px_4px_0px_rgba(0,0,0,1)] bg-white">
      <p className="text-gray-700">{message}</p>
      <div className="mt-4 flex justify-between">
        <button className="bg-[#FF6700] text-white px-3 py-1 border-black border-2 shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:bg-[#ff4500] active:shadow-[4px_4px_0px_rgba(0,0,0,1)]" onClick={onConfirm}>
          Ya
        </button>
        <button className="bg-[#A6FAFF] text-black px-3 py-1 border-black border-2 shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:bg-[#79F7FF] active:shadow-[4px_4px_0px_rgba(0,0,0,1)]" onClick={onCancel}>
          Tidak
        </button>
      </div>
    </div>
  );
};

ModalConfirmation.propTypes = {
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ModalConfirmation;
