import PropTypes from "prop-types";

const ErrorDisplay = ({ message }) => {
  return (
    <div className="col-span-3 text-red-500">
      <p>{message} HAHA HAHAHHA</p>
    </div>
  );
};

ErrorDisplay.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorDisplay;
