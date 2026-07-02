import axios from "axios";

const API = axios.create({
    baseURL: "http://15.134.37.253:3000/auth",
    withCredentials: true
});

export const registerUser = (data) => API.post("/register", data);

export const loginUser = (data) => API.post("/login", data);

export const getProfile = () => API.get("/profile");
export default API;