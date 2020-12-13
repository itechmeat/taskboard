import { getDB, mergeRequiredKeys } from "@/store/utils";
import * as API from "@/api/projects.api";
import * as TYPES from "./types";

const db = getDB();

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
    await db.projects.toArray((res) => {
      commit(TYPES.SET_PROJECTS, res);
    });
    try {
      await API.getAllProjects();
    } catch (error) {
      console.error("fetchProjects", error);
    }
  },

  async saveProject({ dispatch }, project) {
    let projectId = project.id;

    const newProject = mergeRequiredKeys(project);

    await db.projects
      .put(newProject)
      .then(async (res) => {
        projectId = res;
        dispatch("fetchProjects");
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error("createProject: " + error);
      });

    return projectId;
  },

  async deleteProject({ dispatch }, id) {
    // TODO: Delete all Issues of the Project
    await db.projects.delete(id);
    dispatch("fetchProjects");
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
