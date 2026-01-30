import { useNavigate, useParams } from "react-router-dom";
import {
  createTask,
  getTasksByProject,
  deleteTask,
  updateTaskStatus,
  updateTask,
  getAllUsers,
  assignTask,
} from "../api/taskApi";
import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";

export default function ProjectDetails() {
  const [users, setUsers] = useState([]);
  const { user } = useAuth();
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [tasks, setTasks] = useState([]);

  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const [tasksLoading, setTasksLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const [search, setSearch] = useState("");

  const handleCreateTask = async () => {
    if (!title.trim()) return;

    try {
      setActionLoading(true);
      await createTask(projectId, { title, description });

      setTitle("");
      setDescription("");
      fetchTasks(search);
    } catch {
      setError("Failed to create task");
    } finally {
      setActionLoading(false);
    }
  };

  const fetchTasks = async (searchValue = "") => {
    try {
      setTasksLoading(true);
      setError(null);

      const data = await getTasksByProject(projectId, {
        search: searchValue,
      });

      setTasks(data);
    } catch (err) {
      setError("Failed to load tasks");
    } finally {
      setTasksLoading(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (!confirmDelete) return;

    try {
      await deleteTask(taskId);

      // 🔥 Refresh task list
      fetchTasks();
    } catch (err) {
      alert("Failed to delete task");
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await updateTaskStatus(taskId, newStatus);

      // 🔥 Refresh tasks after update
      fetchTasks();
    } catch (err) {
      alert("Failed to update task status");
    }
  };

  //   useEffect(() => {
  //     fetchTasks();
  //   }, [projectId]);

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchTasks(search);
    }, 400); // debounce delay

    return () => clearTimeout(delay);
  }, [search, projectId]);

  const handleEditClick = (task) => {
    setEditingTaskId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description || "");
  };

  const handleUpdateTask = async () => {
    try {
      await updateTask(editingTaskId, {
        title: editTitle,
        description: editDescription,
      });

      setEditingTaskId(null);
      fetchTasks(); // 🔥 refresh list
    } catch (err) {
      alert("Failed to update task");
    }
  };

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      console.error("Failed to load users");
    }
  };

  useEffect(() => {
    if (user?.role === "admin") {
      fetchUsers(); // ✅ correct
    }
  }, [user]);

  const handleAssignTask = async (taskId, userId) => {
    if (!userId) return;

    try {
      await assignTask(taskId, userId);
      fetchTasks(); // refresh task list
    } catch (err) {
      alert("Failed to assign task");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white shadow rounded-xl p-6">
      <button
        onClick={() => navigate(`/${user.role}/projects`)}
        className="flex items-center gap-1 text-sm text-white hover:text-gray-400"
      >
        ← Back
      </button>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        📂 Project #{projectId}
      </h2>

      <p className="text-gray-600 mb-6">
        This is where tasks for this project will live.
      </p>

      <div className="mt-6 bg-white border rounded-xl p-4">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-5 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          ➕ Create Task
        </h3>

        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

        <div className="space-y-3">
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-black rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500"
          />

          <textarea
            placeholder="Task description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full text-black rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500"
            rows={3}
          />

          <button
            onClick={handleCreateTask}
            disabled={actionLoading || !title.trim()}
            className="bg-indigo-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-60 transition"
          >
            {actionLoading ? "Creating..." : "Create Task"}
          </button>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">📋 Tasks</h3>

        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

        {tasksLoading ? (
          <p className="text-gray-500 animate-pulse">Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p className="text-gray-500">
            No tasks yet. Create your first task 🚀
          </p>
        ) : (
          <ul className="space-y-3">
            {tasks.map((task) => (
              //   <li
              //     key={task.id}
              //     className="border rounded-lg p-4 flex justify-between items-start hover:shadow transition"
              //   >
              //     <div>
              //       <h4 className="font-medium text-gray-800">{task.title}</h4>

              //       {task.description && (
              //         <p className="text-sm text-gray-600 mt-1">
              //           {task.description}
              //         </p>
              //       )}
              //     </div>

              //

              //     <button
              //       onClick={() => handleEditClick(task)}
              //       className="text-blue-600 text-sm hover:underline"
              //     >
              //       Edit
              //     </button>

              //     <select
              //       value={task.status}
              //       onChange={(e) => handleStatusChange(task.id, e.target.value)}
              //       className={`text-xs px-2 py-1 rounded border focus:outline-none ${
              //         task.status === "completed"
              //           ? "bg-green-100 text-green-700"
              //           : task.status === "in-progress"
              //             ? "bg-yellow-100 text-yellow-700"
              //             : "bg-gray-100 text-gray-700"
              //       }`}
              //     >
              //       <option value="pending">Pending</option>
              //       <option value="in-progress">In Progress</option>
              //       <option value="completed">Completed</option>
              //     </select>
              //   </li>
              <li
                key={task.id}
                className="rounded-lg border bg-white p-4 transition hover:shadow-sm"
              >
                {editingTaskId === task.id ? (
                  /* ================= EDIT MODE ================= */
                  <div className="space-y-3">
                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      placeholder="Task title"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />

                    <textarea
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      placeholder="Task description"
                      rows={3}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        onClick={() => setEditingTaskId(null)}
                        className="rounded-md bg-gray-200 px-4 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-300 transition"
                      >
                        Cancel
                      </button>

                      <button
                        onClick={handleUpdateTask}
                        className="rounded-md bg-green-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-green-700 transition"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                ) : (
                  /* ================= VIEW MODE ================= */
                  <div className="flex items-start justify-between gap-4">
                    {/* Left: Task info */}
                    <div className="flex-1">
                      <h4 className="text-base font-semibold text-gray-800">
                        {task.title}
                      </h4>

                      {task.description && (
                        <p className="mt-1 text-sm text-gray-600">
                          {task.description}
                        </p>
                      )}
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-3">
                      {/* Status */}
                      <select
                        value={task.status}
                        onChange={(e) =>
                          handleStatusChange(task.id, e.target.value)
                        }
                        className={`rounded-md border px-2 py-1 text-xs font-medium focus:outline-none ${
                          task.status === "completed"
                            ? "border-green-200 bg-green-100 text-green-700"
                            : task.status === "in-progress"
                              ? "border-yellow-200 bg-yellow-100 text-yellow-700"
                              : "border-gray-200 bg-gray-100 text-gray-700"
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>

                      {/* Edit */}
                      <button
                        onClick={() => handleEditClick(task)}
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition"
                      >
                        Edit
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="text-sm font-medium text-red-500 hover:text-red-700 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}

                {user?.role === "admin" && (
                  <select
                    value={task.assigned_to_id || ""}
                    onChange={(e) => handleAssignTask(task.id, e.target.value)}
                    className="rounded-md border border-gray-300 bg-white px-2 py-1 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Assign to...</option>

                    {users.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name}
                      </option>
                    ))}
                  </select>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
