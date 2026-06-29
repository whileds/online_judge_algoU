import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/submit",
  withCredentials: true,
});

export const submitCode = (data) => API.post("/", data);