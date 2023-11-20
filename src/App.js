import React, { useRef, useContext, useState } from "react";
import Header from "./components/Header/Header";
import TodoList from "./components/TodoList/TodoList";
import Footer from "./components/Footer/Footer";
import Theme from "./components/Theme/Theme";
import { ThemeContext } from "./components/Theme/ThemeContext";
import "./App.css";

export const options = {
  All: "All",
  Active: "Active",
  Completed: "Completed",
};

function App() {
  const { theme } = useContext(ThemeContext);
  const headerRef = useRef();
  const [ myOption, setMyOption ] = useState(options.All); 
  const requestUpdate = (id, content) =>
    headerRef.current.changeUpdate(id, content);
  const changeOption = (option) => setMyOption(option);
  return (
    <div className={`container ${theme}`}>
      <Theme />
      <h1>todos</h1>
      <div className="main">
        <Header ref={headerRef} />
        <TodoList myOption={myOption} requestUpdate={requestUpdate} />
        <Footer changeOption= {changeOption} myOption={myOption} />
      </div>
    </div>
  );
}

export default App;
