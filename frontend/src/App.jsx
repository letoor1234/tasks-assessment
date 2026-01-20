import React from "react";
import "./App.css";
import TasksList from "./components/TasksList";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Task Manager</h1>
        <p>React Frontend Developer Assessment</p>
      </header>

      <main className="app-main">
        {/* 
          TODO: Implement the following components:
          1. TaskList component (Task 1)
          2. TaskForm component (Task 2)
          3. Task filtering and status management (Task 3)
        */}
        <ToastContainer theme="dark" />
        <TasksList />
      </main>
    </div>
  );
}

export default App;
