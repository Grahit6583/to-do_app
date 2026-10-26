type TodoListProps = {
    tasks: string[];
    addTask: (task: string) => void;
    deleteTask: (index: number) => void;
    editTask: (index: number) => void;
    editingIndex: number | null;
    editingTask: string;
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
    setEditingTask,
    saveTask,
}: TodoListProps) {
    return (
        <div className="todo-container">
            <h1>My To-Do List</h1>

            <div className="add-task">
                <input
                    type="text"
                    placeholder="Enter a task"
                    id="taskInput"
                />

                <button
                    onClick={() => {
                        const input = document.getElementById(
                            "taskInput"
                        ) as HTMLInputElement;

                        addTask(input.value);
                        input.value = "";
                    }}
                >
                    Add Task
                </button>
            </div>

            {/* Task List */}
            <h2>Tasks</h2>

            {tasks.map((task, index) => (
                <div key={index} className="task">
                    {editingIndex === index ? (
                        <>
                            <input
                                type="text"
                                value={editingTask}
                                onChange={(e) => setEditingTask(e.target.value)}
                            />

                            <button onClick={saveTask}>
                                Save
                            </button>
                        </>
                    ) : (
                        <>
                            <span>{task}</span>

                            <button onClick={() => editTask(index)}>
                                Edit
                            </button>

                            <button onClick={() => deleteTask(index)}>
                                Delete
                            </button>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}

export default TodoList;