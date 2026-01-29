import { useEffect, useState } from "react";
import {
  deleteProject,
  getProjects,
  createProject,
  updateProject,
} from "../api/projectAPI";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Projects() {

    const {user} = useAuth();

  const [projects, setProjects] = useState([]);
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
        <h2 className="text-2xl font-bold text-gray-800">📁 Projects</h2>
        <span className="text-sm text-gray-500">{projects.length} total</span>
      </div>
      <input
        type="text"
        placeholder="Search projects..."
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

      {/* ================= Create Project ================= */}
      <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <input
          type="text"
          placeholder="Project name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="col-span-1 sm:col-span-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="col-span-1 sm:col-span-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          onClick={handleCreateProject}
          disabled={!name.trim()}
          className="rounded-lg bg-indigo-600 px-5 py-2 font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Create
        </button>
      </div>

      {/* ================= Content ================= */}
      {loading ? (
        <p className="text-gray-500 animate-pulse">Loading projects...</p>
      ) : projects.length === 0 ? (
        <div className="py-10 text-center text-gray-500">
          <p className="text-lg font-medium">No projects yet 🚀</p>
          <p className="text-sm mt-1">
            Create your first project to get started
          </p>
        </div>
      ) : (
        <ul className="space-y-4">
          {projects.map((p) => (
            <li
              key={p.id}
              className="rounded-lg border border-gray-200 p-4 transition hover:shadow-md"
            >
              {/* ================= Edit Mode ================= */}
              {editingProjectId === p.id ? (
                <div className="space-y-3">
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:ring-2 focus:ring-indigo-500"
                  />

                  <input
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:ring-2 focus:ring-indigo-500"
                  />

                  <div className="flex gap-2">
                    <button
                      onClick={handleUpdateProject}
                      className="rounded-md bg-green-600 px-4 py-1.5 text-white hover:bg-green-700"
                    >
                      Update
                    </button>

                    <button
                      onClick={() => setEditingProjectId(null)}
                      className="rounded-md bg-gray-300 px-4 py-1.5 text-white hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                /* ================= View Mode ================= */
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {p.name}
                    </h3>

                    {p.description && (
                      <p className="mt-1 text-sm text-gray-600">
                        {p.description}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => navigate(`/${user.role}/projects/${p.id}`)}
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
                    >
                      Open
                    </button>
                    <button
                      onClick={() => handleEditClick(p)}
                      className="text-sm font-medium text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDeleteProject(p.id)}
                      className="text-sm font-medium text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
