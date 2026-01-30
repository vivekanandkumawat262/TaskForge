// src/pages/user/UserDashboard.jsx
import { useEffect, useState } from "react";
import api from "../api/apiClient";
import { useAuth } from "../auth/AuthContext";

export default function UserDashboard() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const load = async () => {
      const res = await api.get("/admin/users");
      const me = res.data.find((u) => u.id === user.id);
      setTasks(me?.assigned_tasks || []);
    };
    load();
  }, [user.id]);

  const pending = tasks.filter((t) => t.status === "pending").length;
  const progress = tasks.filter((t) => t.status === "in-progress").length;
  const completed = tasks.filter((t) => t.status === "completed").length;

  return (
    <div>
      <h1 className="text-2xl  font-bold mb-6">👋 Welcome,ss {user.name}</h1>

      <div className="grid grid-cols-3 gap-4">
        <Card title="Pending" value={pending} />
        <Card title="In Progress" value={progress} />
        <Card title="Completed" value={completed} />
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white rounded-lg shadow p-5">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  );
}


// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../auth/AuthContext";
// import StatCard from "./StatCard";
// import { useEffect, useState } from "react";
// import { getProjects } from "../api/projectAPI";

// export default function Dashboard() {
//   const navigate = useNavigate();
//   const { user, loading, logoutUser } = useAuth();
//   const [projectCount, setProjectCount] = useState("—");

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-gray-600">
//         Checking session...
//       </div>
//     );
//   }

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   useEffect(() => {
//     const fetchProjectCount = async () => {
//       try {
//         const projects = await getProjects();
//         setProjectCount(projects.length);
//       } catch (err) {
//         console.error("Failed to fetch projects count");
//         setProjectCount("—");
//       }
//     };

//     fetchProjectCount();
//   }, []);

//   return (
//     <div className="max-w-5xl mx-auto">
//       {/* ================= Header ================= */}
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-800">
//           Welcome, {user?.name || "User"} 👋
//         </h1>
//         <p className="text-gray-600 mt-1">
//           Manage your projects and tasks from here
//         </p>
//       </div>

//       {/* ================= Stats ================= */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
//         <StatCard title="Projects" value={projectCount} icon="📁" />
//       </div>

//       {/* ================= Actions ================= */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//         <ActionCard
//           title="📁 Projects"
//           description="Create, update and manage your projects"
//           buttonText="Go to Projects"
//           onClick={() => navigate("/user/projects")}
//         />

//         <ActionCard
//           title="📝 Tasks"
//           description="View and manage tasks inside your projects"
//           buttonText="View Projects"
//           onClick={() => navigate("/user/projects")}
//         />
//       </div>
//     </div>
//   );
// }

// /* ================= Reusable Components ================= */

// // const StatCard = ({ title, value }) => (
// //   <div className="bg-white rounded-xl shadow p-6 text-center">
// //     <p className="text-sm text-gray-500">{title}</p>
// //     <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
// //   </div>
// // );

// const ActionCard = ({ title, description, buttonText, onClick }) => (
//   <div className="bg-white rounded-xl shadow p-6 flex flex-col justify-between">
//     <div>
//       <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
//       <p className="text-gray-600 mt-2">{description}</p>
//     </div>

//     <button
//       onClick={onClick}
//       className="mt-6 self-start rounded-lg  px-5 py-2 text-white font-medium hover:bg-red-100 transition"
//     >
//       {buttonText}
//     </button>
//   </div>
// );
