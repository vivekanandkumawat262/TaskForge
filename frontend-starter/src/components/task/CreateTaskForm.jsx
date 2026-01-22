import { useState } from "react";
import { createTask } from "../api/taskApi";

function CreateTaskForm() {
  const [title, setTitle] = useState("");

  const handleSubmit = async () => {
    try {
      await createTask({ title, priority: "low" });
      alert("Task created");
    } catch (err) {
      alert(err.message || "Failed to create task");
    }
  };

  return (
    <div>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <button onClick={handleSubmit}>Create</button>
    </div>
  );
}

export default CreateTaskForm;
