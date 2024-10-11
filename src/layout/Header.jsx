import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { NavLinks } from "../components/NavLinks";
import Logo from "../assets/logo.png";

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      <header className="navbar bg-base-100 shadow-lg lg:px-10 sm:px-2">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            {/* Dropdown menu mobile */}
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-80 p-2 shadow">
              {user && <NavLinks user={user} />}
            </ul>
          </div>
          {/* Menyesuaikan ukuran logo */}
          <img src={Logo} alt="Logo" className="w-28 h-auto" />
        </div>

        {/* Menu desktop */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{user && <NavLinks user={user} />}</ul>
        </div>

        <div className="navbar-end gap-3">
          {user && (
            <div className=" lg:flex items-center">
              <span className="text-md">Hello, {user.name}</span>
            </div>
          )}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img src="https://cdn-icons-png.flaticon.com/512/5987/5987424.png" alt="User Avatar" className="object-cover w-full h-full" />
              </div>
            </div>

            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li>
                <a onClick={logout} className="">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
