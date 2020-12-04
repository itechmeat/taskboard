import { getDB, mergeRequiredKeys } from "@/store/utils";

import * as TYPES from "./types";

const db = getDB();

const state = () => ({
  isLoading: false,
  issues: [],
});

const getters = {
  [TYPES.GET_LOADING]: (state) => state.isLoading,
  [TYPES.GET_ISSUES]: (state) => state.issues,
  [TYPES.GET_ISSUE_BY_ID]: (state) => (id) => {
    return state.issues.find((issue) => issue.id === id);
  },
  [TYPES.GET_ISSUES_BY_TRACK_ID]: (state) => (id) => {
    return state.issues.filter((issue) => issue.trackId === id);
  },
};

const actions = {
  async fetchIssues({ commit }) {
    await db.issues.toArray((res) => {
      commit(TYPES.SET_ISSUES, res);
    });
  },

  async saveIssue({ dispatch }, issue) {
    const newIssue = mergeRequiredKeys(issue);

    await db.issues
      .put(newIssue)
      .then(() => {
        dispatch("fetchIssues");
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error("createProject: " + error);
      });
  },

  async deleteIssue({ dispatch }, id) {
    await db.issues.delete(id);
    dispatch("fetchIssues");
  },
};

const mutations = {
  [TYPES.SET_LOADING]: (state, payload) => {
    state.isLoading = payload;
  },

  [TYPES.SET_ISSUES]: (state, payload) => {
    state.issues = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
