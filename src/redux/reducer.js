import { produce } from "immer";
import {
  FETCH_TASK,
  FETCH_TASK_SUCCESS,
  FETCH_TASK_FAILED,
  ADD_TODO,
  ADD_TODO_SUCCESS,
  EDIT_TODO_ITEM,
  EDIT_TODO_ITEM_SUCCESS,
  DELETE_TODO_ITEM,
  DELETE_TODO_ITEM_SUCCESS,
  // DELETE_ALL_COMPLETED,
  // DELETE_ALL_COMPLETED_SUCCESS,
} from "./task";
const initialState = {
  todoList: [],
  loading: false,
  error: null,
};
const rootReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case FETCH_TASK: {
        draft.loading = true;
        break;
      }
      case FETCH_TASK_SUCCESS: {
        draft.todoList = action.todoList;
        draft.loading = false;
        break;
      }
      case FETCH_TASK_FAILED: {
        draft.loading = false;
        draft.error = action.message;
        console.log(action.message);
        break;
      }
      case ADD_TODO: {
        draft.loading = true;
        break;
      }
      case ADD_TODO_SUCCESS: {
        draft.todoList.push(action.payload.todo);
        draft.loading = false;
        break;
      }
      case EDIT_TODO_ITEM: {
        draft.loading = true;
        break;
      }
      case EDIT_TODO_ITEM_SUCCESS: {
        const index = draft.todoList.findIndex(
          (todo) => todo.id === action.payload.id
        );
        draft.todoList[index] = action.payload;
        draft.loading = false;
        break;
      }
      case DELETE_TODO_ITEM: {
        draft.loading = true;
        break;
      }
      case DELETE_TODO_ITEM_SUCCESS: {
        const index = draft.todoList.findIndex(
          (todo) => todo.id === action.payload
        );
        if (index !== -1) {
          draft.todoList.splice(index, 1);
        }
        draft.loading = false;
        break;
      }
      // case DELETE_ALL_COMPLETED: {
      //   draft.loading = true;
      //   break;
      // }
      // case DELETE_ALL_COMPLETED_SUCCESS: {
      //   draft.todoList = draft.todoList.filter((todo) => !todo.isCompleted);
      //   draft.loading = false;
      //   break;
      // }
      // case CHANGE_IS_COMPLETED: {
      //   draft.loading = true;
      //   break;
      // }
      // case CHANGE_IS_COMPLETED_SUCCESS: {
      //   const index = draft.findIndex((todo) => todo.id === action.payload);
      //   if (index !== -1) {
      //     draft[index].isCompleted = !draft[index].isCompleted;
      //   }
      //   break;
      // }
      // case SWAP_TODO_ITEM: {
      //   const { id1, id2 } = action.payload;
      //   const index1 = draft.findIndex(todo => todo.id === id1);
      //   const index2 = draft.findIndex(todo => todo.id === id2);
      //   if (index1 !== -1 && index2 !== -1) {
      //     [draft[index1], draft[index2]] = [draft[index2], draft[index1]];
      //   }
      //   break;
      // }
      default: {
        break;
      }
    }
  });
};

export default rootReducer;
