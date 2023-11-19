// actions.js

export const addTodo = (todo) => {
  return {
    type: "ADD_TODO",
    payload: todo,
  };
};

export const deleteTodoItem = (id) => {
  return {
    type: "DELETE_TODO_ITEM",
    payload: id,
  };
};

export const editTodoItem = (id, content) => {
  return {
    type: "EDIT_TODO_ITEM",
    payload: { id, content },
  };
};

export const changeIsCompleted = (id) => {
  return {
    type: "CHANGE_IS_COMPLETED",
    payload: id,
  };
};

export const changeOption = (option) => {
  return {
    type: "CHANGE_OPTION",
    payload: option,
  };
};

export const deleteAllCompleted = () => {
  return {
    type: "DELETE_ALL_COMPLETED",
  };
}