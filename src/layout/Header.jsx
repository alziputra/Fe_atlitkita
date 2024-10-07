import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { NavLinks } from '../components/NavLinks';

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="flex justify-between items-center">
        <div className="flex">
          {user && <NavLinks user={user} />} {/* NavLinks hanya jika user sudah login */}
        </div>
        <div>
          {user && (
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
