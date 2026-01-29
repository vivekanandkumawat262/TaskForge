import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="min-w-screen min-h-screen bg-gray-100">
      {/* Admin Header / Sidebar */}
      <div className="p-6 bg-white text-black shadow">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </div>
      

      {/* Child pages render here */}
      <div className="p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;



// import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "../auth/AuthContext";

// /* -------------------- Admin Dashboard -------------------- */

// const AdminDashboard = () => {
//   const { user, loading, logoutUser } = useAuth();

//   /* ---------- Guards ---------- */

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-gray-600">
//         Checking admin access...
//       </div>
//     );
//   }

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   if (user.role !== "admin") {
//     return <Navigate to="/user" replace />;
//   }

//   /* ---------- UI ---------- */

//   return (
//     <div className="min-w-screen min-h-screen bg-gray-100 p-6">
//       {/* Page Container */}
//       <div className="max-w-6xl mx-auto">
        
//         {/* Header */}
//         <div className="text-center mb-10">
//           <h1 className="text-4xl font-bold text-gray-800">
//             Admin Dashboard 🛡️
//           </h1>
//           <p className="text-gray-600 mt-2">
//             Manage users, tasks and system settings
//           </p>
//         </div>

//         {/* Admin Profile */}
//         <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto mb-10">
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">
//             Admin Profile
//           </h2>

//           <div className="space-y-2 text-gray-700">
//             <p>
//               <span className="font-medium">Name:</span> {user.name}
//             </p>
//             <p>
//               <span className="font-medium">Email:</span> {user.email}
//             </p>
//             <p>
//               <span className="font-medium">Role:</span>{" "}
//               <span className="capitalize text-indigo-600 font-semibold">
//                 {user.role}
//               </span>
//             </p>
//           </div>
//         </div>

//         {/* Stats Section */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
//           <StatCard title="Total Users" value="0" />
//           <StatCard title="Admins" value="1" />
//           <StatCard title="Total Tasks" value="0" />
//         </div>

//         {/* Admin Actions */}
//         <div className="flex flex-wrap justify-center gap-4 mb-12">
//           <AdminButton label="Manage Users" />
//           <AdminButton label="Manage Tasks" />
//           <AdminButton label="System Settings" />
//           <AdminButton label="View Logs" />
//         </div>
//        <Outlet />
//         {/* Logout */}
//         <div className="flex justify-center">
//           <button
//             onClick={logoutUser}
//             className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md transition"
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// /* -------------------- Reusable Components -------------------- */

// const StatCard = ({ title, value }) => (
//   <div className="bg-white p-6 rounded-lg shadow text-center">
//     <p className="text-gray-600 text-sm">{title}</p>
//     <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
//   </div>
// );

// const AdminButton = ({ label }) => (
//   <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md shadow transition">
//     {label}
//   </button>
// );

// export default AdminDashboard;
