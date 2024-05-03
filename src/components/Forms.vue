<template>
  <div class="box form">
    <div class="columns">
      <div class="column is-5" role="form" aria-label="Formulário para criação de uma nova tarefa">
        <input type="text" class="input" placeholder="Qual tarefa você deseja iniciar?" v-model="description">
      </div>
      <div class="column is-3">
        <div class="select">
          <select v-model="projectId">
            <option value="">Selecione o projeto</option>
            <option
              :value="project.id"
              v-for="project in projects"
              :key="project.id"
            >
              {{ project.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="column">
        <ShowTimer @timer-finalized="finishTask"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';

import { NotificationTypes } from '@/interfaces/INotification';
import useNotifier from '@/hooks/notifier';
import ShowTimer from './ShowTimer.vue';
import ITask from '@/interfaces/ITask';
import { useStore } from '@/store';

/* eslint-disable */
export default defineComponent({
    name: 'Forms',
    setup (props, { emit }) {
      const store = useStore()
      const { notify } = useNotifier()

      const projects = computed(() => store.state.project.projects)

      const description = ref('')
      const projectId = ref('')

      const finishTask = (elapsedTime: number): void => {
        if (!projectId.value) {
          const text = "Selecione um projeto antes de finalizar a tarefa!"
          const type = NotificationTypes.FAILED
          const title = 'Ops!'
          
          notify(type, title, text);
          
          return;
        }

        const task: ITask = {
          timeInSeconds: elapsedTime,
          description: description.value,
          project: projects.value.find(project => project.id === projectId.value) || null
        }

        emit('saveTask', task)
        description.value = ''
      }

      return { projects, projectId, description, finishTask }
    },
    emits: ['saveTask'],
    components: { ShowTimer },
});
</script>

<style scoped>
.form {
  color: var(--text-primary);
  background-color: var(--bg-primary);
}
</style>