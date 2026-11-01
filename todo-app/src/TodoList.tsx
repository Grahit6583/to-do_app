import { CalendarClock } from "lucide-react";
import { useState } from "react";
import type { Task } from "./types";
import { translateText } from "./services/translationService";

const languages = [
    { name: "Hindi", code: "hi" },
    { name: "French", code: "fr" },
    { name: "Spanish", code: "es" },
    { name: "German", code: "de" },
    { name: "Japanese", code: "ja" }
];

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
    const [selectedTaskIndex, setSelectedTaskIndex] = useState<number | null>(null);

    const [translations, setTranslations] = useState<Record<number, string>>({});

    const [loadingIndex, setLoadingIndex] = useState<number | null>(null);
    const [showAddLanguage, setShowAddLanguage] = useState(false);
    const [addTranslation, setAddTranslation] = useState("");
    const [addLoading, setAddLoading] = useState(false);

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

                {!addTranslation ? (
                    <>
                        <button
                            disabled={addLoading}
                            onClick={() => setShowAddLanguage(!showAddLanguage)}
                        >
                            {addLoading ? "Translating..." : "Translate"}
                        </button>

                        {showAddLanguage && (
                            <select
                                defaultValue=""
                                onChange={async (e) => {
                                    const targetLanguage = e.target.value;

                                    if (!targetLanguage) return;

                                    const input = document.getElementById(
                                        "taskInput"
                                    ) as HTMLInputElement;

                                    if (!input.value.trim()) {
                                        alert("Please enter a task first.");
                                        return;
                                    }

                                    setAddLoading(true);

                                    try {
                                        const result = await translateText(
                                            input.value,
                                            targetLanguage
                                        );

                                        setAddTranslation(result);
                                        setShowAddLanguage(false);
                                    } catch (error) {
                                        console.error(error);
                                        alert("Translation failed. Please try again.");
                                    } finally {
                                        setAddLoading(false);
                                    }
                                }}
                            >
                                <option value="" disabled>Select language</option>

                                {languages.map((language) => (
                                    <option key={language.code} value={language.code}>
                                        {language.name}
                                    </option>
                                ))}
                            </select>
                        )}
                    </>
                ) : (
                    <div className="task-translation">
                        <p>{addTranslation}</p>

                        <button onClick={() => setAddTranslation("")}>
                            ×
                        </button>
                    </div>
                )}


                <button
                    onClick={() => {
    const input = document.getElementById(
        "taskInput"
    ) as HTMLInputElement;

    if (!input.value.trim()) {
        alert("Please enter a task.");
        return;
    }

    addTask({
        title: input.value.trim(),
        deadline: deadline
    });

    input.value = "";
    setDeadline("");
    setShowDeadline(false);

    // Reset translation UI
    setAddTranslation("");
    setShowAddLanguage(false);
    setAddLoading(false);
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
                                <div>
                                    <span className="task-title">{task.title}</span>

                                    {translations[index] && (
                                        <div className="task-translation">
                                            <p>{translations[index]}</p>
                                        </div>
                                    )}
                                </div>

                                <div className="task-actions">
                                    {!translations[index] ? (
                                        <>
                                            <button
                                                disabled={loadingIndex === index}
                                                onClick={() => {
                                                    setSelectedTaskIndex(
                                                        selectedTaskIndex === index ? null : index
                                                    );
                                                }}
                                            >
                                                {loadingIndex === index ? "Translating..." : "Translate"}
                                            </button>

                                            {selectedTaskIndex === index && (
                                                <select
                                                    defaultValue=""
                                                    onChange={async (e) => {
                                                        const targetLanguage = e.target.value;

                                                        if (!targetLanguage) return;

                                                        setLoadingIndex(index);

                                                        try {
                                                            const translatedText = await translateText(
                                                                task.title,
                                                                targetLanguage
                                                            );

                                                            setTranslations((previous) => ({
                                                                ...previous,
                                                                [index]: translatedText
                                                            }));

                                                            setSelectedTaskIndex(null);
                                                        } catch (error) {
                                                            console.error(error);
                                                            alert("Translation failed. Please try again.");
                                                        } finally {
                                                            setLoadingIndex(null);
                                                        }
                                                    }}
                                                >
                                                    <option value="" disabled>Select language</option>

                                                    {languages.map((language) => (
                                                        <option key={language.code} value={language.code}>
                                                            {language.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            )}
                                        </>
                                    ) : (
                                        <button
                                            onClick={() => {
                                                setTranslations((previous) => {
                                                    const updated = { ...previous };
                                                    delete updated[index];
                                                    return updated;
                                                });
                                            }}
                                        >
                                            ×
                                        </button>
                                    )}

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
