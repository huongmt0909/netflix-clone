import request from "../config/request";

const login = async (formData) => {
  return await request.post("/account/login", formData);
};

const refreshToken = async (formData) => {
  return await request.post("/account/refresh_token", formData);
};

export {login, refreshToken };
