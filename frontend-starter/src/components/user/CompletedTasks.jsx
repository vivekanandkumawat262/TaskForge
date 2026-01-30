// src/pages/user/CompletedTasks.jsx
import { useEffect, useState } from "react";
import api from "../../api/apiClient";
import { useAuth } from "../../auth/AuthContext";

export default function CompletedTasks() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const load = async () => {
      const res = await api.get("/admin/users");
      const me = res.data.find((u) => u.id === user.id);
      setTasks(
        me?.assigned_tasks.filter((t) => t.status === "completed") || []
      );
    };
    load();
  }, [user.id]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">✅ Completed Tasks</h2>

      {tasks.length === 0 ? (
        <p className="text-gray-400">No completed tasks</p>
      ) : (
        <ul className="ml-5 list-disc text-sm">
          {tasks.map((task) => (
            <li key={task.id}>
              {task.title}
              <span className="ml-2 text-xs text-gray-500">
                ({task.project?.name})
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
