import { CalendarClock } from "lucide-react";
import { useState } from "react";
import type { Task } from "./types";

type TodoListProps = {
    tasks: Task[];
    addTask: (task: Task) => void;
    deleteTask: (index: number) => void;
    editTask: (index: number) => void;
    editingIndex: number | null;
    editingTask: string;
    editingDeadline: string;
    setEditingDeadline: (deadline: string) => void;
    setEditingTask: (task: string) => void;
    saveTask: () => void;
};

function TodoList({
    tasks,
    addTask,
    deleteTask,
    editTask,
    editingIndex,
    editingTask,
    editingDeadline,
    setEditingTask,
    setEditingDeadline,
    saveTask,
}: TodoListProps) {

    const [showDeadline, setShowDeadline] = useState(false);
    const [deadline, setDeadline] = useState("");

    return (
        <div className="todo-container">
            <h1>My Todo App</h1>

            <div className="add-task">
                <div className="task-input-group">
                    <input
                        type="text"
                        placeholder="Enter a task"
                        id="taskInput"
                    />

                    <CalendarClock
                        size={22}
                        onClick={() => setShowDeadline(!showDeadline)}
                    />
                </div>

                {showDeadline && (
                    <input
                        type="datetime-local"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                    />
                )}

                <button
                    onClick={() => {
                        const input = document.getElementById(
                            "taskInput"
                        ) as HTMLInputElement;

                        addTask({
                            title: input.value,
                            deadline: deadline
                        });

                        input.value = "";
                        setDeadline("");
                        setShowDeadline(false);
                    }}
                >
                    Add Task
                </button>
            </div>

            <h2>Tasks</h2>


            {tasks.map((task, index) => (
                <div key={index} className="task">

                    {editingIndex === index ? (
                        <div className="task-edit">
                            <input
                                type="text"
                                value={editingTask}
                                onChange={(e) => setEditingTask(e.target.value)}
                            />

                            <input
                                type="datetime-local"
                                value={editingDeadline}
                                onChange={(e) => setEditingDeadline(e.target.value)}
                            />

                            <button onClick={saveTask}>Save</button>
                        </div>
                    ) : (
                        <div className="task-content">

                            {task.deadline && (
                                <div className="task-deadline">
                                    <span>
                                        {new Date(task.deadline).toLocaleDateString("en-IN")}
                                    </span>

                                    <span>
                                        {new Date(task.deadline).toLocaleTimeString("en-IN", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: true
                                        })}
                                    </span>
                                </div>
                            )}

                            <div className="task-details">
                                <span className="task-title">{task.title}</span>

                                <div className="task-actions">
                                    <button onClick={() => editTask(index)}>Edit</button>
                                    <button onClick={() => deleteTask(index)}>Delete</button>
                                </div>
                            </div>

                        </div>
                    )}
                </div>
            ))}

        </div>
    );
}

export default TodoList;
