import React, { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";
import "./Theme.css";

export default function Theme() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="toggle">
      <input
        type="checkbox"
        id="toggleMode"
        checked={theme === "dark"}
        onChange={toggleTheme}
        hidden
      />
      <label htmlFor="toggleMode"></label>
    </div>
  );
}
