import axios from "axios";
import jwtDecode from "jwt-decode";
import { refreshToken } from "../services/authServices";

const requestJWT = axios.create({
  baseURL: "https://api-todo-training.herokuapp.com/api_v1",
});

requestJWT.interceptors.request.use(
  async (config) => {
    let date = new Date();
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
      ?? ''
    const tokenDecode = jwtDecode(currentUser.token);
    if (tokenDecode.exp < date.getTime() / 1000) {
      const formData = {
        refresh: currentUser.refresh
      }
      const result = await refreshToken(formData);
      if (result.status === 200) {
        const dataResponse = result.data
        if (dataResponse.status === true) {
          currentUser.token = dataResponse.data
          localStorage.setItem("currentUser", JSON.stringify(currentUser));
          config.headers["token"] = dataResponse.data;
        }
      }
    } else {
      config.headers["token"] = currentUser.token;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default requestJWT;
