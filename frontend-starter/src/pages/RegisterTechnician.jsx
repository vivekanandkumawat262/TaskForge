import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/authApi";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await registerUser({ name, email, password,role });
      navigate("/admin/technicians");
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center bg-gray-100">
      <button
        onClick={() => navigate(`/admin`)}
        className="flex items-center gap-1 text-sm text-white hover:text-gray-400"
      >
        ← Back
      </button>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-80"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Register
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">
            {error}
          </p>
        )}

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full text-gray-800 px-3 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full text-gray-800 px-3 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full text-gray-800 px-3 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <input 
          type="text" 
          placeholder="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
          className="w-full text-gray-800 px-3 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"          
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded transition disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Register"}
        </button> 
      </form>
    </div>
  );
};

export default Register;
