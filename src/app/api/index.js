import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-lime-kappa.vercel.app/",
});

export const setToken = (token) => {
  api.defaults.headers.common.Authorization = token;
};

export const requestData = async (endpoint, token) => {
  setToken(token);
  const { data } = await api.get(endpoint);
  return data;
};

export const requestInsert = async (endpoint, body, token) => {
  setToken(token);
  const { data } = await api.post(endpoint, body);
  return data;
};

export const requestUpdate = async (endpoint, body, token) => {
  setToken(token);
  const { data } = await api.post(endpoint, body);
  return data;
};

export const requestRegister = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export const requestDelete = async (endpoint, token) => {
  setToken(token);
  const { data } = await api.delete(endpoint);
  return data;
};

export default api;
