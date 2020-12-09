import * as TYPES from "./types";

const state = () => ({
  popup: undefined,
});

const getters = {
  [TYPES.GET_POPUP]: (state) => state.popup,
};

const actions = {
  setPopup({ commit }, popup) {
    commit("SET_POPUP", popup);
  },
};

const mutations = {
  [TYPES.SET_POPUP]: (state, payload) => {
    state.popup = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
