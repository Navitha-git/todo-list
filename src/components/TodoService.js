import axios from "axios";

const BASE_URL = "http://localhost:3000/api/tasks";
const getTaskList = () => {
  return axios.get(BASE_URL);
};

const newTask = (task) => {
  return axios.post(BASE_URL, task);
};

const updateTask = (id, task) => {
  return axios.put(BASE_URL + "/" + id, task);
};

const deletTask = (id) => {
  return axios.delete(BASE_URL + "/" + id);
};
const TodoService = { getTaskList, newTask, updateTask, deletTask };
export default TodoService;
