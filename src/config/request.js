import axios from "axios";

const request = axios.create({
  baseURL: "https://api-todo-training.herokuapp.com/api_v1",
});

export default request;
