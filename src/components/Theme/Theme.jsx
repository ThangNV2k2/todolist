import React from "react";
import "./Theme.css";
import { useSelector, useDispatch } from "react-redux";

export default function Theme() {
  
  const theme = useSelector(state => state.theme);
  const dispatch = useDispatch();
  return (
    <div className="toggle">
      <input
        type="checkbox"
        id="toggleMode"
        checked={theme === "dark"}
        onChange={() => dispatch({ type: "TOGGLE_THEME" })}
        hidden
      />
      <label htmlFor="toggleMode"></label>
    </div>
  );
}
