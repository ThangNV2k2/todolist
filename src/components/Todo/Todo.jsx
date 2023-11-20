import React, { useState, useRef, useEffect, useContext } from "react";
import "./Todo.css";
import { useDispatch } from 'react-redux';
import { ThemeContext } from "../Theme/ThemeContext";
import { deleteTodoItem, editTodoItem, changeIsCompleted } from '../../redux/actions';

function Todo(props) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const { todo, requestUpdate } = props;
  const [value, setValue] = useState(todo.content);
  const inputRef = useRef();
  const { theme } = useContext(ThemeContext);

  const handleDoubleClick = () => setIsEditing(true);
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setIsEditing(false);
      dispatch(editTodoItem(todo.id, e.target.value));
    }
  };

  return (
    <li className="todo-item">
      {isEditing ? (
        <div className="todo_input">
          <input
            onKeyDown={handleKeyDown}
            type="text"
            className="input"
            onChange={(e) => setValue(e.target.value)}
            value={value}
            ref={inputRef}
          />
        </div>
      ) : (
        <div className="todo">
          <div className="todo_check">
            <label className="checkbox_item" htmlFor={todo.id}>
              <input
                type="checkbox"
                id={todo.id}
                className="checkbox"
                checked={todo.isCompleted}
                onChange={() => dispatch(changeIsCompleted(todo.id))}
              />
              <i className="fa-solid fa-check"></i>
            </label>
          </div>
          <div
            className={`div_content ${
              !todo.isCompleted ? theme : "content"
            }`}
            onDoubleClick={handleDoubleClick}
          >
            <p>{todo.content}</p>
            <div className="feature">
              <i
                className="fa-solid fa-pencil"
                onClick={() => requestUpdate(todo.id, todo.content)}
              ></i>
              <i
                className="fa-solid fa-trash"
                onClick={() => dispatch(deleteTodoItem(todo.id))}
              ></i>
            </div>
          </div>
        </div>
      )}
    </li>
  );
}


export default Todo;