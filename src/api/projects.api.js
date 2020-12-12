import httpClient from "./httpClient";

const END_POINT = "/projects";

const getAllProjects = () => httpClient.get(`${END_POINT}`);
const getProjectById = (id) => httpClient.get(`${END_POINT}/${id}`);
const createProject = (payload) => httpClient.post(`${END_POINT}`, payload);
const updateProject = (payload) =>
  httpClient.put(`${END_POINT}/${payload.id}`, payload);
const deleteProject = (id) => httpClient.delete(`${END_POINT}/${id}`);

export {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
