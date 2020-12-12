import httpClient from "./httpClient";

const END_POINT = "/auth";

const getAllUsers = () => httpClient.get(`${END_POINT}/users`);
const signIn = (payload) => httpClient.post(END_POINT + "/sign-in", payload);
const signUp = (payload) => httpClient.post(END_POINT + "/sign-up", payload);
const forgotPassword = (payload) =>
  httpClient.post(END_POINT + "/forgot-password", payload);
const resetPassword = (payload) =>
  httpClient.post(END_POINT + "/reset-password", payload);

export { getAllUsers, signIn, signUp, forgotPassword, resetPassword };
