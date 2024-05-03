<template>
  <div class="column is-three-quarter content">
    <Forms @saveTask="saveTask" />
    <div class="lista">

      <div class="field">
        <p class="control has-icons-left">
          <input class="input" type="text" placeholder="Busca por descrição" v-model="search" />
          <span class="icon is-small is-left">
            <i class="fas fa-search"></i>
          </span>
        </p>
      </div>

      <BoxText v-if="!haveTasks"> Nenhuma tarefa executada hoje. </BoxText>

      <ShowTask v-for="(task, index) in tasks" :key="index" :task="task" @toTaskClicked="selectTask" />

      <ExpandModal :showModal="!!selectedTask" v-if="!!selectedTask">
        <template v-slot:header>
          <p class="modal-card-title">Editando uma tarefa</p>
          <button @click="closeModal" class="delete" aria-label="close"></button>
        </template>
        <template v-slot:body>
          <div class="field">
            <label for="taskDescription" class="label">Descrição</label>
            <input type="text" class="input" v-model="selectedTask.description" id="taskDescription">
          </div>
        </template>
        <template v-slot:foot>
          <div class="buttons">
            <button @click="updateTask" class="button is-success">Salvandao alterações</button>
            <button @click="closeModal" class="button">Cancelar</button>
          </div>
        </template>
      </ExpandModal>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from 'vue';

import ExpandModal from '../components/ExpandModal.vue';
import ShowTask from '../components/ShowTask.vue';
import BoxText from '../components/BoxText.vue';
import Forms from '../components/Forms.vue';

import { NotificationTypes } from '@/interfaces/INotification';
import ITask from '../interfaces/ITask';

import { GET_PROJECTS, GET_TASKS, INSERT_TASK, UPDATE_TASK } from '@/store/action-types';
import { useStore } from '@/store';

import useNotifier from '../hooks/notifier';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'TasksView',
  setup() {
    const { notify } = useNotifier()
    const router = useRouter()
    const store = useStore()

    store.dispatch(GET_TASKS)
    store.dispatch(GET_PROJECTS)

    const selectedTask = ref(null as ITask | null)
    const search = ref('')

    const tasks = computed(() => store.state.task.tasks.filter(task => !search.value || new RegExp(search.value, 'i').test(task.description)))

    const successMessage = (text: string, title: string) => {
      const type = NotificationTypes.SUCCESS;

      notify(type, title, text)

      router.push('/')
    }

    const saveTask = (task: ITask) => store.dispatch(INSERT_TASK, task).then(() => successMessage('Sua tarefa já está registrada', 'Nova tarefa salva'))
    const selectTask = (task: ITask) => selectedTask.value = task
    const closeModal = () => selectedTask.value = null
    const haveTasks = () => !!tasks.value.length

    const updateTask = () => {
      store.dispatch(UPDATE_TASK, selectedTask.value).then(() => successMessage('Sua tarefa foi atualizada', 'Tarefa salva'))

      closeModal()
    }

    watchEffect(() => store.dispatch(GET_TASKS, search.value))

    return { selectTask, haveTasks, selectedTask, updateTask, closeModal, saveTask, search, tasks }
  },
  components: { Forms, ShowTask, BoxText, ExpandModal }
});
</script>
