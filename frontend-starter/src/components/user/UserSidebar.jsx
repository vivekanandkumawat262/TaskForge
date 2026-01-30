// src/components/user/UserSidebar.jsx
import { NavLink } from "react-router-dom";

export default function UserSidebar() {
  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded text-sm font-medium ${
      isActive
        ? "bg-indigo-100 text-indigo-700"
        : "text-gray-600 hover:bg-gray-100"
    }`;

  return (
    <aside className="w-60 bg-white border-r min-h-screen p-4">
      <h2 className="text-lg font-bold text-gray-800 mb-6">👤 User Panel</h2>

      <nav className="space-y-2">
        <NavLink to="/user" end className={linkClass}>
          Dashboard
        </NavLink>
        <NavLink to="/user/tasks" className={linkClass}>
          My Tasks
        </NavLink>
        <NavLink to="/user/completed" className={linkClass}>
          Completed
        </NavLink>
        <NavLink to="/user/profile" className={linkClass}>
          Profile
        </NavLink>
      </nav>
    </aside>
  );
}
