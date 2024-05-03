import { Store, createStore, useStore as vuexUseStore } from "vuex";
import { InjectionKey } from "vue";

import INotification from "@/interfaces/INotification";
import { NOTIFICATION } from "./mutation-types";

import { StateProject, project } from "./modules/projects";
import { StateTask, task } from "./modules/tasks";

export interface State {
  notifications: INotification[],
  project: StateProject
  task: StateTask
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    project: { projects: [] },
    task: { tasks: [] },
    notifications: []
  },
  mutations: {
    [NOTIFICATION](state, newNotification: INotification) {
      newNotification.id = new Date().getTime()

      state.notifications.push(newNotification)

      setTimeout(() => state.notifications.length = 0, 2500)
    }
  },
  modules: { project, task }
})

export function useStore(): Store<State> {
  return vuexUseStore(key)
}