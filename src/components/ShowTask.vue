<template>
  <BoxText>
    <div class="columns">
      <div class="column is-4">
        {{ task?.description || 'Tarefa sem descrição' }}
      </div>
      <div class="column is-3">
        {{ task?.project?.name || 'N/D' }}
      </div>
      <div class="column">
        <StopWatch :time-in-seconds="task?.timeInSeconds"/>
      </div>
    </div>
  </BoxText>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';
import StopWatch from './StopWatch.vue';
import ITask from '@/interfaces/ITask';
import BoxText from './BoxText.vue';

export default defineComponent({
    name: 'ShowTask',
    props: {
      task: {
        type: Object as PropType<ITask>,
        require: true
      }
    },
    components: { StopWatch, BoxText }
});
</script>
