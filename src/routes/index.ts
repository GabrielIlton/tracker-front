import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router"

import FormsView from "@/views/projects/FormsView.vue"
import ListView from "@/views/projects/ListView.vue"
import ProjectsView from "@/views/ProjectsView.vue"
import TasksView from "@/views/TasksView.vue"

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Tarefas',
    component: TasksView
  },
  {
    path: '/projetos',
    component: ProjectsView,
    children: [
      {
        path: '',
        name: 'Projetos',
        component: ListView
      },
      {
        path: 'novo',
        name: 'Novo Projeto',
        component: FormsView
      },
      {
        path: ':id',
        name: 'Editar Projeto',
        component: FormsView,
        props: true
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router