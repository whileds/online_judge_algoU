import axios from "axios";

const API = axios.create({
  baseURL: "http://15.134.37.253:3000/submit",
  withCredentials: true,
});

export const submitCode = (data) => API.post("/", data);