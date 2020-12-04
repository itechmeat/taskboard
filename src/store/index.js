import Vue from "vue";
import Vuex from "vuex";
import system from "./modules/system";
import tracks from "./modules/tracks";
import issues from "./modules/issues";
import tasks from "./modules/tasks";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    system,
    tracks,
    issues,
    tasks,
  },
});
