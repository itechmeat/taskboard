import Vue from "vue";
import Vuex from "vuex";
import statuses from "./modules/statuses";
import issues from "./modules/issues";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    statuses,
    issues,
  },
});
