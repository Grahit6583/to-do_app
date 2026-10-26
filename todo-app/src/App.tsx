import { useState } from "react";
import TodoList from "./TodoList";

function App() {
  console.log("4 -> APP REVOKE");
  const [tasks, setTasks] = useState<string[]>([]);

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingTask, setEditingTask] = useState("");

  function addTask(task: string) {
    console.log(task);
    if (task.trim() === "") {
      return;
    }
      const newTasks = [...tasks, task];

      console.log("New tasks:", newTasks);
    
      setTasks(newTasks);
  }

  function deleteTask(index: number) {
    console.log("DELETED TASK",tasks[index]);
    setTasks(tasks.filter((_, i) => i !== index));
  }

  function editTask(index: number) {
    setEditingIndex(index);
    setEditingTask(tasks[index]);
  }

  function saveTask() {
    if (editingTask.trim() === "") {
      return;
    }

    if (editingIndex === null) {
      return;
    }

    const newTasks = [...tasks];
    newTasks[editingIndex] = editingTask;

    setTasks(newTasks);

    setEditingIndex(null);
    setEditingTask("");
  }

  return (
    <TodoList
      tasks={tasks}
      addTask={addTask}
      deleteTask={deleteTask}
      editTask={editTask}
      editingIndex={editingIndex}
      editingTask={editingTask}
      setEditingTask={setEditingTask}
      saveTask={saveTask}
    />
  );
}

export default App;