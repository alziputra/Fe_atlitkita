import PropTypes from "prop-types";

const Widget = ({ title, count, icon }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-3xl font-bold">{count}</p>
      </div>
      <div className="text-4xl text-blue-500">{icon}</div>
    </div>
  );
};

// Menambahkan propTypes untuk validasi properti
Widget.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.node.isRequired,
};

export default Widget;
