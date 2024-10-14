import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Widget = ({ title, data, icon, link, color }) => {
  return (
    <div className="flex justify-center items-center">
      <div className={`card w-64 border-4 border-black ${color} text-primary-content shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_rgba(0,0,0,1)]`}>
        <div className="card-body text-center p-4">
          <div className="stat-figure">
            <div className="text-4xl">{icon}</div>
          </div>
          <h2 className="text-3xl font-bold text-[#2c2a29]">{data}</h2>
          <p className="text-xl text-black">{title}</p>
          <Link to={link} className="text-sm text-white underline hover:text-gray-200 mt-2 block border-t-2 border-black pt-2">
            Selengkapnya
          </Link>
        </div>
      </div>
    </div>
  );
};

// Menambahkan propTypes untuk validasi properti
Widget.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.node.isRequired,
  link: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired, // Tambahkan validasi warna
};

export default Widget;
