<template>
  <section>
    <strong class="display">
      {{ elapsedTime }}
    </strong>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'StopWatch',
  props: {
    timeInSeconds: {
      type: Number,
      default: 0
    }
  },
  computed: {
    elapsedTime(): string {
      return new Date(this.timeInSeconds * 1000).toISOString().substr(11, 8);
    }
  }
});
</script>


<style scoped>
.display {
  color: var(--text-primary);
}
</style>
