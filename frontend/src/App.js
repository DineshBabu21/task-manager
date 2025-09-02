import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    axios.get("/api/tasks").then(res => setTasks(res.data));
  }, []);

  const addTask = () => {
    axios.post("/api/tasks", { title, completed: false }).then(res => {
      setTasks([...tasks, res.data]);
      setTitle("");
    });
  };

  const toggleTask = (id, completed) => {
    axios.put(`/api/tasks/${id}`, { id, title: tasks.find(t => t.id === id).title, completed: !completed })
      .then(res => {
        setTasks(tasks.map(t => (t.id === id ? res.data : t)));
      });
  };

  const deleteTask = (id) => {
    axios.delete(`/api/tasks/${id}`).then(() => {
      setTasks(tasks.filter(t => t.id !== id));
    });
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Task Manager</h1>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New Task" />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <span style={{ textDecoration: task.completed ? "line-through" : "" }}
                  onClick={() => toggleTask(task.id, task.completed)}>
              {task.title}
            </span>
            <button onClick={() => deleteTask(task.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
