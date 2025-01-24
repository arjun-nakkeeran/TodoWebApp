import PropTypes from 'prop-types';
import { useEffect } from 'react';

function TodoItem({ task, deleteTaskCallback, moveUpCallback, moveDownCallback }) {
    console.debug("todoitem renders");
    useEffect(() => {
        console.debug("todoitem UseEffect");
    });
  return (
      <li aria-label="task">
          <span className="text">{task}</span>
          <button className="delete-button" onClick={() => deleteTaskCallback()}> 🗑️</button>
          <button className="up-button" onClick={() => moveUpCallback()}>⇧</button>
          <button className="down-button" onClick={() => moveDownCallback()}>⇩</button>
      </li>
  );
}

TodoItem.propTypes = {
    task: PropTypes.string.isRequired,
    deleteTaskCallback: PropTypes.func.isRequired,
    moveUpCallback: PropTypes.func.isRequired,
    moveDownCallback: PropTypes.func.isRequired
};

export default TodoItem;