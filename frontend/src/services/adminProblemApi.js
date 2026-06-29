import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:3000/problem",
    withCredentials: true,
});

export const createProblem = (problem) => API.post("/", problem);

export const updateProblem = (id, problem) => API.put(`/${id}`, problem);

export const deleteProblem = (id) => API.delete(`/${id}`);

export const getProblems = () => API.get("/");