import { getDB, mergeRequiredKeys } from "@/store/utils";

import * as TYPES from "./types";

const db = getDB();

const state = () => ({
  isLoading: false,
  statuses: [],
});

const getters = {
  [TYPES.GET_LOADING]: (state) => state.isLoading,
  [TYPES.GET_STATUSES]: (state) => state.statuses,
  [TYPES.GET_STATUS_BY_ID]: (state) => (id) => {
    return state.statuses.find((status) => status.id === id);
  },
};

const actions = {
  async fetchStatuses({ commit }) {
    await db.statuses.toArray((res) => {
      commit(TYPES.SET_STATUSES, res);
    });
  },

  async saveStatus({ dispatch }, status) {
    const newStatus = mergeRequiredKeys(status);

    await db.statuses
      .put(newStatus)
      .then(() => {
        dispatch("fetchStatuses");
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error("createProject: " + error);
      });
  },

  async updateOrders({ dispatch }, statuses) {
    for (const [index, item] of statuses.entries()) {
      await db.statuses
        .put({
          ...item,
          order: (index + 1) * 10,
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error("updateOrders: " + error);
        });
    }

    dispatch("fetchStatuses");
  },

  async deleteStatus({ dispatch }, id) {
    await db.statuses.delete(id);
    dispatch("fetchStatuses");
  },
};

const mutations = {
  [TYPES.SET_LOADING]: (state, payload) => {
    state.isLoading = payload;
  },

  [TYPES.SET_STATUSES]: (state, payload) => {
    payload.sort((a, b) => {
      return a.order - b.order;
    });
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
