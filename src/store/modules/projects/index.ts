import { ADD_PROJECT, DEFINE_PROJECTS, DELETE_PROJECT, CHANGE_PROJECT } from "@/store/mutation-types";
import { GET_PROJECTS, INSERT_PROJECT, REMOVE_PROJECT, UPDATE_PROJECT } from "@/store/action-types";
import IProject from "@/interfaces/IProject";
import httpClient from "@/http";
import { State } from "@/store";

import { Module } from "vuex";

export interface StateProject {
  projects: IProject[]
}

export const project: Module<StateProject, State> = {
  state: {
    projects: []
  },
  mutations: {
    [ADD_PROJECT](state, projectName: string) {
      const project: IProject = { id: new Date().toISOString(), name: projectName }

      state.projects.push(project)
    },

    [CHANGE_PROJECT](state, project: IProject) {
      const indexProject = state.projects.findIndex(proj => proj.id === project.id)

      state.projects[indexProject] = project
    },

    [DELETE_PROJECT](state, projectId: string) {
      state.projects = state.projects.filter(project => project.id !== projectId)
    },

    [DEFINE_PROJECTS](state, projects: IProject[]) {
      state.projects = projects
    },
  },
  actions: {
    [GET_PROJECTS]({ commit }) {
      httpClient.get('/projects').then(response => commit(DEFINE_PROJECTS, response.data))
    },

    [INSERT_PROJECT](context, projectName: string) {
      return httpClient.post('/projects', { name: projectName })
    },

    [UPDATE_PROJECT](context, project: IProject) {
      return httpClient.put(`/projects/${project.id}`, project)
    },

    [REMOVE_PROJECT]({ commit }, projectId: string) {
      httpClient.delete(`/projects/${projectId}`).then(() => commit(DELETE_PROJECT, projectId))
    },
  }
}