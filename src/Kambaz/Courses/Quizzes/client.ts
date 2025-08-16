import axios from "axios";

export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const axiosWithCredentials = axios.create({ withCredentials: true });

const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;

// ---- Course-level ----
export const listQuizzesByCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/quizzes`
  );
  return data;
};

export const createQuiz = async (courseId: string) => {
  const { data } = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/quizzes`
  );
  return data;
};

// ---- Quiz-level ----
export const getQuiz = async (quizId: string) => {
  const { data } = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}`);
  return data;
};

export const updateQuiz = async (quizId: string, details: any) => {
  const { data } = await axiosWithCredentials.put(
    `${QUIZZES_API}/${quizId}`,
    details
  );
  return data;
};

export const deleteQuiz = async (quizId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${QUIZZES_API}/${quizId}`
  );
  return data;
};

export const setPublish = async (quizId: string, published: boolean) => {
  const { data } = await axiosWithCredentials.put(
    `${QUIZZES_API}/${quizId}/publish`,
    { published }
  );
  return data;
};

// ---- Questions ----
export const addQuestion = async (quizId: string, q: any) => {
  const { data } = await axiosWithCredentials.post(
    `${QUIZZES_API}/${quizId}/questions`,
    q
  );
  return data;
};

export const updateQuestion = async (
  quizId: string,
  questionId: string,
  q: any
) => {
  const { data } = await axiosWithCredentials.put(
    `${QUIZZES_API}/${quizId}/questions/${questionId}`,
    q
  );
  return data;
};

export const deleteQuestion = async (quizId: string, questionId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${QUIZZES_API}/${quizId}/questions/${questionId}`
  );
  return data;
};
