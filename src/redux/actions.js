// actions.js
export const ADD_TODO = "ADD_TODO";
export const DELETE_TODO_ITEM = "DELETE_TODO_ITEM";
export const EDIT_TODO_ITEM = "EDIT_TODO_ITEM";
export const CHANGE_IS_COMPLETED = "CHANGE_IS_COMPLETED";
export const DELETE_ALL_COMPLETED = "DELETE_ALL_COMPLETED";
export const SWAP_TODO_ITEM = "SWAP_TODO_ITEM";
export const addTodo = (todo) => {
  return {
    type: ADD_TODO,
    payload: todo,
  };
};

export const deleteTodoItem = (id) => {
  return {
    type: DELETE_TODO_ITEM,
    payload: id,
  };
};

export const editTodoItem = (id, content) => {
  return {
    type: EDIT_TODO_ITEM,
    payload: { id, content },
  };
};

export const changeIsCompleted = (id) => {
  return {
    type: CHANGE_IS_COMPLETED,
    payload: id,
  };
};

export const deleteAllCompleted = () => {
  return {
    type: DELETE_ALL_COMPLETED,
  };
}
export const swapTodoItem = (id1, id2) => {
  return {
    type: SWAP_TODO_ITEM,
    payload: { id1, id2 },
  };
};