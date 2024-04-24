<template>
  <main class="columns is-gapless is-multiline" :class="{ 'dark-mode': darkModeActive }">
    <div class="column is-one-quarter">
      <SideBar @toChangeTheme="changeTheme"/>
    </div>
    <div class="column is-three-quarter content">
      <NotificationsAlert />
      <RouterView></RouterView>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import NotificationsAlert from './components/NotificationsAlert.vue';
import SideBar from './components/SideBar.vue';

export default defineComponent({
  name: 'App',
  data() {
    return {
      darkModeActive: false
    }
  },
  methods: {
    changeTheme(darkModeActive: boolean) {
      this.darkModeActive = darkModeActive
    }
  },
  components: { SideBar, NotificationsAlert }
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
