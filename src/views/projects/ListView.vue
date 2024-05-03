<template>
  <section>
    <router-link to="/projetos/novo" class="button">
      <span class="icon is-small">
        <i class="fas fa-plus"></i>
      </span>
      <span>Novo projeto</span>
    </router-link>
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in projects" :key="project.id">
          <td>{{ project.id }}</td>
          <td>{{ project.name }}</td>
          <td>
            <router-link :to="`/projetos/${project.id}`" class="button">
              <span class="icon is-small">
                <i class="fas fa-pencil-alt"></i>
              </span>
            </router-link>
            <button class="button ml-2 is-danger" @click="deleteProject(project.id)">
              <span class="icon is-small">
                <i class="fas fa-trash"></i>
              </span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

import { GET_PROJECTS, REMOVE_PROJECT } from '@/store/action-types';
import { NotificationTypes } from '@/interfaces/INotification';
import useNotifier from '../../hooks/notifier';
import { useStore } from '@/store';


export default defineComponent({
  name: 'ListView',
  setup() {
    const store = useStore()

    const { notify } = useNotifier()

    store.dispatch(GET_PROJECTS)

    const deleteProject = (projectId: string) => {
      store.dispatch(REMOVE_PROJECT, projectId).then(() => {
        const text = 'Seu projeto já está removido.';
        const title = 'Projeto deletado';
        const type = NotificationTypes.SUCCESS;

        notify(type, title, text)
      })
    }

    const projects = computed(() => store.state.project.projects)

    return { projects, deleteProject }
  }
});
</script>
