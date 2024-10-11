import PropTypes from "prop-types";

const ErrorDisplay = ({ message }) => {
  return (
    <div className="toast toast-start">
      <div className="alert alert-error">
        <span>{message} HAHA HAHAHHA</span>
      </div>
    </div>
  );
};

ErrorDisplay.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorDisplay;
