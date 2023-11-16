import React, {
  useState,
  useRef,
  useImperativeHandle,
  useContext,
} from "react";
import { v4 as uuidv4 } from "uuid";
import "../css/Header.css";
import { ThemeContext } from "./ThemeProvider";

const Header = React.forwardRef((props, ref) => {
  const inputRef = useRef();
  const idUpdate = useRef(null);
  const [value, setValue] = useState("");
  const {addTodo, editTodoItem} = props;
  const eventSubmit = (e) => {
    if (e.code === "Enter") {
      if (value.trim() !== "") {
        const todo = {
          id: uuidv4(),
          content: value.trim(),
          isCompleted: false,
        };
        addTodo(todo);
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
        editTodoItem(idUpdate.current, value);
        setValue("");
        idUpdate.current = null;
      }
    }
  };

  const theme = useContext(ThemeContext);

  return (
    <div className={`header ${theme.theme}`}>
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