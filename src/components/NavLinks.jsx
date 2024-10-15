import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export const NavLinks = ({ user }) => {
  useEffect(() => {
    console.log("User Role:", user.role_name); // Debugging untuk melihat apakah role terisi dengan benar
  }, [user]);

  return (
    <ul className="menu w-full lg:menu-horizontal bg-white border-black border-2 rounded-box gap-3 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
      {/* Tautan ke Dashboard, terlihat oleh semua peran */}
      <li className="w-full sm:w-auto">
        <Link to="/dashboard" className="py-2 px-3 border-black border-2 bg-white text-lg font-medium hover:bg-[#FF6700] focus:bg-[#FF6700] text-slate-600 focus:text-white rounded-lg focus:shadow-[4px_4px_0px_rgba(0,0,0,1)]">
          Dashboard
        </Link>
      </li>

      {/* Tautan hanya untuk Admin */}
      {user.role_name === "admin" && (
        <>
          <li className="w-full sm:w-auto">
            <Link to="/athletes" className="py-2 px-3 border-black border-2 bg-white text-lg font-medium hover:bg-[#FF6700] focus:bg-[#FF6700] text-slate-600 focus:text-white rounded-lg focus:shadow-[4px_4px_0px_rgba(0,0,0,1)]">
              Athletes
            </Link>
          </li>
          <li className="w-full sm:w-auto">
            <Link to="/competitions" className="py-2 px-3 border-black border-2 bg-white text-lg font-medium hover:bg-[#FF6700] focus:bg-[#FF6700] text-slate-600 focus:text-white rounded-lg focus:shadow-[4px_4px_0px_rgba(0,0,0,1)]">
              Competitions
            </Link>
          </li>
          <li className="w-full sm:w-auto">
            <Link to="/matches" className="py-2 px-3 border-black border-2 bg-white text-lg font-medium hover:bg-[#FF6700] focus:bg-[#FF6700] text-slate-600 focus:text-white rounded-lg focus:shadow-[4px_4px_0px_rgba(0,0,0,1)]">
              Matches
            </Link>
          </li>
          <li className="w-full sm:w-auto">
            <Link to="/results" className="py-2 px-3 border-black border-2 bg-white text-lg font-medium hover:bg-[#FF6700] focus:bg-[#FF6700] text-slate-600 focus:text-white rounded-lg focus:shadow-[4px_4px_0px_rgba(0,0,0,1)]">
              Results
            </Link>
          </li>
        </>
      )}

      {/* Tautan hanya untuk Judge */}
      {user.role_name === "judge" && (
        <li className="w-full sm:w-auto">
          <Link to="/scores" className="py-2 px-3 border-black border-2 bg-white text-lg font-medium hover:bg-[#FF6700] focus:bg-[#FF6700] text-slate-600 focus:text-white rounded-lg focus:shadow-[4px_4px_0px_rgba(0,0,0,1)]">
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
