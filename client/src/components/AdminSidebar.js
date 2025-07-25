import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const AdminSidebar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItemClass = ({ isActive }) =>
    `block px-4 py-2 rounded transition ${
      isActive ? 'bg-orange-600 text-white' : 'text-gray-700 hover:bg-gray-200'
    }`;

  return (
    <>
      {/* Sidebar */}
      <div className="hidden md:block fixed top-16 left-0 h-full w-60 bg-white border-r shadow-lg p-4 z-40">
        <h1 className="text-2xl font-bold mb-6 text-orange-600">Admin Panel</h1>
        <nav className="flex flex-col gap-2">
          <NavLink to="/admin/dashboard" className={navItemClass}>Dashboard</NavLink>
          <NavLink to="/admin/add-event" className={navItemClass}>Add Events</NavLink>
          <NavLink to="/admin/approve-events" className={navItemClass}>Approve Events</NavLink>
          <NavLink to="/admin/manage-events" className={navItemClass}>Manage Events</NavLink>
          <NavLink to="/admin/manage-users" className={navItemClass}>Manage Users</NavLink>
          <NavLink to="/admin/upload-video" className={navItemClass}>Upload Video</NavLink>
          <NavLink to="/admin/add-story" className={navItemClass}>Add story</NavLink>
          <NavLink to="/admin/add-advertisement" className={navItemClass}>Add Advertisement</NavLink>
        </nav>
      </div>

      {/* Mobile Sidebar */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-white border-b p-4 z-50 flex justify-between items-center">
        <h1 className="text-xl font-bold text-orange-600">Admin Panel</h1>
        <button onClick={() => setIsMobileOpen(!isMobileOpen)}>
          ☰
        </button>
      </div>

      {isMobileOpen && (
        <div className="md:hidden fixed top-16 left-0 w-full bg-white border-t p-4 z-40">
          <nav className="flex flex-col gap-2">
            <NavLink to="/admin/dashboard" className={navItemClass}>Dashboard</NavLink>
            <NavLink to="/admin/add-event" className={navItemClass}>Add Events</NavLink>
            <NavLink to="/admin/approve-events" className={navItemClass}>Approve Events</NavLink>
            <NavLink to="/admin/manage-events" className={navItemClass}>Manage Events</NavLink>
            <NavLink to="/admin/manage-users" className={navItemClass}>Manage Users</NavLink>
            <NavLink to="/admin/upload-video" className={navItemClass}>Upload Video</NavLink>
            <NavLink to="/admin/add-story" className={navItemClass}>Add story</NavLink>
          </nav>
        </div>
      )}
    </>
  );
};

export default AdminSidebar;
