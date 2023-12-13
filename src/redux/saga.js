import { call, put, takeEvery, take } from "redux-saga/effects";
import { getTodoList, addTodoItem, deleteTodoItem, editTodoItem } from "./api";
import { channel } from "redux-saga";
import {
  FETCH_TASK_SUCCESS,
  FETCH_TASK_FAILED,
  FETCH_TASK,
  ADD_TODO,
  ADD_TODO_SUCCESS,
  EDIT_TODO_ITEM,
  DELETE_TODO_ITEM,
  SWAP_TODO_ITEM,
  //   DELETE_ALL_COMPLETED,
  //   DELETE_ALL_COMPLETED_SUCCESS,
} from "./task";

function* fetchTodoList() {
  try {
    const todoList = yield getTodoList();
    yield put({ type: FETCH_TASK_SUCCESS, todoList: todoList });
  } catch (e) {
    yield put({ type: FETCH_TASK_FAILED, message: e.message });
  }
  // const chan = yield call(channel);
  // try {
  //   const todoList = yield call(getTodoList);
  //   yield put(chan, { type: FETCH_TASK_SUCCESS, todoList: todoList });
  // } catch (e) {
  //   yield put({ chan, type: FETCH_TASK_FAILED, message: e.message });
  // }
  // while (true) {
  //   const action = yield take(chan);
  //   yield put(action);
  // }
}
function* addTodo(action) {
  try {
    const newTodo = yield call(addTodoItem, action.payload);
    yield put({
      type: ADD_TODO_SUCCESS,
      payload: { oldTodo: action.payload, newTodo },
    });
  } catch (e) {
    console.log(e.message);
  }
}
function* editTodo(action) {
  try {
    yield call(editTodoItem, action.payload);
  } catch (e) {
    console.log(e.message);
  }
}
function* swapTodoItem(action) {
  try {
    yield call(editTodoItem, action.payload.todo1); // phía api phát sinh lỗi, do trùng id
    yield call(editTodoItem, action.payload.todo2);
  } catch (e) {
    console.log(e.message);
  }
}
// function* changeIsCompleted(action) {
//     try {
//         yield call(editTodoItem, action.payload);
//         yield put({type: CHANGE_IS_COMPLETED_SUCCESS, payload: action.payload.id});
//     } catch (e) {
//         console.log(e.message);
//     }
// }
function* deleteTodo(action) {
  try {
    yield call(deleteTodoItem, action.payload);
  } catch (e) {
    console.log(e.message);
  }
}
// function* deleteAllCompleted() {
//     try {
//         const todoList = yield select(state => state.todos.todoList);
//         for (const todo of todoList) {
//             if (todo.isCompleted === true) {
//                 yield call(deleteTodoItem, todo.id);
//             }
//         }
//         yield put({type: DELETE_ALL_COMPLETED_SUCCESS});
//     } catch (e) {
//         console.log(e.message);
//     }
// }
function* todosSaga() {
  yield takeEvery(FETCH_TASK, fetchTodoList);
  yield takeEvery(ADD_TODO, addTodo);
  yield takeEvery(EDIT_TODO_ITEM, editTodo);
  yield takeEvery(DELETE_TODO_ITEM, deleteTodo);
  yield takeEvery(SWAP_TODO_ITEM, swapTodoItem);
  // yield takeEvery(CHANGE_IS_COMPLETED, changeIsCompleted);
  // yield takeEvery(DELETE_ALL_COMPLETED, deleteAllCompleted);
}

export default todosSaga;
