import { v4 as uuidv4 } from "uuid";
import { produce } from "immer";
import { ADD_TODO, DELETE_TODO_ITEM, EDIT_TODO_ITEM, CHANGE_IS_COMPLETED, DELETE_ALL_COMPLETED, SWAP_TODO_ITEM } from "./actions";

const initialState = [
    { id: uuidv4(), content: "Học React", isCompleted: false },
    { id: uuidv4(), content: "Học Node", isCompleted: false },
  ]
const rootReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ADD_TODO: {
        draft.unshift(action.payload);
        break;
      }
      case DELETE_TODO_ITEM: {
        const index = draft.findIndex(
          (todo) => todo.id === action.payload
        );
        if (index !== -1) {
          draft.splice(index, 1);
        }
        break;
      }
      case EDIT_TODO_ITEM: {
        const index = draft.findIndex(
          (todo) => todo.id === action.payload.id
        );
        if (index !== -1) {
          draft[index].content = action.payload.content;
        }
        break;
      }
      case CHANGE_IS_COMPLETED: {
        const index = draft.findIndex(
          (todo) => todo.id === action.payload
        );
        if (index !== -1) {
          draft[index].isCompleted =
            !draft[index].isCompleted;
        }
        break;
      }
      case DELETE_ALL_COMPLETED: {
        return draft.filter(todo => !todo.isCompleted);
      }
      case SWAP_TODO_ITEM: {
        const { id1, id2 } = action.payload;
        const index1 = draft.findIndex(todo => todo.id === id1);
        const index2 = draft.findIndex(todo => todo.id === id2);
        if (index1 !== -1 && index2 !== -1) {
          [draft[index1], draft[index2]] = [draft[index2], draft[index1]];
        }
        break;
      }
      default: {
        break;
      }
    }
  });
};

export default rootReducer;
