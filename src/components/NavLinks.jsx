import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export const NavLinks = ({ user }) => {
  useEffect(() => {
    console.log("User Role:", user.role_name); // Debugging untuk melihat apakah role terisi dengan benar
  }, [user]);

  return (
    <ul className="menu w-full lg:menu-horizontal bg-base-100 rounded-box gap-3">
      {/* Tautan ke Dashboard, terlihat oleh semua peran */}
      <li className="w-full sm:w-auto">
        <Link to="/dashboard" className="w-full sm:w-auto py-2 hover:bg-accent hover:text-white rounded-lg">
          Dashboard
        </Link>
      </li>

      {/* Tautan hanya untuk Admin */}
      {user.role_name === "admin" && (
        <>
          <li className="w-full sm:w-auto">
            <Link to="/athletes" className="w-full sm:w-auto py-2 hover:bg-accent hover:text-white rounded-lg">
              Athletes
            </Link>
          </li>
          <li className="w-full sm:w-auto">
            <Link to="/competitions" className="w-full sm:w-auto py-2 hover:bg-accent hover:text-white rounded-lg">
              Competitions
            </Link>
          </li>
          <li className="w-full sm:w-auto">
            <Link to="/matches" className="w-full sm:w-auto py-2 hover:bg-accent hover:text-white rounded-lg">
              Matches
            </Link>
          </li>
          <li className="w-full sm:w-auto">
            <Link to="/results" className="w-full sm:w-auto py-2 hover:bg-accent hover:text-white rounded-lg">
              Results
            </Link>
          </li>
        </>
      )}

      {/* Tautan hanya untuk Judge */}
      {user.role_name === "judge" && (
        <li className="w-full sm:w-auto">
          <Link to="/scores" className="w-full sm:w-auto py-2 hover:bg-accent hover:text-white rounded-lg">
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
    role_name: PropTypes.string,
  }),
};
