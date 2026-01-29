import { useState } from "react";
import { useAuth } from "../auth/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  // Local state (for future edit feature)
  const [name, setName] = useState(user?.name || "");
  const [email] = useState(user?.email || "");
  const [role] = useState(user?.role || "user");

  

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
      {/* ================= Header ================= */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        👤 My Profile
      </h2>

      {/* ================= Profile Card ================= */}
      <div className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Full Name
          </label>
          <input
            type="text"
            value={name}
            disabled
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 bg-gray-50 cursor-not-allowed"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            disabled
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 bg-gray-50 cursor-not-allowed"
          />
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Role
          </label>
          <input
            type="text"
            value={role}
            disabled
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 bg-gray-50 cursor-not-allowed capitalize"
          />
        </div>
      </div>

      {/* ================= Info ================= */}
      <div className="mt-8 rounded-lg bg-indigo-50 border border-indigo-100 p-4">
        <p className="text-sm text-indigo-700">
          🔒 Profile editing will be available soon.
        </p>
      </div>
    </div>
  );
}
