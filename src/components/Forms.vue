<template>
  <div class="box">
    <div class="columns">
      <div class="column is-8" role="form" aria-label="Formulário para criação de uma nova tarefa">
        <input type="text" class="input" placeholder="Qual tarefa você deseja iniciar?" v-model="description">
      </div>
      <div class="column">
        <ShowTimer @timer-finalized="finishTask"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ShowTimer from './ShowTimer.vue';

/* eslint-disable */
export default defineComponent({
    name: 'Forms',
    data() {
      return {
        description: ''
      }
    },
    methods: {
      finishTask(elapsedTime: number): void {
        this.description = ''
      }
    },
    components: { ShowTimer }
});
</script>

<style scoped>
</style>