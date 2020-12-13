import * as API from "@/api/projects.api";
import * as TYPES from "./types";

const state = () => ({
  isLoading: false,
  projects: [],
  currentProjectId: undefined,
});

const getters = {
  [TYPES.GET_LOADING]: (state) => state.isLoading,
  [TYPES.GET_PROJECTS]: (state) => state.projects,
  [TYPES.GET_PROJECT_BY_ID]: (state) => (id) => {
    return (
      state.projects.find(
        (project) => project.id === (id || state.currentProjectId)
      ) || state.projects[0]
    );
  },
};

const actions = {
  async fetchProjects({ commit }) {
    try {
      const response = await API.getAllProjects();
      commit(TYPES.SET_PROJECTS, response.data);
    } catch (error) {
      console.error("fetchProjects", error);
    }
  },

  async fetchProjectById({ commit }, id) {
    try {
      const response = await API.getProjectById(id);
      console.log("fetchProjectById", response.data);
      // commit(TYPES.SET_PROJECTS, response.data);
      commit(TYPES.SET_LOADING, false);
    } catch (error) {
      console.error("fetchProjectById", error);
    }
  },

  async createProject() {
    fetch("http://api.estim8.work/projects?sid=rtEK81PpPJ17zZwDfqOQC", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: { test: "123" },
    })
      .then(async function (data) {
        console.log("Request succeeded with JSON response", await data.json());
      })
      .catch(function (error) {
        console.log("Request failed", error);
      });
  },

  async createProject2({ commit, dispatch }, payload) {
    try {
      const response = await API.createProject(payload);
      console.log("createProject", response);
      await dispatch("fetchProjects");
      // commit(TYPES.SET_PROJECTS, response.data);
      commit(TYPES.SET_LOADING, false);
    } catch (error) {
      console.error("createProject", error);
    }
  },

  async saveProject({ commit }, project) {
    try {
      const response = await API.updateProject(project);
      console.log("saveProject", response.data);
      // commit(TYPES.SET_PROJECTS, response.data);
      commit(TYPES.SET_LOADING, false);
    } catch (error) {
      console.error("saveProject", error);
    }
  },

  async deleteProject({ commit, dispatch }, id) {
    try {
      const response = await API.deleteProject(id);
      console.log("deleteProject", response);
      await dispatch("fetchProjects");
      // commit(TYPES.SET_PROJECTS, response.data);
      await dispatch("fetchProjects");
      commit(TYPES.SET_LOADING, false);
    } catch (error) {
      console.error("deleteProject", error);
    }
  },
};

const mutations = {
  [TYPES.SET_LOADING]: (state, payload) => {
    state.isLoading = payload;
  },

  [TYPES.SET_PROJECTS]: (state, payload) => {
    state.projects = payload;
  },

  [TYPES.SET_CURRENT_PROJECT]: (state, payload) => {
    state.currentProjectId = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
