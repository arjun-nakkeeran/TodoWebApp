import React, { useState, useEffect } from 'react'
import TodoItem from './Todoitem'
import './TodoList.css'

const initialTasks = [
    { id: self.crypto.randomUUID(), title: "Drink some coffee" },
    { id: self.crypto.randomUUID(), title: "Create a todo app" },
    { id: self.crypto.randomUUID(), title: "Drink some more tea" }
];

function TodoList() {
    const [tasks, setTasks] = useState(initialTasks);
    const [newTaskText, setNewTaskText] = useState("");

    useEffect(() => {
        const url = "https://jsonplaceholder.typicode.com/todos";
        fetch(url)
        .then((res) => res.json())
        .then((data) => setTasks(data));
        
    }, []);

    function handleInputChange(event) {
        setNewTaskText(event.target.value);
    }

    const addTask = () => {
        if (newTaskText.trim() !== "") {
            //useCallback(() => {
            setTasks(t => [...t, { id: self.crypto.randomUUID(), title: newTaskText }]);
            //}, [tasks]);
            setNewTaskText("");
        }
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
        <form className="todo-input" aria-controls="todo-list">
            <input
                    type="text"
                    placeholder="Enter a task"
                    required
                    aria-label="Task Text"
                    value={newTaskText}
                    onChange={ handleInputChange} />
            <button className="add-button" aria-label="Add task" onClick={addTask}>Add</button>
        </form>
        <br/>
        <h3>Task List</h3>
        <ol id="todo-list" aria-live="polite" aria-label="task list">
                {tasks.map((task, index) =>
                    <TodoItem
                        key={task.id}
                        task={task.title}
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