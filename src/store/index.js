import Vue from "vue";
import Vuex from "vuex";
import system from "./modules/system";
import projects from "./modules/projects";
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
    projects,
    tracks,
    issues,
    tasks,
  },
});
