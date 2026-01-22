import { useEffect, useState } from "react";
import api from "../../api/apiClient";
import TaskCard from "./TaskCard";

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data.tasks);
  };

  return (
    <div>
      <h3>Tasks</h3>

      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onStatusUpdated={fetchTasks}   // 🔥 THIS MAKES UI REFRESH
        />
      ))}
    </div>
  );
}

export default TaskList;



// import { useEffect, useState } from "react";
// import api from "../../api/apiClient";

// function TaskList() {
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   // 🔥 THIS IS WHERE YOUR CODE GOES
//   const fetchTasks = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get("/tasks");
//       setTasks(res.data.tasks);
//     } catch (err) {
//       setError(err.message || "Failed to load tasks");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <p>Loading tasks...</p>;
//   if (error) return <p style={{ color: "red" }}>{error}</p>;

//   return (
//     <div>
//       <h3>Tasks</h3>

//       {tasks.map((task) => (
//         <div key={task._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
//           <h4>{task.title}</h4>
//           <p>Status: {task.status}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default TaskList;
