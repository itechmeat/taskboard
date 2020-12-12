import * as API from "@/api/users.api";
import * as TYPES from "./types";

const DEMO_DATA = {
  firstName: "John",
  lastName: "Dow",
  email: "email@email.email",
  id: "lolololololo",
};

const state = () => ({
  isLoading: false,
  user: null,
});

const getters = {
  [TYPES.GET_LOADING]: (state) => state.isLoading,
  [TYPES.GET_USER]: (state) => state.user,
};

const actions = {
  async fetchUsers({ commit }) {
    try {
      const response = await API.getAllUsers();
      console.log("fetchUsers", response.data);
      // commit("SET_USERS", response.data);
      commit(TYPES.SET_LOADING, false);
    } catch (error) {
      console.error("fetchUsers");
    }
  },

  login({ commit }, payload) {
    commit(TYPES.SET_LOADING, true);

    console.log(payload);
    localStorage.setItem("u-token", "DEMO_TOKEN");
    commit(TYPES.SET_USER, DEMO_DATA);
    commit(TYPES.SET_LOADING, false);
  },

  authRequest({ commit }) {
    commit(TYPES.SET_LOADING, true);
    const token = localStorage.getItem("u-token");
    if (!token) {
      return false;
    }
    commit(TYPES.SET_USER, DEMO_DATA);
    commit(TYPES.SET_LOADING, false);
  },

  logout({ commit }) {
    localStorage.removeItem("u-token");
    commit(TYPES.SET_USER, null);
    return true;
  },
};

const mutations = {
  [TYPES.SET_LOADING]: (state, payload) => {
    state.isLoading = payload;
  },

  [TYPES.SET_USER]: (state, payload) => {
    state.user = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
