import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import StatCard from "./StatCard";
import { useEffect, useState } from "react";
import { getProjects } from "../api/projectAPI";
import { assignTask,getAllUsers } from "../api/taskApi";
 

export default function DashboardA() {
  const navigate = useNavigate();
  const { user, loading, logoutUser } = useAuth();
  const [projectCount, setProjectCount] = useState("—");

  const [users, setUsers] = useState([]);

  const [tasks, setTasks] = useState([]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Checking session...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  useEffect(() => {
    const fetchProjectCount = async () => {
      try {
        const projects = await getProjects();
        console.log("project", projects);
        setProjectCount(projects.length);
      } catch (err) {
        console.error("Failed to fetch projects count");
        setProjectCount("—");
      }
    };

    fetchProjectCount();
  }, []);

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
      fetchUsers();
    }
  }, [user]);

  const handleAssignTask = async (taskId, userId) => {
    try {
      await assignTask(taskId, userId);
      fetchTasks(); // refresh tasks
    } catch (err) {
      alert("Failed to assign task");
    }
  };

  const fetchTasks = async () => {
    try {
      const data = await getAllTasks();
      setTasks(data);
    } catch (err) {
      console.error("Failed to load tasks");
    }
  };

  useEffect(() => {
    if (user?.role === "admin") {
      fetchTasks();
    }
  }, [user]);

  return (
    <div className="max-w-5xl mx-auto">
      {/* ================= Header ================= */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome, {user?.name || "User"} 👋
        </h1>
        <p className="text-gray-600 mt-1">
          Manage your projects and tasks from here
        </p>
      </div>

      {/* ================= Stats ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <StatCard title="Projects" value={projectCount} icon="📁" />
      </div>

      {/* ================= Actions ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <ActionCard
          title="📁 Projects"
          description="Create, update and manage your projects"
          buttonText="Go to Projects"
          onClick={() => navigate("/admin/projects")}
        />

        <ActionCard
          title="📝 Tasks"
          description="View and manage tasks inside your projects"
          buttonText="View Projects"
          onClick={() => navigate("/admin/projects")}
        />
        <ActionCard
          title="Manage Users"
          description="Users "
          buttonText="View Users"
          onClick={() => navigate("/admin/users")}
        />

        {tasks.map((task) => (
          <div key={task.id}>
            <p>{task.title}</p>

            <select
              value={task.assigned_to_id || ""}
              onChange={(e) => handleAssignTask(task.id, e.target.value)}
            >
              <option value="">Assign user</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================= Reusable Components ================= */

// const StatCard = ({ title, value }) => (
//   <div className="bg-white rounded-xl shadow p-6 text-center">
//     <p className="text-sm text-gray-500">{title}</p>
//     <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
//   </div>
// );

const ActionCard = ({ title, description, buttonText, onClick }) => (
  <div className="bg-white rounded-xl shadow p-6 flex flex-col justify-between">
    <div>
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600 mt-2">{description}</p>
    </div>

    <button
      onClick={onClick}
      className="mt-6 self-start rounded-lg  px-5 py-2 text-white font-medium hover:bg-red-100 transition"
    >
      {buttonText}
    </button>
  </div>
);
