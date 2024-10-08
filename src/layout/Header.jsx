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
    <header className="bg-base-100 shadow-lg p-4 flex flex-col sm:flex-col lg:flex-row justify-between items-center">
      <div className="flex items-center mb-4 lg:mb-0">
        {/* Logo */}
        <img src={Logo} alt="App Logo" className="h-10 w-40" />
      </div>

      {/* Hamburger Menu Button for Mobile */}
      <div className="flex lg:hidden mb-4 sm:mb-0">
        <button className="btn btn-square btn-ghost text-2xl" onClick={toggleMenu}>
          <FaBars />
        </button>
      </div>

      {/* Navigasi: NavLinks untuk pengguna yang login */}
      <nav className={`lg:flex lg:flex-row sm:flex-col sm:items-start items-center ${isMenuOpen ? "block" : "hidden"} lg:block`}>
        <div className="flex flex-col lg:flex-row lg:space-x-4 items-center lg:items-center p-4 lg:p-0">
          {user && <NavLinks user={user} />}
          {user && (
            <div className="flex flex-col lg:flex-row items-center lg:space-x-4 mt-4 lg:mt-0">
              <span className="mb-2 lg:mb-0">Hello, {user.name}</span>
              <button onClick={logout} className="btn btn-error px-4 py-2 rounded-lg">
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
