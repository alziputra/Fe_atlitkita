import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { NavLinks } from "../components/NavLinks";
import { Link } from "react-router-dom";

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      <header className="navbar bg-[#F4A460] border-black border-b-4 shadow-[8px_8px_0px_rgba(0,0,0,1)]">
        <div className="navbar-start gap-2">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden border-black border-2 focus:shadow-[4px_4px_0px_rgba(0,0,0,1)]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            {/* Dropdown menu mobile */}
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-[#F5F5DC] border-black border-2 shadow-[4px_4px_0px_rgba(0,0,0,1)] rounded-box z-[1] mt-3 w-80 p-2">
              {user && <NavLinks user={user} />}
            </ul>
          </div>
          {/* Menyesuaikan ukuran logo */}
          <div className="flex border-2 border-black hover:shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            <Link to="/dashboard" className="py-2 px-3 border-slate-800  text-black text-xl font-semibold">
              ATLIT KITA
            </Link>
          </div>
        </div>

        {/* Menu desktop */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{user && <NavLinks user={user} />}</ul>
        </div>

        <div className="navbar-end gap-3">
          {user && (
            <div className="lg:flex items-center">
              <span className="text-md text-black font-semibold">Hello, {user.name}</span>
            </div>
          )}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border-black border-2 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img src="https://cdn-icons-png.flaticon.com/512/5987/5987424.png" alt="User Avatar" className="object-cover w-full h-full" />
              </div>
            </div>

            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-[#F5F5DC] border-black border-2 shadow-[4px_4px_0px_rgba(0,0,0,1)] rounded-box z-[1] mt-3 w-52 p-2">
              <li>
                <a onClick={logout} className="w-full sm:w-auto py-2 px-3 border-black border-2 bg-white text-black hover:bg-[#FF6700] hover:text-black rounded-lg shadow-[4px_4px_0px_rgba(0,0,0,1)]">
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
