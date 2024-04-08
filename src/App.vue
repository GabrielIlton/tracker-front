<template>
  <main class="columns is-gapless is-multiline" :class="{ 'dark-mode': darkModeActive }">
    <div class="column is-one-quarter">
      <SideBar @toChangeTheme="changeTheme"/>
    </div>
    <div class="column is-three-quarter content">
      <Forms @saveTask="saveTask" />
      <div class="lista">
        <ShowTask v-for="(task, index) in tasks" :key="index" :task="task" />
        <BoxText v-if="!haveTasks"> Nenhuma tarefa executada hoje. </BoxText>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import ShowTask from './components/ShowTask.vue';
import SideBar from './components/SideBar.vue';
import BoxText from './components/BoxText.vue';
import Forms from './components/Forms.vue';
import ITask from './interfaces/ITask';

export default defineComponent({
  name: 'App',
  data() {
    return {
      tasks: [] as ITask[],
      darkModeActive: false
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
    },
    changeTheme(darkModeActive: boolean) {
      this.darkModeActive = darkModeActive
    }
  },
  components: { SideBar, Forms, ShowTask, BoxText }
});
</script>

<style scoped>
.lista {
  padding: 1.25rem;
}

main {
  --bg-primary: #fff;
  --text-primary: #000;
}

main.dark-mode {
  --bg-primary: #2b2d42;
  --text-primary: #ddd;
}

.content {
  background-color: var(--bg-primary);
}
</style>
