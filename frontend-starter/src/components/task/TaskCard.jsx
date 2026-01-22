import { updateTaskStatus } from "../../api/taskApi";
import { useState } from "react";

function TaskCard({ task, onStatusUpdated }) {
  const [loading, setLoading] = useState(false);

  // 🔥 THIS IS WHERE YOUR CODE GOES
  const handleStatusChange = async (newStatus) => {
    try {
      setLoading(true);
      await updateTaskStatus(task._id, newStatus);
      onStatusUpdated(); // refresh task list
    } catch (err) {
      alert(err.message || "Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>

      <select
        value={task.status}
        disabled={loading}
        onChange={(e) => handleStatusChange(e.target.value)}
      >
        <option value="todo">Todo</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>
    </div>
  );
}

export default TaskCard;
