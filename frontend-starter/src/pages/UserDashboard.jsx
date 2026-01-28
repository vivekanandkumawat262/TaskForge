import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

/* -------------------- User Dashboard -------------------- */

const UserDashboard = () => {
  const { user, loading, logoutUser } = useAuth();

  /* ---------- Guards ---------- */

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

  /* ---------- UI ---------- */

  return (
    <div className="min-w-screen min-h-screen bg-gray-100 p-6">
      {/* Page Container */}
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome, {user.name} 👋
          </h1>
          <p className="text-gray-600 mt-2">
            Here’s your personal dashboard
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Profile Information
          </h2>

          <div className="space-y-2 text-gray-700">
            <p>
              <span className="font-medium">Name:</span> {user.name}
            </p>
            <p>
              <span className="font-medium">Email:</span> {user.email}
            </p>
            <p>
              <span className="font-medium">Role:</span>{" "}
              <span className="capitalize">{user.role}</span>
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <StatCard title="Total Tasks" value="0" />
          <StatCard title="Completed" value="0" />
          <StatCard title="Pending" value="0" />
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-4 mb-10">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md transition">
            Create Task
          </button>

          <button className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2 rounded-md transition">
            View Tasks
          </button>
        </div>

        {/* Logout */}
        <div className="flex justify-center">
          <button
            onClick={logoutUser}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

/* -------------------- Reusable Stat Card -------------------- */

const StatCard = ({ title, value }) => (
  <div className="bg-white p-6 rounded-lg shadow text-center">
    <p className="text-gray-600 text-sm">{title}</p>
    <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
  </div>
);

export default UserDashboard;


// import { Navigate } from "react-router-dom";
// import { useAuth } from "../auth/AuthContext";

// const UserDashboard = () => {
//   const { user, loading, logoutUser } = useAuth();

//   /* -------------------- guards -------------------- */

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

//   /* -------------------- UI -------------------- */

//   return (
//     <div className="min-h-screen text-center min-w-screen     bg-gray-100 p-8">
//       {/* Header */}
//      {/* <div className="  min-w-screen w-64 bg-white p-4"> */}
      
  
//         <div className="mb-8 ">
//             <h1 className="text-3xl font-bold text-gray-800">
//             Welcome, {user.name} 👋
//             </h1>
//             <p className="text-gray-600 mt-1">
//             Here’s your personal dashboard
//             </p>
//         </div>

//         {/* Profile Card */}
//         <div className=" bg-white rounded-lg shadow-md p-6 max-w-md mb-8">
//             <h2 className="text-xl font-semibold text-gray-800 mb-4">
//             Profile Information
//             </h2>

//             <div className="space-y-2 text-gray-700">
//             <p>
//                 <span className="font-medium">Name:</span> {user.name}
//             </p>
//             <p>
//                 <span className="font-medium">Email:</span> {user.email}
//             </p>
//             <p>
//                 <span className="font-medium">Role:</span>{" "}
//                 <span className="capitalize">{user.role}</span>
//             </p>
//             </div>
//         </div>

//         {/* Stats Section (future ready) */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mb-10">
//             <StatCard title="Total Tasks" value="0" />
//             <StatCard title="Completed" value="0" />
//             <StatCard title="Pending" value="0" />
//         </div>

//         {/* Actions */}
//         <div className="flex gap-4 mb-10">
//             <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md transition">
//             Create Task
//             </button>

//             <button className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2 rounded-md transition">
//             View Tasks
//             </button>
//         </div>

//         {/* Logout */}
//         <button
//             onClick={logoutUser}
//             className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md transition"
//         >
//             Logout
//         </button>
//         {/* </div>  */}
//     </div>
//   );
// };

// /* -------------------- reusable stat card -------------------- */

// const StatCard = ({ title, value }) => (
//   <div className="bg-white p-6 rounded-lg shadow text-center">
//     <p className="text-gray-600 text-sm">{title}</p>
//     <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
//   </div>
// );

// export default UserDashboard;
