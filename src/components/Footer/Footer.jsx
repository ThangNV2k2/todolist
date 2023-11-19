import React, { useState, useEffect, useContext } from 'react';
import { options } from '../../App';
import { ThemeContext } from '../Theme/ThemeProvider';
import './Footer.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAllCompleted, changeOption } from '../../redux/actions';

function Footer() {
  const [cntTodo, setCntTodo] = useState(0);
  const todoList = useSelector(state => state.todoList);
  const myOption = useSelector(state => state.myOption);
  const dispatch = useDispatch();
  const theme = useContext(ThemeContext);
  
  useEffect(() => {
    let cnt = 0;
    todoList.forEach((e) => {
      if (!e.isCompleted) {
        cnt++;
      }
    });
    setCntTodo(cnt);
  }, [todoList]);

  return (
    <div className={`Footer ${theme.theme}`}>
      {todoList.length > 0 && (
        <div className="Footer--left">
          <p>{cntTodo} items left</p>
          <div className="btns">
            <button className={`btn ${myOption === options.All ? 'act' : ''}`} onClick={() => dispatch(changeOption(options.All))}>
              All
            </button>
            <button className={`btn ${myOption === options.Active ? 'act' : ''}`} onClick={() => dispatch(changeOption(options.Active))}>
              Active
            </button>
            <button
              className={`btn ${myOption === options.Completed ? 'act' : ''}`}
              onClick={() => dispatch(changeOption(options.Completed))}
            >
              Completed
            </button>
          </div>
        </div>
      )}
      <div className="Footer--right">
        {todoList.length - cntTodo > 0 && (
          <button className="clearBtn" onClick={() => dispatch(deleteAllCompleted())}>
            Clear completed
          </button>
        )}
      </div>
    </div>
  );
}

export default Footer;