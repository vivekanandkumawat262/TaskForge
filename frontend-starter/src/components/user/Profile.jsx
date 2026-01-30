// src/pages/user/Profile.jsx
import { useAuth } from "../../auth/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="bg-white p-6 rounded shadow max-w-md">
      <h2 className="text-xl font-bold mb-4">👤 Profile</h2>

      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
    </div>
  );
}
