<template>
  <main class="columns is-gapless is-multiline">
    <div class="column is-one-quarter">
      <SideBar />
    </div>
    <div class="column is-three-quarter">
      <Forms />
      <div class="lista">
        <ShowTask />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import ShowTask from './components/ShowTask.vue';
import SideBar from './components/SideBar.vue';
import Forms from './components/Forms.vue';

export default defineComponent({
  name: 'App',
  data() {
    return {
      tasks: []
    }
  },
  components: { SideBar, Forms, ShowTask }
});
</script>

<style scoped>
.lista{
  padding: 1.25rem;
}
</style>
