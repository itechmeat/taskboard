import httpClient from "./httpClient";

const END_POINT = "/tasks";

const getAllTasks = () => httpClient.get(`${END_POINT}`);
const getTaskById = (id) => httpClient.get(`${END_POINT}/${id}`);
const getTasksByProjectId = (projectId) =>
  httpClient.get(`/projects/${projectId}${END_POINT}`);
const getTasksByIssueId = (issueId) =>
  httpClient.get(`/issues/${issueId}${END_POINT}`);
const createTask = (payload) => httpClient.post(`${END_POINT}`, payload);
const updateTask = (payload) =>
  httpClient.put(`${END_POINT}/${payload.id}`, payload);
const deleteTask = (id) => httpClient.delete(`${END_POINT}/${id}`);

export {
  getAllTasks,
  getTaskById,
  getTasksByProjectId,
  getTasksByIssueId,
  createTask,
  updateTask,
  deleteTask,
};
