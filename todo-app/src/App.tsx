import { useState, useEffect } from "react";
import TodoList from "./TodoList";
import type { Task } from "./types";

function App() {
    const [tasks, setTasks] = useState<Task[]>(() => {
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editingTask, setEditingTask] = useState("");
    const [editingDeadline, setEditingDeadline] = useState("");

    function addTask(task: Task) {
        if (task.title.trim() === "") {
            return;
        }

        setTasks([...tasks, task]);
    }

    function deleteTask(index: number) {
        setTasks(tasks.filter((_, i) => i !== index));
    }

    function editTask(index: number) {
        setEditingIndex(index);
        setEditingTask(tasks[index].title);
        setEditingDeadline(tasks[index].deadline);
    }

    function saveTask() {
        if (editingTask.trim() === "") {
            return;
        }

        if (editingIndex === null) {
            return;
        }

        const newTasks = [...tasks];

        newTasks[editingIndex] = {
            ...newTasks[editingIndex],
            title: editingTask,
            deadline: editingDeadline
        };

        setTasks(newTasks);

        setEditingIndex(null);
        setEditingTask("");
        setEditingDeadline("");
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
            editingDeadline={editingDeadline}
            setEditingDeadline={setEditingDeadline}
            saveTask={saveTask}
        />
    );
}

export default App;
