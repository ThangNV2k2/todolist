import React, { useRef, useContext } from "react";
import Header from "./components/Header/Header";
import TodoList from "./components/TodoList/TodoList";
import Footer from "./components/Footer/Footer";
import Theme from "./components/Theme/Theme";
import { ThemeContext } from "./components/Theme/ThemeProvider";
import "./App.css";

export const options = {
  All: "All",
  Active: "Active",
  Completed: "Completed",
};

function App() {
  const themeContext = useContext(ThemeContext);
  const theme = themeContext.theme;
  const headerRef = useRef();
  const requestUpdate = (id, content) =>
    headerRef.current.changeUpdate(id, content);

  return (
    <div className={`container ${theme}`}>
      <Theme />
      <h1>todos</h1>
      <div className="main">
        <Header ref={headerRef} />
        <TodoList requestUpdate={requestUpdate} numberTodoInit = {4} endScrollPosition = {10} />
        <Footer />
      </div>
    </div>
  );
}

export default App;
