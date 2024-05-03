<template>
  <BoxText>
    <div class="columns clickable" @click="taskClicked">
      <div class="column is-4">
        {{ task?.description || 'Tarefa sem descrição' }}
      </div>
      <div class="column is-3">
        {{ task?.project?.name || 'N/D' }}
      </div>
      <div class="column">
        <StopWatch :time-in-seconds="task?.timeInSeconds" />
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
  emits: ['toTaskClicked'],
  props: {
    task: {
      type: Object as PropType<ITask>,
      require: true
    }
  },
  setup(props, { emit }) {
    const taskClicked = (): void => emit('toTaskClicked', props.task)

    return { taskClicked }
  },
  components: { StopWatch, BoxText }
});
</script>

<style scoped>
.clickable {
  cursor: pointer;
}
</style>