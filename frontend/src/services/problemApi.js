import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/problem",
  withCredentials: true,
});

export const getProblems = () => API.get("/");

export const getProblem = (id) => API.get(`/${id}`);

export default API;