<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <StopWatch :time-in-seconds="timeInSeconds" />

    <button class="button" @click="start" :disabled="stopwatchActive">
      <span class="icon">
        <i class="fas fa-play"></i>
      </span>
      <span>play</span>
    </button>
    <button class="button" @click="finish" :disabled="!stopwatchActive">
      <span class="icon">
        <i class="fas fa-stop"></i>
      </span>
      <span>stop</span>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import StopWatch from './StopWatch.vue';

/* eslint-disable */
export default defineComponent({
  name: 'ShowTimer',
  emits: ['timerFinalized'],
  setup(props, { emit }) {
    const stopwatchActive = ref(false)
    const timeInSeconds = ref(0)
    const stopwatch = ref(0)

    const start = () => {
      stopwatchActive.value = true

      stopwatch.value = setInterval(() => timeInSeconds.value += 1, 1000);
    }

    const finish = () => {
      clearInterval(stopwatch.value);

      stopwatchActive.value = false;

      emit('timerFinalized', (timeInSeconds.value))

      timeInSeconds.value = 0;
    }

    return { timeInSeconds, stopwatchActive, start, finish };
  },
  components: { StopWatch }
});
</script>
