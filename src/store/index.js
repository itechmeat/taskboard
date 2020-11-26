import Vue from "vue";
import Vuex from "vuex";
import system from "./modules/system";
import statuses from "./modules/statuses";
import issues from "./modules/issues";
import tasks from "./modules/tasks";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    system,
    statuses,
    issues,
    tasks,
  },
});
