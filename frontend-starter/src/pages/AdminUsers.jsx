import { useEffect, useState } from "react";
import api from "../api/apiClient";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AdminUsers() {
  const { user: authUser } = useAuth();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-8 bg-white shadow rounded-xl p-6">
      {/* Header */}
      <button
        onClick={() => navigate(`/${authUser.role}`)}
        className="mb-4 text-sm text-gray-600 hover:text-gray-900"
      >
        ← Back
      </button>

      <h2 className="text-2xl font-bold text-gray-800 mb-6">👥 All Users</h2>

      {/* Error */}
      {error && (
        <p className="mb-4 text-red-600 bg-red-50 border border-red-200 rounded-md p-3">
          {error}
        </p>
      )}

      {/* Content */}
      {loading ? (
        <p className="text-gray-500 animate-pulse">Loading users...</p>
      ) : users.length === 0 ? (
        <p className="text-gray-500">No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left text-sm text-gray-600">
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Projects & Tasks</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-t align-top">
                  <td className="px-4 py-3 text-gray-800">{u.id}</td>

                  <td className="px-4 py-3 font-medium text-gray-900">
                    {u.name}
                  </td>

                  <td className="px-4 py-3 text-gray-700">{u.email}</td>

                  <td className="px-4 py-3 capitalize">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        u.role === "admin"
                          ? "bg-indigo-100 text-indigo-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>

                  {/* PROJECTS + TASKS */}
                  <td className="px-4 py-3 space-y-3">
                    {/* Projects */}
                    {u.projects.length === 0 && u.role === "user" ? (
                      <p className="text-sm text-gray-400">No owned projects</p>
                    ) : (
                      u.projects.map((project) => (
                        <div key={project.id}>
                          <p className="font-semibold text-sm text-gray-800">
                            📁 {project.name}
                          </p>

                          {project.tasks?.length > 0 ? (
                            <ul className="ml-5 list-disc text-sm text-gray-700">
                              {project.tasks.map((task) => (
                                <li key={task.id}>
                                  {task.title}
                                  <span className="ml-2 text-xs text-gray-400">
                                    ({task.status})
                                  </span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="ml-4 text-xs text-gray-400">
                              No tasks
                            </p>
                          )}
                        </div>
                      ))
                    )}

                    {/* Assigned Tasks */}
                    {/*                    
                    {u.assigned_tasks.map((task) => (
                        
                      <li key={task.id}>
                        {task.project && (
                          <p className="font-semibold text-sm text-gray-800">
                            📁 {task.project.name}
                          </p>
                        )}

                        <ul className="ml-5 list-disc text-sm text-gray-700">
                          {u.assigned_tasks.map((task) => (
                            <li key={task.id}>
                              {task.title}{" "}
                              <span className="ml-2 text-xs text-gray-400">
                                [{task.status}]
                              </span>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))} */}
                    {/* Assigned Tasks */}
                    {u.assigned_tasks && u.assigned_tasks.length > 0 && (
                      <div>
                        <p className="font-semibold text-sm text-gray-800 mb-2">
                          🧩 Assigned Tasks
                        </p>
                        {/* group by project id   */}
                        {Object.values(
                          u.assigned_tasks.reduce((acc, task) => {
                            const projectId = task.project?.id || "no-project";
                            const projectName =
                              task.project?.name || "No Project";

                            if (!acc[projectId]) {
                              acc[projectId] = {
                                projectName,
                                tasks: [],
                              };
                            }

                            acc[projectId].tasks.push(task);
                            return acc;
                          }, {}),
                        ).map((group, idx) => (
                          <div key={idx}>
                            <p className="font-semibold text-sm text-gray-800">
                              📁 {group.projectName}
                            </p>

                            <ul className="ml-5 list-disc text-sm text-gray-700">
                              {group.tasks.map((task) => (
                                <li key={task.id}>
                                  {task.title}
                                  <span className="ml-2 text-xs text-gray-400">
                                    [{task.status}]
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// import { useEffect, useState } from "react";
// import api from "../api/apiClient";
// import { useAuth } from "../auth/AuthContext";
// import { useNavigate } from "react-router-dom";

// export default function AdminUsers() {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get("/admin/users");
//       console.log("users:", res.data);
//       setUsers(res.data);
//     } catch (err) {
//       setError("Failed to load users");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   return (
//     <div className="max-w-6xl mx-auto mt-8 bg-white shadow rounded-xl p-6">
//       {/* Header */}
//       <button
//         onClick={() => navigate(`/${user.role}`)}
//         className="flex items-center gap-1 text-sm text-white hover:text-gray-400"
//       >
//         ← Back
//       </button>
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">👥 All Users</h2>

//       {/* Error */}
//       {error && (
//         <p className="mb-4 text-red-600 bg-red-50 border border-red-200 rounded-md p-3">
//           {error}
//         </p>
//       )}

//       {/* Content */}
//       {loading ? (
//         <p className="text-gray-500 animate-pulse">Loading users...</p>
//       ) : users.length === 0 ? (
//         <p className="text-gray-500">No users found.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="w-full border-collapse">
//             <thead>
//               <tr className="bg-gray-100 text-left text-sm text-gray-600">
//                 <th className="px-4 py-3">ID</th>
//                 <th className="px-4 py-3">Name</th>
//                 <th className="px-4 py-3">Email</th>
//                 <th className="px-4 py-3">Role</th>
//                 <th className="px-4 py-3">Project Assign</th>
//               </tr>
//             </thead>

//             <tbody>
//               {users.map((user) => (
//                 <tr key={user.id} className="border-t align-top">
//                   <td className="px-4 py-3 text-black">{user.id}</td>

//                   <td className="px-4 py-3 font-medium text-black">{user.name}</td>

//                   <td className="px-4 py-3 text-black">{user.email}</td>

//                   <td className="px-4 py-3 text-black capitalize">{user.role}</td>

//                   {/* PROJECTS + TASKS */}
//                   <td className="px-4 py-3 space-y-3">
//                     {/* PROJECTS */}
//                     {!user.projects || user.projects.length === 0 ? (
//                       <p className="text-sm text-gray-400">No projects</p>
//                     ) : (
//                       user.projects.map((project) => (
//                         <div key={project.id}>
//                           <p className="font-semibold text-sm">
//                             📁 {project.name}
//                           </p>

//                           {project.tasks?.length === 0 ? (
//                             <p className="ml-4 text-xs text-gray-400">
//                               No tasks
//                             </p>
//                           ) : (
//                             <ul className="ml-5 list-disc text-sm text-gray-700">
//                               {project.tasks.map((task) => (
//                                 <li key={task.id}>
//                                   {task.title}
//                                   <span className="ml-2 text-xs text-gray-400">
//                                     ({task.status})
//                                   </span>
//                                 </li>
//                               ))}
//                             </ul>
//                           )}
//                         </div>
//                       ))
//                     )}

//                     {/* ASSIGNED TASKS */}
//                     {user.assigned_tasks?.length > 0 && (
//                       <div>
//                         <p className="font-semibold text-sm mt-2">
//                           🧩 Assigned Tasks
//                         </p>
//                         <ul className="ml-5 list-disc text-sm text-gray-700">
//                           {user.assigned_tasks.map((task) => (
//                             <li key={task.id}>{task.title}</li>
//                           ))}
//                         </ul>
//                       </div>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }
