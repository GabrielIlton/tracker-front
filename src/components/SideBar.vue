<template>
  <header>
    <h1>
      <img src="../assets/logo.png" alt="">
    </h1>
    <button class="button" @click="changeTheme">
      {{ buttonText }}
    </button>
    <nav class="panel mt-5">
      <ul>
        <li>
          <RouterLink to="/" class="link">
            <i class="fas fa-tasks"></i>
            tarefas
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/projetos" class="link">
            <i class="fas fa-project-diagram"></i>
            projetos
          </RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'SideBar',
  emits: ['toChangeTheme'],
  setup(props, { emit }) {
    const darkModeActive = ref(false)

    const changeTheme = (): void =>  {
      darkModeActive.value = !darkModeActive.value;
      emit('toChangeTheme', darkModeActive.value);
    }

    const buttonText = computed(() => darkModeActive.value ? 'Destivar modo escuro' : 'Ativar modo escuro')

    return { changeTheme, buttonText }
  }
});
</script>

<style scoped>
header {
  padding: 1rem;
  background: #0d3b66;
  width: 100%;
  height: 100vh;
  text-align: center;
}

@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
}

.panel li {
  margin: 8px 0;
}

.link {
  color: #fff;
}

.link:hover {
  color: #faf0ca;
}

.link.router-link-active {
  color: #faf0ca;
}
</style>
