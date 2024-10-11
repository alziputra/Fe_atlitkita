import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Widget = ({ title, count, icon, link, color }) => {
  return (
    <div className={`card bg-gradient-to-r  ${color} text-primary-content shadow-lg hover:shadow-xl transition-all transform hover:scale-105`}>
      <div className="card-body text-center">
        <div className="stat-figure">
          <div className="text-4xl">{icon}</div>
        </div>
        <h2 className="text-3xl font-bold">{count}</h2>
        <p>{title}</p>
        <Link to={link} className="text-sm text-white underline hover:text-gray-200 mt-2 block">
          Selengkapnya
        </Link>
      </div>
    </div>
  );
};

// Menambahkan propTypes untuk validasi properti
Widget.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.node.isRequired,
  link: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired, // Tambahkan validasi warna
};

export default Widget;
