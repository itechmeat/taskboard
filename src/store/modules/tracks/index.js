import { getDB, mergeRequiredKeys } from "@/store/utils";

import * as TYPES from "./types";

const db = getDB();

const state = () => ({
  isLoading: false,
  tracks: [],
});

const getters = {
  [TYPES.GET_LOADING]: (state) => state.isLoading,
  [TYPES.GET_TRACKS]: (state) => state.tracks,
  [TYPES.GET_TRACK_BY_ID]: (state) => (id) => {
    return state.tracks.find((track) => track.id === id);
  },
};

const actions = {
  async fetchTracks({ commit }) {
    await db.tracks.toArray((res) => {
      commit(TYPES.SET_TRACKS, res);
    });
  },

  async saveTrack({ dispatch }, track) {
    const newTrack = mergeRequiredKeys(track);

    await db.tracks
      .put(newTrack)
      .then(() => {
        dispatch("fetchTracks");
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error("createProject: " + error);
      });
  },

  async updateOrders({ dispatch }, tracks) {
    for (const [index, item] of tracks.entries()) {
      await db.tracks
        .put({
          ...item,
          order: (index + 1) * 10,
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error("updateOrders: " + error);
        });
    }

    dispatch("fetchTracks");
  },

  async deleteTrack({ dispatch }, id) {
    await db.tracks.delete(id);
    dispatch("fetchTracks");
  },

  async moveIssue({ getters, dispatch }, moving) {
    // moving: {issueId, oldTrackId, newTrackId, newIndex}
    const oldTrack = getters[TYPES.GET_TRACK_BY_ID](moving.oldTrackId);
    const oldTrackIssues = [...oldTrack.issues];
    const oldTrackIssueIndex = oldTrack.issues.findIndex(
      (item) => item === moving.issueId
    );
    let newIndex = moving.newIndex || 0;

    if (oldTrackIssueIndex !== -1) {
      oldTrackIssues.splice(oldTrackIssueIndex, 1);
      dispatch("saveTrack", {
        ...oldTrack,
        issues: oldTrackIssues,
      });
    }

    let newTrack;
    let newTrackIssues;
    if (moving.oldTrackId === moving.newTrackId) {
      newTrackIssues = oldTrackIssues;
      newTrack = oldTrack;
    } else {
      newTrack = getters[TYPES.GET_TRACK_BY_ID](moving.newTrackId);
      newTrackIssues = [...newTrack.issues];
    }
    newTrackIssues.splice(newIndex, 0, moving.issueId);
    dispatch("saveTrack", {
      ...newTrack,
      issues: newTrackIssues,
    });
  },
};

const mutations = {
  [TYPES.SET_LOADING]: (state, payload) => {
    state.isLoading = payload;
  },

  [TYPES.SET_TRACKS]: (state, payload) => {
    payload.sort((a, b) => {
      return a.order - b.order;
    });
    state.tracks = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
