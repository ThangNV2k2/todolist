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
  SWAP_TODO_ITEM,
  SWAP_TODO_ITEM_SUCCESS,
  // DELETE_ALL_COMPLETED,
  // DELETE_ALL_COMPLETED_SUCCESS,
} from "./task";
const initialState = [];
const rootReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case FETCH_TASK: {
        break;
      }
      case FETCH_TASK_SUCCESS: {
        draft.splice(0, draft.length, ...action.todoList);
        break;
      }
      case FETCH_TASK_FAILED: {
        console.log(action.message);
        break;
      }
      case ADD_TODO: {
        break;
      }
      case ADD_TODO_SUCCESS: {
        draft.push(action.payload);
        break;
      }
      case EDIT_TODO_ITEM: {
        break;
      }
      case EDIT_TODO_ITEM_SUCCESS: {
        const index = draft.todoList.findIndex(
          (todo) => todo.id === action.payload.id
        );
        draft[index] = action.payload;
        break;
      }
      case DELETE_TODO_ITEM: {
        break;
      }
      case DELETE_TODO_ITEM_SUCCESS: {
        const index = draft.findIndex((todo) => todo.id === action.payload);
        if (index !== -1) {
          draft.splice(index, 1);
        }
        break;
      }
      case SWAP_TODO_ITEM: {
        break;
      }
      case SWAP_TODO_ITEM_SUCCESS: {
        const { todo1, todo2 } = action.payload;
        const index1 = draft.findIndex((todo) => todo.id === todo1.id);
        const index2 = draft.findIndex((todo) => todo.id === todo2.id);
        if (index1 !== -1 && index2 !== -1) {
          [draft[index1], draft[index2]] = [draft[index2], draft[index1]];
        }
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
