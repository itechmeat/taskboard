import Vue from "vue";
import Vuex from "vuex";
import system from "./modules/system";
import content from "./modules/content";
import projects from "./modules/projects";
import tracks from "./modules/tracks";
import issues from "./modules/issues";
import tasks from "./modules/tasks";
import user from "./modules/user";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    system,
    content,
    projects,
    tracks,
    issues,
    tasks,
    user,
  },
});
