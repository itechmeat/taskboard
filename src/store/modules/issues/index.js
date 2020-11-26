import { getDB, mergeRequiredKeys } from "@/store/utils";

import * as TYPES from "./types";

const db = getDB();

const state = () => ({
  isLoading: false,
  issues: [],
});

const getters = {
  [TYPES.GET_LOADING]: (state) => state.isLoading,
  [TYPES.GET_ISSUES]: (state) => state.statuses,
  [TYPES.GET_ISSUE_BY_ID]: (state) => (id) => {
    return state.statuses.find((status) => status.id === id);
  },
};

const actions = {
  fetchIssues({ commit }) {
    db.statuses.toArray((res) => {
      commit(TYPES.SET_ISSUES, res);
    });
  },

  saveIssue({ dispatch }, issue) {
    const newIssue = mergeRequiredKeys(issue);

    db.issues
      .put(newIssue)
      .then(() => {
        dispatch("fetchIssues");
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error("createProject: " + error);
      });
  },
};

const mutations = {
  [TYPES.SET_LOADING]: (state, payload) => {
    state.isLoading = payload;
  },

  [TYPES.SET_ISSUES]: (state, payload) => {
    state.statuses = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
