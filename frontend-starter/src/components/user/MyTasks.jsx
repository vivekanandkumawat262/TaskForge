// src/pages/user/MyTasks.jsx
import { useEffect, useState } from "react";
import api from "../../api/apiClient";
import { useAuth } from "../../auth/AuthContext";

export default function MyTasks() {
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

  const grouped = tasks.reduce((acc, task) => {
    const pid = task.project?.id || "none";
    const pname = task.project?.name || "No Project";

    if (!acc[pid]) acc[pid] = { name: pname, tasks: [] };
    acc[pid].tasks.push(task);
    return acc;
  }, {});

  return (
    <div>
      <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-gray-900">
        🧩 My Tasks
      </h2>

      {Object.values(grouped).map((group) => (
        <div
          key={group.name}
          className="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
        >
          {/* Project */}
          <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-indigo-700">
            📁 <span className="uppercase text-xs text-gray-500">Project:</span>
            <span className="tracking-wide">{group.name}</span>
          </p>

          {/* Tasks */}
          <ul className="space-y-2">
            {group.tasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center justify-between rounded-md bg-gray-50 px-3 py-2 text-sm text-gray-800"
              >
                {/* Task */}
                <span className="font-medium">
                  <span className="mr-1 uppercase text-xs text-gray-500">
                    Task:
                  </span>
                  #{task.id} {task.title}
                </span>

                {/* Status */}
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                    task.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : task.status === "in-progress"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {task.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
