import { v4 as uuidv4 } from "uuid";
import { produce } from "immer";
const initialState = {
  todoList: [
    { id: uuidv4(), content: "Học React", isCompleted: false },
    { id: uuidv4(), content: "Học Node", isCompleted: false },
  ],
};

const rootReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case "ADD_TODO": {
        draft.todoList.unshift(action.payload);
        break;
      }
      case "DELETE_TODO_ITEM": {
        const index = draft.todoList.findIndex(
          (todo) => todo.id === action.payload
        );
        if (index !== -1) {
          draft.todoList.splice(index, 1);
        }
        break;
      }
      case "EDIT_TODO_ITEM": {
        const index = draft.todoList.findIndex(
          (todo) => todo.id === action.payload.id
        );
        if (index !== -1) {
          draft.todoList[index].content = action.payload.content;
        }
        break;
      }
      case "CHANGE_IS_COMPLETED": {
        const index = draft.todoList.findIndex(
          (todo) => todo.id === action.payload
        );
        if (index !== -1) {
          draft.todoList[index].isCompleted =
            !draft.todoList[index].isCompleted;
        }
        break;
      }
      case "DELETE_ALL_COMPLETED": {
        draft.todoList = draft.todoList.filter((todo) => !todo.isCompleted);
        break;
      }
      default: {
        break;
      }
    }
  });
};

export default rootReducer;
