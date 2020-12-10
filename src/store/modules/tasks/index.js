import { getDB, mergeRequiredKeys } from "@/store/utils";

import * as TYPES from "./types";

const db = getDB();

const state = () => ({
  isLoading: false,
  tasks: [],
  startedTaskId: undefined,
  startedTaskTime: undefined,
});

const getters = {
  [TYPES.GET_LOADING]: (state) => state.isLoading,
  [TYPES.GET_TASKS]: (state) => state.tasks,
  [TYPES.GET_TASK_BY_ID]: (state) => (id) => {
    return state.tasks.find((task) => task.id === id);
  },
  [TYPES.GET_STARTED_TASK_TIME]: (state) => state.startedTaskTime,
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

  startTask({ commit }, id) {
    commit(TYPES.SET_STARTED_TASK, id);
  },

  async pauseTask({ commit, dispatch, state, getters }) {
    const now = Date.now();
    let task = { ...getters[TYPES.GET_TASK_BY_ID](state.startedTaskId) };
    task.times.push({
      date: new Date(),
      seconds: Math.floor((now - state.startedTaskTime) / 1000),
    });
    task.spentTime = task.times.reduce((acc, time) => acc + time.seconds, 0);
    await dispatch("saveTask", task);
    task = undefined;
    commit(TYPES.SET_STARTED_TASK, undefined);
  },
};

const mutations = {
  [TYPES.SET_LOADING]: (state, payload) => {
    state.isLoading = payload;
  },

  [TYPES.SET_TASKS]: (state, payload) => {
    state.tasks = payload;
  },

  [TYPES.SET_STARTED_TASK]: (state, payload) => {
    state.startedTaskId = payload;
    if (!payload) {
      state.startedTaskTime = undefined;
      return;
    }
    state.startedTaskTime = Date.now();
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
