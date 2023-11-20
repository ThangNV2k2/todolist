import React, { useState, useEffect, useContext, } from 'react';
import { options } from '../../App';
import './Footer.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAllCompleted } from '../../redux/actions';
import { ThemeContext } from '../Theme/ThemeContext';

function Footer(props) {
  const { theme } = useContext(ThemeContext);
  const todoList = useSelector(state => state.todoList);
  const [cntTodo, setCntTodo] = useState(0);
  const { myOption, changeOption } = props
  const dispatch = useDispatch();
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
    <div className={`Footer ${theme}`}>
      {todoList.length > 0 && (
        <div className="Footer--left">
          <p>{cntTodo} items left</p>
          <div className="btns">
            <button className={`btn ${myOption === options.All ? 'act' : ''}`} onClick={() => changeOption(options.All)}>
              All
            </button>
            <button className={`btn ${myOption === options.Active ? 'act' : ''}`} onClick={() => changeOption(options.Active)}>
              Active
            </button>
            <button
              className={`btn ${myOption === options.Completed ? 'act' : ''}`}
              onClick={() => changeOption(options.Completed)}
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