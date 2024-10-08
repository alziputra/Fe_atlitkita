import PropTypes from 'prop-types';

const ModalConfirmation = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="p-4">
      <p>{message}</p>
      <div className="mt-4 flex justify-between">
        <button
          className="bg-red-500 text-white px-3 py-1 rounded"
          onClick={onConfirm}
        >
          Ya
        </button>
        <button
          className="bg-gray-500 text-white px-3 py-1 rounded"
          onClick={onCancel}
        >
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
