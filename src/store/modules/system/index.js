import { getDB } from "@/store/utils";

const db = getDB();

const state = () => ({});

const getters = {};

const actions = {
  async clearDB() {
    await db.projects.clear();
    await db.tracks.clear();
    await db.issues.clear();
    await db.tasks.clear();
  },
};

const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
