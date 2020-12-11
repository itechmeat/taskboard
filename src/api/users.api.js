import httpClient from "./httpClient";

const END_POINT = "/users";

const getAllUsers = () => httpClient.get(END_POINT);

const getUser = (user_id) => httpClient.get(END_POINT, { user_id });

const createUser = (username, password) =>
  httpClient.post(END_POINT, { username, password });

export { getAllUsers, getUser, createUser };
