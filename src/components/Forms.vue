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
import { computed, defineComponent } from 'vue';


import { NotificationTypes } from '@/interfaces/INotification';
import useNotifier from '@/hooks/notifier';
import ShowTimer from './ShowTimer.vue';
import ITask from '@/interfaces/ITask';
import { useStore } from '@/store';

/* eslint-disable */
export default defineComponent({
    name: 'Forms',
    data() {
      return {
        description: '',
        projectId: ''
      }
    },
    methods: {
      finishTask(elapsedTime: number): void {
        if (!this.projectId) {
          const text = "Selecione um projeto antes de finalizar a tarefa!"
          const type = NotificationTypes.FAILED
          const title = 'Ops!'
          
          this.notify(type, title, text);
          
          return;
        }

        const task: ITask = {
          timeInSeconds: elapsedTime,
          description: this.description,
          project: this.projects.find(project => project.id === this.projectId) || null
        }

        this.$emit('saveTask', task)
        this.description = ''
      }
    },
    setup () {
      const store = useStore()

      const projects = store.state.projects

      const { notify } = useNotifier()

      return {
        projects: computed(() => projects),
        notify,
        store
      }
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