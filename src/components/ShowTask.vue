<template>
  <div class="box has-text-weight-bold">
    <div class="columns">
      <div class="column is-7">
        {{ 'description' }}
      </div>
      <div class="column">
        <StopWatch :time-in-seconds="10"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import StopWatch from './StopWatch.vue';

export default defineComponent({
    name: 'ShowTask',
    components: { StopWatch }
});
</script>

<style scoped>
.box{
  background: #FAF0CA;
}
</style>
