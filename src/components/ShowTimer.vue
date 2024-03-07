<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <StopWatch :time-in-seconds="timeInSeconds"/>
    
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
import { defineComponent } from 'vue';
import StopWatch from './StopWatch.vue';

/* eslint-disable */
export default defineComponent({
    name: 'ShowTimer',
    data() {
        return {
            timeInSeconds: 0,
            stopwatch: 0,
            stopwatchActive: false
        };
    },
    methods: {
        start() {
            this.stopwatchActive = true
            
            this.stopwatch = setInterval(() => this.timeInSeconds += 1, 1000);
        },
        finish() {
            clearInterval(this.stopwatch);

            this.stopwatchActive = false;
            
            this.$emit('timerFinalized', this.timeInSeconds)
            
            this.timeInSeconds = 0;
        }
    },
    emits: ['timerFinalized'],
    components: { StopWatch }
});
</script>
