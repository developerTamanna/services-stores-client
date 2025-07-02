import { useContext, useState } from 'react';
import { NavLink } from 'react-router';
import { AuthContext } from '../contexts/AuthProvider';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout()
      .then(() => console.log('Logged out'))
      .catch((error) => console.error(error));
  };

  const linkClass = ({ isActive }) =>
    isActive
      ? 'dark:text-white text-black border-b-4 border-blue-500 pb-1'
      : 'dark:text-white text-black hover:text-blue-400';

  const menuItems = (
    <>
      <NavLink to="/" className={linkClass}>
        Home
      </NavLink>
      <NavLink to="/services" className={linkClass}>
        Services
      </NavLink>
      <ThemeToggle />
      {user ? (
        <>
          <NavLink to="/addService" className={linkClass}>
            Add Service
          </NavLink>
          <NavLink to="/myServices" className={linkClass}>
            My Services
          </NavLink>
          <NavLink to="/myReviews" className={linkClass}>
            My Reviews
          </NavLink>
          <button
            onClick={handleLogout}
            className="dark:text-white text-black hover:text-red-500 font-medium"
          >
            Logout
          </button>

          <div className="relative group">
            <img
              src={user?.photoURL}
              alt="User Avatar"
              referrerPolicy="no-referrer"
              className="w-8 h-8 rounded-full border border-white"
            />
            <div className="absolute bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition top-full mt-1 whitespace-nowrap">
              {user?.displayName}
            </div>
          </div>
        </>
      ) : (
        <>
          <NavLink to="/login" className={linkClass}>
            Login
          </NavLink>
          <NavLink to="/register" className={linkClass}>
            Register
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <header className="dark:bg-black bg-white shadow-md sticky w-full top-0 z-50">
      <div className="w-11/12 mx-auto  py-3 flex items-center justify-between">
        {/* Logo */}
        <NavLink
          to="/"
          className="text-2xl font-bold dark:text-white text-black"
        >
          ServicePoint
        </NavLink>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 font-medium">
          {menuItems}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="dark:text-white text-black text-2xl"
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden dark:bg-gray-900 bg-white px-6 py-4 space-y-3 flex flex-col">
          {menuItems}
        </div>
      )}
    </header>
  );
};

export default Header;
