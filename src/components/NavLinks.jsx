import { Link } from "react-router-dom";
import { useEffect } from "react";

export const NavLinks = ({ user }) => {
  useEffect(() => {
    console.log("User Role:", user.role_name); // Debugging untuk melihat apakah role terisi dengan benar
  }, [user]);

  return (
    <ul className="flex flex-col lg:flex-row lg:space-x-4 space-y-2 lg:space-y-0 text-center">
      {/* Tautan ke Dashboard, terlihat oleh semua peran */}
      <li>
        <Link to="/dashboard" className="text-white hover:underline">
          Dashboard
        </Link>
      </li>

      {/* Tautan hanya untuk Admin */}
      {user.role_name === "admin" && (
        <>
          <li>
            <Link to="/athletes" className="text-white hover:underline">
              Athletes
            </Link>
          </li>
          <li>
            <Link to="/competitions" className="text-white hover:underline">
              Competitions
            </Link>
          </li>
          <li>
            <Link to="/results" className="text-white hover:underline">
              Results
            </Link>
          </li>
        </>
      )}

      {/* Tautan hanya untuk Judge */}
      {user.role_name === "judge" && (
        <li>
          <Link to="/scores" className="text-white hover:underline">
            Scores
          </Link>
        </li>
      )}
    </ul>
  );
};
