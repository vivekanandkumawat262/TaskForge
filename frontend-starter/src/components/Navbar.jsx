import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const Navbar = () => {
  const { user, isAuth, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  return (
    <nav className="h-16 bg-gray-900 text-white flex items-center justify-between px-8 shadow-md">
      {/* ================= Logo ================= */}
      <h2
        className="text-xl font-bold tracking-wide cursor-pointer"
        onClick={() => navigate("/")}
      >
        TaskForge
      </h2>

      {/* ================= Navigation ================= */}
      <div className="flex items-center gap-6">
        <Link
          to="/user/userDashboard"
          className="text-sm font-medium text-gray-300 hover:text-white transition"
        >
          Home
        </Link>

        {!isAuth && (
          <>
            <Link
              to="/login"
              className="text-sm font-medium text-gray-300 hover:text-white transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="text-sm font-medium text-gray-300 hover:text-white transition"
            >
              Register
            </Link>
          </>
        )}

        {/* ---------------- User Links ---------------- */}
        {isAuth && user?.role === "user" && (
          <>
            <Link
              to="/user"
              className=" transition"
            >
              Dashboard
            </Link>

            <button
              onClick={() => navigate("/user/profile")}
              className="text-sm font-medium text-gray-300 hover:text-indigo-400 transition"
            >
              Profile
            </button>
          </>
        )}

        {/* ---------------- Admin Links ---------------- */}
        {isAuth && user?.role === "admin" && (
          <>
          <Link
            to="/admin"
            className="text-sm font-medium text-gray-300 hover:text-indigo-400 transition"
          >
            Admin
          </Link>

          <button
              onClick={() => navigate("/admin/profile")}
              className="text-sm font-medium text-gray-300 hover:text-indigo-400 transition"
            >
              Profile
            </button>
          </>
        )}

        {/* ---------------- Logout ---------------- */}
        {isAuth && (
          <button
            onClick={handleLogout}
            className="ml-4 rounded-md bg-red-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-red-700 transition"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
