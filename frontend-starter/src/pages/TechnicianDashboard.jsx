import { useEffect, useState } from "react";
import {
  deleteProject,
  getProjects,
  createProject,
  updateProject,
  getTechnicians,
} from "../api/projectAPI";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import api from "../api/apiClient";

export default function Projects() {

    const {user} = useAuth();

  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  //   const fetchProjects = async () => {
  //     try {
  //       setLoading(true);
  //       const data = await getProjects();
  //       console.log("dataaaa:", data);
  //       console.log("data length:", data.length);

  //       setProjects(data);
  //     } catch (err) {
  //       setError("Failed to load projects");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  const fetchProjects = async (searchValue = "") => {
    try {
      setLoading(true);
      const data = await getProjects({ search: searchValue });
      setProjects(data);
    } catch {
      setError("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };
 

  const fetchUsers = async () => {
    try {
      setError(null);
      setLoading(true);

      const res = await api.get("/admin/users");
      console.log("hello ADMIN USERS:", res.data);

      setUsers(res.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async () => {
    if (!name.trim()) return;

    try {
      await createProject({
        name,
        description,
      });

      setName("");
      setDescription("");
      fetchProjects();
    } catch (err) {
      setError("Failed to create project");
    }
  };

  const handleDeleteProject = async (projectId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?",
    );

    if (!confirmDelete) return;

    try {
      await deleteProject(projectId);
      fetchProjects(); // refresh list
    } catch (err) {
      setError("Failed to delete project");
    }
  };

  const handleEditClick = (project) => {
    setEditingProjectId(project.id);
    setEditName(project.name);
    setEditDescription(project.description || "");
  };

  const handleUpdateProject = async () => {
    try {
      await updateProject(editingProjectId, {
        name: editName,
        description: editDescription,
      });

      setEditingProjectId(null);
      fetchProjects();
    } catch (err) {
      setError("Failed to update project");
    }
  };

  useEffect(() => {
    fetchProjects(search);
    fetchUsers();
  }, [search]);

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
      {/* ================= Header ================= */}
      <button
        onClick={() => navigate(`/${user.role}`)}
        className="flex items-center gap-1 text-sm text-white hover:text-gray-400"
      >
        ← Back
      </button>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">📁 Technicians</h2>
        <span className="text-sm text-gray-500">{users
                                .filter((user) => user.role === "technician")
                                .length} total</span>
      </div>
      <input
        type="text"
        placeholder="Search Technician..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      {/* ================= Error ================= */}
      {error && (
        <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-red-700">
          {error}
        </div>
      )}

      

      {/* ================= Content ================= */}
      {loading ? (
        <p className="text-gray-500 animate-pulse">Loading technicians...</p>
      ) : users.length === 0 ? (
        <div className="py-10 text-center text-gray-500">
          <p className="text-lg font-medium">No technicians yet 🚀</p>
          <p className="text-sm mt-1">
            Create your first technicians to get started
          </p>
        </div>
      ) : (
        <ul className="space-y-4">
         {users
            .filter((user) => user.role === "technician")
            .map((user) => (
              <li
                key={user.id}
                className="rounded-lg border text-black border-gray-200 p-4 transition hover:shadow-md"
              >
                {user.name}
              </li>
          ))}

        </ul>
      )}
    </div>
  );
}




 