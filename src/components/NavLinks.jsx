import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export const NavLinks = ({ user }) => {
  useEffect(() => {
    console.log("User Role:", user.role_name); // Debugging untuk melihat apakah role terisi dengan benar
  }, [user]);

  return (
    <ul className="flex flex-col sm:flex-col lg:flex-row lg:space-x-4 space-y-2 lg:space-y-0 text-center">
      {/* Tautan ke Dashboard, terlihat oleh semua peran */}
      <li className="w-full">
        <Link to="/dashboard" className="block w-full py-2 hover:bg-primary hover:text-white rounded-lg">
          Dashboard
        </Link>
      </li>

      {/* Tautan hanya untuk Admin */}
      {user.role_name === "admin" && (
        <>
          <li className="w-full">
            <Link to="/athletes" className="block w-full py-2 hover:bg-primary hover:text-white rounded-lg">
              Athletes
            </Link>
          </li>
          <li className="w-full">
            <Link to="/competitions" className="block w-full py-2 hover:bg-primary hover:text-white rounded-lg">
              Competitions
            </Link>
          </li>
          <li className="w-full">
            <Link to="/results" className="block w-full py-2 hover:bg-primary hover:text-white rounded-lg">
              Results
            </Link>
          </li>
        </>
      )}

      {/* Tautan hanya untuk Judge */}
      {user.role_name === "judge" && (
        <li className="w-full">
          <Link to="/scores" className="block w-full py-2 hover:bg-primary hover:text-white rounded-lg">
            Scores
          </Link>
        </li>
      )}
    </ul>
  );
};

// Menambahkan propTypes untuk validasi properti
NavLinks.propTypes = {
  user: PropTypes.shape({
    role_name: PropTypes.string.isRequired, // role_name adalah string yang wajib ada di dalam objek user
  }).isRequired,
};
