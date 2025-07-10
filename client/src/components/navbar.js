import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import "./navbar.css";
import logo from "../imgs/logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const [userName, setUserName] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    const storedRole = localStorage.getItem("role");
    if (storedName) {
      setUserName(storedName);
    }
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    window.location.reload(); // Reload the page to reflect changes
    setRole(null);
    setUserName(null);
  };

  return (
    <nav className="bg-white shadow-md border-b relative flex items-center justify-between px-4 py-2">
      <Link to="/" className="flex">
        <img src={logo} alt="NammaEvents Logo" className="w-20 md:w-35 lg:w-25" />
      </Link>

      <div className="hidden md:flex space-x-4 text-sm md:text-base items-center">
        <Link to="/" className="opts font-semibold">Home</Link>
        <Link to="/districts" className="opts font-semibold">Districts</Link>
        <Link to="/events" className="opts font-semibold">Latest Events</Link>
        <Link to="/stories" className="opts font-semibold">Stories</Link>
        <Link to="/videos" className="opts font-semibold">Videos</Link>
        <Link to="/calendar" className="opts font-semibold">Event Calendar</Link>
        <Link to="/categories" className="opts font-semibold">Categories</Link>

        {userName ? (
          <>
            <Link to={role === 'admin' ? "/admin/dashboard" : "/user/profile"} className="opts font-semibold">Hi, {userName}</Link>
            {/* {role === 'admin' && (
              <Link to="/admin/dashboard" className="opts text-orange-600 font-semibold">Admin Dashboard</Link>
            )} */}
            <button onClick={handleLogout} className="opts text-orange-600 font-semibold">Logout</button>
            {/* add profile link here later  */}
          </>
        ) : (
          <>
            <Link to="/login" className="opts text-orange-600 font-semibold">Login</Link>
            {/* <Link to="/signup" className="opts text-orange-600 font-semibold">Sign Up</Link> */}
          </>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <button onClick={toggleMenu} className="md:hidden">
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute left-0 top-full w-full bg-white shadow-md z-10 md:hidden">
          <div className="flex flex-col space-y-2 p-4">
            <Link to="/" onClick={toggleMenu} className="opts font-semibold">Home</Link>
            <Link to="/districts" onClick={toggleMenu} className="opts font-semibold">Districts</Link>
            <Link to="/events" onClick={toggleMenu} className="opts font-semibold">Latest Events</Link>
            <Link to="/stories" onClick={toggleMenu} className="opts font-semibold">Stories</Link>
            <Link to="/videos" onClick={toggleMenu} className="opts font-semibold">Videos</Link>
            <Link to="/calendar" onClick={toggleMenu} className="opts font-semibold">Event Calendar</Link>
            <Link to="/categories" onClick={toggleMenu} className="opts font-semibold">Categories</Link>

            {userName ? (
              <>
                <Link to={role === 'admin' ? "/admin/dashboard" : "/profile"} onClick={toggleMenu} className="opts font-semibold">Hi, {userName}</Link>
                 {role === 'admin' && (
                  <Link
                    to="/admin/dashboard"
                    onClick={toggleMenu}
                    className="opts text-orange-600 font-semibold"
                  >
                    Admin Dashboard
                  </Link>
                  )}
                <button onClick={() => { toggleMenu(); handleLogout(); }} className="opts text-orange-600 font-semibold">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={toggleMenu} className="opts text-orange-600 font-semibold">Login</Link>
                {/* <Link to="/signup" onClick={toggleMenu} className="opts text-orange-600 font-semibold">Sign Up</Link> */}
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
