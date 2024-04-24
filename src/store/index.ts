import { Store, createStore, useStore as vuexUseStore } from "vuex";
import { InjectionKey } from "vue";

import { ADD_PROJECT, DELETE_PROJECT, NOTIFICATION, UPDATE_PROJECT } from "./mutation-types";
import INotification from "@/interfaces/INotification";
import IProject from "@/interfaces/IProject";

interface State {
  projects: IProject[],
  notifications: INotification[]
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    projects: [],
    notifications: []
  },
  mutations: {
    [ADD_PROJECT](state, projectName: string) {
      const project: IProject = {
        id: new Date().toISOString(),
        name: projectName
      }

      state.projects.push(project)
    },
    [UPDATE_PROJECT](state, project: IProject) {
      const indexProject = state.projects.findIndex(proj => proj.id === project.id)

      state.projects[indexProject] = project
    },
    [DELETE_PROJECT](state, projectId: string) {
      state.projects = state.projects.filter(project => project.id !== projectId)
    },
    [NOTIFICATION](state, newNotification: INotification) {
      newNotification.id = new Date().getTime()

      state.notifications.push(newNotification)

      setTimeout(() => state.notifications.length = 0, 2500)
    }
  }
})

export function useStore(): Store<State> {
  return vuexUseStore(key)
}