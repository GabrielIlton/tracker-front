import { ADD_TASK, DEFINE_TASKS, UPDATE_TASK } from "@/store/mutation-types";
import { GET_TASKS, INSERT_TASK } from "@/store/action-types";
import ITask from "@/interfaces/ITask";
import httpClient from "@/http";
import { State } from "@/store";

import { Module } from "vuex";

export interface StateTask {
  tasks: ITask[]
}

export const task: Module<StateTask, State> = {
  state: {
    tasks: []
  },
  mutations: {
    [ADD_TASK](state, task: ITask) {
      state.tasks.push(task)
    },
    [UPDATE_TASK](state, task: ITask) {
      const indexTask = state.tasks.findIndex(task => task.id === task.id)

      state.tasks[indexTask] = task
    },
    [DEFINE_TASKS](state, tasks: ITask[]) {
      state.tasks = tasks
    },
  },
  actions: {
    [GET_TASKS]({ commit }, search) {
      let url = '/tasks'

      if (search) url += `?description=${search}`

      httpClient.get(url).then(response => commit(DEFINE_TASKS, response.data))
    },
    async [INSERT_TASK]({ commit }, task: ITask) {
      const response = await httpClient.post('/tasks', task)

      commit(ADD_TASK, response.data)
    },
    [UPDATE_TASK]({ commit }, task: ITask) {
      httpClient.put(`/tasks/${task.id}`, task)

      commit(UPDATE_TASK, task);
    }
  }
}