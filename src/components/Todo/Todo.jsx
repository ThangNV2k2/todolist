import React, { useState, useRef, useEffect, useContext } from "react";
import "./Todo.css";
import { useDispatch } from "react-redux";
import { ThemeContext } from "../Theme/ThemeContext";
import { EDIT_TODO_ITEM, SWAP_TODO_ITEM, DELETE_TODO_ITEM } from "../../redux/task";
function Todo(props) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const { todo, requestUpdate } = props;
  const [value, setValue] = useState(todo.content);
  const inputRef = useRef();
  const { theme } = useContext(ThemeContext);

  const onDragStart = (e, id) => {
    e.dataTransfer.setData("text/plain", id);
  };
  const onDrop = (e, id2) => {
    const id1 = e.dataTransfer.getData("text/plain");
    dispatch({ type: SWAP_TODO_ITEM, payload: { id1, id2 } });
  };
  const handleDoubleClick = () => setIsEditing(true);
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setIsEditing(false);
      const editTodo = {
        id: todo.id,
        content: e.target.value,
        isCompleted: todo.isCompleted,
      }
      dispatch({ type: EDIT_TODO_ITEM, payload: editTodo });
    }
  };
  const changeIsCompleted = () => {
    debugger
    const editTodo = {
      id: todo.id,
      content: todo.content,
      isCompleted: !todo.isCompleted,
    }
    dispatch({ type: EDIT_TODO_ITEM, payload: editTodo });
  }
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
        <div
          className="todo"
          draggable={true}
          onDragStart={(e) => onDragStart(e, todo.id)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => onDrop(e, todo.id)}
          style={{ cursor: "move" }}
        >
          <div className="todo_check">
            <label className="checkbox_item" htmlFor={todo.id}>
              <input
                type="checkbox"
                id={todo.id}
                className="checkbox"
                checked={todo.isCompleted}
                onChange={changeIsCompleted}
              />
              <i className="fa-solid fa-check"></i>
            </label>
          </div>
          <div
            className={`div_content ${!todo.isCompleted ? theme : "content"}`}
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
                onClick={() => dispatch({ type: DELETE_TODO_ITEM, payload: todo.id })}
              ></i>
            </div>
          </div>
        </div>
      )}
    </li>
  );
}

export default Todo;
