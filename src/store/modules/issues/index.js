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
  [TYPES.GET_ISSUES_ESTIMATE]: (state) =>
    state.issues.reduce((acc, issue) => acc + (issue.estimate || 0), 0),
};

const actions = {
  async fetchIssues({ commit }) {
    await db.issues.toArray((res) => {
      commit(TYPES.SET_ISSUES, res);
    });
  },

  async saveIssue({ dispatch }, issue) {
    let oldTrackId = issue.oldTrackId;
    let issueId = issue.id;

    if (oldTrackId) {
      delete issue.oldTrackId;
    }

    const newIssue = mergeRequiredKeys(issue);

    await db.issues
      .put(newIssue)
      .then(async (res) => {
        issueId = res;
        dispatch("fetchIssues");
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error("createProject: " + error);
      });

    if (oldTrackId) {
      dispatch(
        "tracks/moveIssue",
        {
          issueId,
          oldTrackId,
          newTrackId: issue.trackId,
        },
        { root: true }
      );
    }

    return issueId;
  },

  async deleteIssue({ dispatch }, id) {
    // TODO: Delete the Issue from Track
    // TODO: Delete all Tasks of the Issue
    await db.issues.delete(id);
    dispatch("fetchIssues");
  },
};

const mutations = {
  [TYPES.SET_LOADING]: (state, payload) => {
    state.isLoading = payload;
  },

  [TYPES.SET_ISSUES]: (state, payload) => {
    payload.sort((a, b) => {
      return a.order - b.order;
    });
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
