import { getDB, mergeRequiredKeys } from "@/store/utils";

import * as TYPES from "./types";

const db = getDB();

const state = () => ({
  isLoading: false,
  tasks: [],
});

const getters = {
  [TYPES.GET_LOADING]: (state) => state.isLoading,
  [TYPES.GET_TASKS]: (state) => state.tasks,
  [TYPES.GET_TASK_BY_ID]: (state) => (id) => {
    return state.tasks.find((task) => task.id === id);
  },
};

const actions = {
  async fetchTasks({ commit }) {
    await db.tasks.toArray((res) => {
      commit(TYPES.SET_TASKS, res);
    });
  },

  async saveTask({ dispatch }, task) {
    const newTask = mergeRequiredKeys(task);
    let taskId;

    await db.tasks
      .put(newTask)
      .then(async (res) => {
        taskId = res;
        await dispatch("fetchTasks");
        return res;
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error("createProject: " + error);
      });

    return taskId;
  },

  async deleteTask({ dispatch }, id) {
    await db.tasks.delete(id);
    dispatch("fetchTasks");
  },
};

const mutations = {
  [TYPES.SET_LOADING]: (state, payload) => {
    state.isLoading = payload;
  },

  [TYPES.SET_TASKS]: (state, payload) => {
    state.tasks = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
