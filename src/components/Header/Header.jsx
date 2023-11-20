import React, {
  useState,
  useRef,
  useImperativeHandle,
} from "react";
import { v4 as uuidv4 } from "uuid";
import "./Header.css";
import { useDispatch } from 'react-redux';
import { addTodo, editTodoItem } from '../../redux/actions';
import { ThemeContext } from "../Theme/ThemeContext"
import { useContext } from "react";

const Header = React.forwardRef((props, ref) => {
  const inputRef = useRef();
  const idUpdate = useRef(null);
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext);
  const eventSubmit = (e) => {
    if (e.code === "Enter") {
      if (value.trim() !== "") {
        const todo = {
          id: uuidv4(),
          content: value.trim(),
          isCompleted: false,
        };
        dispatch(addTodo(todo));
        setValue("");
      }
    }
  };
  useImperativeHandle(ref, () => ({
    changeUpdate(id, content) {
      idUpdate.current = id;
      setValue(content);
      inputRef.current.focus();
    },
  }));
  const eventUpdate = (e) => {
    if (e.code === "Enter") {
      if (value.trim() !== "") {
        dispatch(editTodoItem(idUpdate.current, value));
        setValue("");
        idUpdate.current = null;
      }
    }
  };

  return (
    <div className={`header ${theme}`}>
      <input
        type="text"
        placeholder={!idUpdate.current ? "What needs to be done?" : ""}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={!idUpdate.current ? eventSubmit : eventUpdate}
        ref={inputRef}
      />
    </div>
  );
});

export default Header;