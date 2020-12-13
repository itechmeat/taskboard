import httpClient from "./httpClient";
import { nanoid } from "nanoid";

let sid = localStorage.getItem("sid");
if (!sid) {
  sid = nanoid(21);
  localStorage.setItem("sid", sid);
}

const END_POINT = "/projects";
const POSTFIX = "?sid=" + sid;

const getAllProjects = () => httpClient.get(`${END_POINT}${POSTFIX}`);
const getProjectById = (id) => httpClient.get(`${END_POINT}/${id}${POSTFIX}`);
const createProject = (payload) =>
  httpClient.post(`${END_POINT}${POSTFIX}`, payload);
const updateProject = (payload) =>
  httpClient.put(`${END_POINT}/${payload.id}${POSTFIX}`, payload);
const deleteProject = (id) => httpClient.delete(`${END_POINT}/${id}${POSTFIX}`);

export {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
