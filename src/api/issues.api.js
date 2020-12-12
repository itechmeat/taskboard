import httpClient from "./httpClient";

const END_POINT = "/issues";

const getAllIssues = () => httpClient.get(`${END_POINT}`);
const getIssueById = (id) => httpClient.get(`${END_POINT}/${id}`);
const getIssueByProjectId = (projectId) =>
  httpClient.get(`/projects/${projectId}${END_POINT}`);
const createIssue = (payload) => httpClient.post(`${END_POINT}`, payload);
const updateIssue = (payload) =>
  httpClient.put(`${END_POINT}/${payload.id}`, payload);
const deleteIssue = (id) => httpClient.delete(`${END_POINT}/${id}`);

export {
  getAllIssues,
  getIssueById,
  getIssueByProjectId,
  createIssue,
  updateIssue,
  deleteIssue,
};
