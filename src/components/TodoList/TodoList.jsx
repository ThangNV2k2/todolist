import React from "react";
import Todo from "../Todo/Todo";
import { options } from "../../App";
import "./TodoList.css";
import { withScroll } from "../../HOC/withScroll";
import { useSelector } from 'react-redux';


const TodoList = React.forwardRef((props, ref) => {
  const todoList = useSelector(state => state.todoList);
  const myOption = useSelector(state => state.myOption);
  const theme = useSelector(state => state.theme);
  const { numberTodo, loadingState } = props;

  const displayTodoList = () => {
    const todoListDisplay = [];
    for (let i = 0; i < numberTodo; i++) {
      if (
        todoList[i] &&
        todoList[i].id &&
        (myOption === options.All ||
          (myOption === options.Active && !todoList[i].isCompleted) ||
          (myOption === options.Completed && todoList[i].isCompleted))
      ) {
        todoListDisplay.push(
          <Todo
            key={todoList[i].id}
            todo={todoList[i]}
            requestUpdate={props.requestUpdate}
          />
        );
      }
    }
    return todoListDisplay;
  };

  return (
    <div className={`${theme}`}>
      <ul
        className="todo-list"
        ref={ref}
        style={{ maxHeight: "200px", overflowY: "scroll" }}
      >
        { displayTodoList() }
      </ul>
      {loadingState ? <p className="loading">Loading more todo...</p> : ""}
    </div>
  );
});

export default withScroll(TodoList);