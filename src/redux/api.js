import axios from "axios";

export const endpoint_api =
  "https://6563668aee04015769a72825.mockapi.io/api/v1/todoList";

export async function getTodoList() {
  try {
    const response = await axios.get(endpoint_api);
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function addTodoItem(todo) {
  try {
    const response = await axios.post(endpoint_api, todo);
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function editTodoItem(todo) {
  try {
    const response = await axios.put(`${endpoint_api}/${todo.id}`, todo);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
export async function deleteTodoItem(id) {
  try {
    const response = await axios.delete(`${endpoint_api}/${id}`);
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
// export async function changeIsCompleted(todo) {
//     try {
//         const response = await axios.put(`${endpoint_api}/${todo.id}`, todo);
//         return response.data;
//       } catch (err) {
//         console.log(err);
//         throw err;
//       }
// }
