import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Widget = ({ title, count, icon, link }) => {
  return (
    <div className="card bg-base-100 shadow-md border-l-4 border-accent h-full flex flex-col justify-between">
      <div className="flex justify-between items-center p-4 border-b border-b-accent">
        <div>
          <h3 className="text-lg font-semibold text-gray-300">{title}</h3>
          <p className="text-3xl font-bold text-accent">{count}</p>
        </div>
        <div className="text-4xl text-accent">{icon}</div>
      </div>
      <Link to={link} className="text-center rounded-bl-lg p-1">
        Lihat
      </Link>
    </div>
  );
};

// Menambahkan propTypes untuk validasi properti
Widget.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.node.isRequired,
  link: PropTypes.string.isRequired,
};

export default Widget;
