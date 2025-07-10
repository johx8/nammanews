import React, {useState} from "react";
import { NavLink } from "react-router-dom";

const UserSidebarDash = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItemClass = ({ isActive }) =>
    `block px-4 py-2 rounded transition ${
      isActive ? 'bg-orange-600 text-white' : 'text-gray-700 hover:bg-gray-200'
    }`;

  return (
    <>
      {/* Sidebar */}
      <div className="hidden md:block fixed top-16 left-0 h-full w-60 bg-white border-r shadow-lg p-4 z-40">
        <h1 className="text-2xl font-bold mb-6 text-orange-600">User Dashboard</h1>
        <nav className="flex flex-col gap-2">
            {/* <NavLink to="/user/dashboard" className={navItemClass}>Dashboard</NavLink> */}
          <NavLink to="/user/profile" className={navItemClass}>Edit Profile</NavLink>
          <NavLink to="/user/add-event" className={navItemClass}>Submit Events</NavLink>
          <NavLink to="/user/my-events" className={navItemClass}>My Events</NavLink>
        </nav>
      </div>

      {/* Mobile Sidebar */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-white border-b p-4 z-50 flex justify-between items-center">
        <h1 className="text-xl font-bold text-orange-600">User Dashboard</h1>
        <button onClick={() => setIsMobileOpen(!isMobileOpen)}>
          ☰
        </button>
      </div>

      {isMobileOpen && (
        <div className="md:hidden fixed top-16 left-0 w-full bg-white border-t p-4 z-40">
          <nav className="flex flex-col gap-2">
            {/* <NavLink to="/user/dashboard" className={navItemClass}>Dashboard</NavLink> */}
            <NavLink to="/user/profile" className={navItemClass}>Edit Profile</NavLink>
            <NavLink to="/user/add-event" className={navItemClass}>Submit Events</NavLink>
            <NavLink to="/user/my-events" className={navItemClass}>My Events</NavLink>
          </nav>
        </div>
      )}
    </>
  );
};

export default UserSidebarDash;