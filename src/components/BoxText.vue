<template>
  <div class="box has-text-weight-bold" :style="style">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'BoxText',
    data() {
      return {
        style: {
          backgroundColor: '#FAF0CA'
        }
      }
    }
});
</script>
