import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { NavLinks } from "../components/NavLinks";
import { FaBars } from "react-icons/fa";
import Logo from "../assets/logo.png";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle menu untuk tampilan mobile
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <img src={Logo} alt="App Logo" className="h-10 w-40 mr-2" />
      </div>

      <button className="block lg:hidden text-2xl" onClick={toggleMenu}>
        <FaBars />
      </button>

      {/* Navigasi: NavLinks untuk pengguna yang login */}
      <nav className={`lg:flex ${isMenuOpen ? "block" : "hidden"} lg:block absolute lg:relative top-16 lg:top-0 left-0 lg:left-auto w-full lg:w-auto bg-gray-800 lg:bg-transparent`}>
        <div className="flex flex-col lg:flex-row lg:space-x-4 items-center lg:items-center p-4 lg:p-0">
          {user && <NavLinks user={user} />} {/* Tampilkan NavLinks jika user sudah login */}
          {user && (
            <div className="flex flex-col lg:flex-row items-center lg:space-x-4 mt-4 lg:mt-0">
              <span>Hello, {user.name}</span>
              <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
