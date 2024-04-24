<template>
  <div class="column is-three-quarter content">
    <Forms @saveTask="saveTask" />
    <div class="lista">
      <ShowTask v-for="(task, index) in tasks" :key="index" :task="task" />
      <BoxText v-if="!haveTasks"> Nenhuma tarefa executada hoje. </BoxText>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import ShowTask from '../components/ShowTask.vue';
import BoxText from '../components/BoxText.vue';
import Forms from '../components/Forms.vue';
import ITask from '../interfaces/ITask';

export default defineComponent({
  name: 'TasksView',
  data() {
    return {
      tasks: [] as ITask[]
    }
  },
  computed: {
    haveTasks(): boolean {
      return !!this.tasks.length
    }
  },
  methods: {
    saveTask(task: ITask) {
      this.tasks.push(task)
    }
  },
  components: { Forms, ShowTask, BoxText }
});
</script>
