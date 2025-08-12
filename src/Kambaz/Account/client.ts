import axios from "axios";

export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER; 

const api = axios.create({
  baseURL: `${REMOTE_SERVER}/api`,
  withCredentials: true,
});

export const signin = async (credentials: any) => {
  const { data } = await api.post(`/users/signin`, credentials);
  return data;
};

export const signup = async (user: any) => {
  const { data } = await api.post(`/users/signup`, user);
  return data;
};


export const updateUser = async (user: any) => {
  const response = await api.put(`${USERS_API}/${user._id}`, user);
  return response.data;
};


export const profile = async () => {
  const { data } = await api.get(`/users/profile`); 
  return data;
};

export const signout = async () => {
  const { data } = await api.post(`/users/signout`);
  return data;
};


export const findMyCourses = async () => {
  const { data } = await api.get(`/users/current/courses`); 
  return data;
};


export const createCourse = async (course: any) => {
  const { data } = await api.post(`/courses`, course);
  return data;
};

export const USERS_API = `${REMOTE_SERVER}/api/users`;
export const findAllUsers = async () => {
  const response = await api.get(USERS_API);
  return response.data;
};

export const findUsersByRole = async (role: string) => {
  const response = await
    axios.get(`${USERS_API}?role=${role}`);
  return response.data;
};

export const findUsersByPartialName = async (name: string) => {
  const response = await axios.get(`${USERS_API}?name=${name}`);
  return response.data;
};

export const findUserById = async (id: string) => {
  const response = await axios.get(`${USERS_API}/${id}`);
  return response.data;
};

export const deleteUser = async (userId: string) => {
  const response = await axios.delete( `${USERS_API}/${userId}` );
  return response.data;
};

export const createUser = async (user: any) => {
  const response = await axios.post(`${USERS_API}`, user);
  return response.data;
};
