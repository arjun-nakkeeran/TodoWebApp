import React, { useState } from 'react'
import TodoItem from './Todoitem'
import './TodoList.css'

const initialTasks = [
    { id: self.crypto.randomUUID(), text: "Drink some coffee" },
    { id: self.crypto.randomUUID(), text: "Create a todo app" },
    { id: self.crypto.randomUUID(), text: "Drink some more tea" }
];

function TodoList() {
    const [tasks, setTasks] = useState(initialTasks);
    const [newTaskText, setNewTaskText] = useState("");

    function handleInputChange(event) {
        setNewTaskText(event.target.value);
    }

    function addTask(event) {
        if (newTaskText.trim() !== "") {
            setTasks(t => [...t, { id: self.crypto.randomUUID(), text: newTaskText }]);
            setNewTaskText("");
        }
        event.preventDefault();
    }

    function deleteTask(id) {
        // from the event, find the record to be deleted.
        const updatedTasks = tasks.filter(t => t.id != id);
        setTasks(updatedTasks);
    }

    function moveTaskUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }
    function moveTaskDown(index) {
        if (index >= 0 && index < tasks.length-1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    return (
      <article className="todo-list">
        <h2>TODO</h2>
        <form className="todo-input" aria-controls="todo-list" onSubmit={addTask}>
            <input
                    type="text"
                    placeholder="Enter a task"
                    required
                    aria-label="Task Text"
                    value={newTaskText}
                    onChange={ handleInputChange} />
            <button className="add-button" aria-label="Add task">Add</button>
        </form>
        <br/>
        <h3>Task List</h3>
        <ol id="todo-list" aria-live="polite" aria-label="task list">
                {tasks.map((task, index) =>
                    <TodoItem
                        key={task.id}
                        task={task.text}
                        deleteTaskCallback={() => deleteTask(task.id)}
                        moveUpCallback={() => moveTaskUp(index)}
                        moveDownCallback={ () => moveTaskDown(index)}
                    ></TodoItem>
                )}
        </ol>
    </article>
  );
}

export default TodoList;