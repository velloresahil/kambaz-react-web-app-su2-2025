// src/Kambaz/Account/client.ts
import axios from "axios";

export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER; // e.g., http://localhost:4000

// UPDATED: single axios instance with baseURL + credentials
const api = axios.create({
  baseURL: `${REMOTE_SERVER}/api`,
  withCredentials: true,
});

// ---- Users ----
export const signin = async (credentials: any) => {
  const { data } = await api.post(`/users/signin`, credentials);
  return data;
};

export const signup = async (user: any) => {
  const { data } = await api.post(`/users/signup`, user);
  return data;
};

export const updateUser = async (user: any) => {
  const { data } = await api.put(`/users/${user._id}`, user);
  return data;
};

export const profile = async () => {
  const { data } = await api.get(`/users/profile`); // UPDATED: GET (was POST)
  return data;
};

export const signout = async () => {
  const { data } = await api.post(`/users/signout`);
  return data;
};

// ---- Current user's courses ----
export const findMyCourses = async () => {
  const { data } = await api.get(`/users/current/courses`); // unchanged path, now GET
  return data;
};

// ---- Create a course (faculty) ----
// UPDATED: moved from /users/current/courses → /courses
export const createCourse = async (course: any) => {
  const { data } = await api.post(`/courses`, course);
  return data;
};
