import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="flex justify-between">
        <div>
          <Link to="/dashboard" className="mr-4">
            Dashboard
          </Link>
        </div>
        <div>
          {user && ( // Hanya tampilkan tombol logout jika user sudah login
            <>
              <span className="mr-4">Hello, {user.name}</span>
              <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
