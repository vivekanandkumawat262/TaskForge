import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useEffect } from "react";

const LandingPage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Redirect after auth check
  useEffect(() => {
    if (loading) return;

    if (user) {
      navigate(user.role === "admin" ? "/admin" : "/user", {
        replace: true,
      });
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Checking session...
      </div>
    );
  }

  return (
    <div className="min-w-screen min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 flex flex-col justify-between text-white">
      {/* Hero */}
      <div className="flex flex-col items-center justify-center flex-1 px-6 text-center">
        <h1 className="text-5xl font-extrabold mb-4 tracking-tight">
          TaskForge
        </h1>

        <p className="text-lg max-w-xl mb-10 text-indigo-100">
          Manage tasks smarter. Built for users and admins.
        </p>

        <div className="flex gap-6">
          <Link
            to="/login"
            className="px-8 py-3 rounded-full bg-white text-indigo-700 font-semibold hover:bg-indigo-100 transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-8 py-3 rounded-full border border-white font-semibold hover:bg-white hover:text-indigo-700 transition"
          >
            Register
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-4 text-sm text-indigo-200">
        © {new Date().getFullYear()} TaskForge. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
