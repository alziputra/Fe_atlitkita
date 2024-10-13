import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { NavLinks } from "../components/NavLinks";
import Logo from "../assets/logo.png";

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      <header className="navbar bg-[#F5F5DC] border-black border-2 shadow-[4px_4px_0px_rgba(0,0,0,1)] lg:px-10 sm:px-2">
        <div className="navbar-start gap-2">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden border-black border-2 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
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
          {/* <img src={Logo} alt="Logo" className="w-28 h-auto" /> */}
          <div className="h-12 border-black border-2 p-2.5 bg-[#31302f] hover:bg-[#fc9a59] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] rounded-md">
            <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-[#fc9a59] font-bold hover:text-[#31302f]">ATLIT KITA</h3>
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
