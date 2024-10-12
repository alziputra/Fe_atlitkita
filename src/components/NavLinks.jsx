import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export const NavLinks = ({ user }) => {
  useEffect(() => {
    console.log("User Role:", user.role_name); // Debugging untuk melihat apakah role terisi dengan benar
  }, [user]);

  return (
    <ul className="menu w-full lg:menu-horizontal bg-[#F5F5DC] border-black border-2 rounded-box gap-3 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
      {/* Tautan ke Dashboard, terlihat oleh semua peran */}
      <li className="w-full sm:w-auto">
        <Link to="/dashboard" className="w-full sm:w-auto py-2 px-3 border-black border-2 bg-white text-black hover:bg-[#FF6700] hover:text-black rounded-lg shadow-[4px_4px_0px_rgba(0,0,0,1)]">
          Dashboard
        </Link>
      </li>

      {/* Tautan hanya untuk Admin */}
      {user.role_name === "admin" && (
        <>
          <li className="w-full sm:w-auto">
            <Link to="/athletes" className="w-full sm:w-auto py-2 px-3 border-black border-2 bg-white text-black hover:bg-[#FF6700] hover:text-white rounded-lg shadow-[4px_4px_0px_rgba(0,0,0,1)]">
              Athletes
            </Link>
          </li>
          <li className="w-full sm:w-auto">
            <Link to="/competitions" className="w-full sm:w-auto py-2 px-3 border-black border-2 bg-white text-black hover:bg-[#FF6700] hover:text-white rounded-lg shadow-[4px_4px_0px_rgba(0,0,0,1)]">
              Competitions
            </Link>
          </li>
          <li className="w-full sm:w-auto">
            <Link to="/matches" className="w-full sm:w-auto py-2 px-3 border-black border-2 bg-white text-black hover:bg-[#FF6700] hover:text-white rounded-lg shadow-[4px_4px_0px_rgba(0,0,0,1)]">
              Matches
            </Link>
          </li>
          <li className="w-full sm:w-auto">
            <Link to="/results" className="w-full sm:w-auto py-2 px-3 border-black border-2 bg-white text-black hover:bg-[#FF6700] hover:text-white rounded-lg shadow-[4px_4px_0px_rgba(0,0,0,1)]">
              Results
            </Link>
          </li>
        </>
      )}

      {/* Tautan hanya untuk Judge */}
      {user.role_name === "judge" && (
        <li className="w-full sm:w-auto">
          <Link to="/scores" className="w-full sm:w-auto py-2 px-3 border-black border-2 bg-white text-black hover:bg-[#A6FAFF] hover:text-black rounded-lg shadow-[4px_4px_0px_rgba(0,0,0,1)]">
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
