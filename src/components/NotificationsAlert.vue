<template>
  <div class="notificacoes">
    <article class="message" :class="context[notification.type]" v-for="notification in notifications" :key="notification.id">
      <div class="message-header">{{ notification.title }}</div>
      <div class="message-body">{{ notification.text }}</div>
    </article>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { NotificationTypes } from '@/interfaces/INotification';
import { useStore } from '@/store';

export default defineComponent({
    name: 'NotificationsAlert',
    data() {
      return {
        context: {
          [NotificationTypes.SUCCESS]: 'is-success',
          [NotificationTypes.FAILED]: 'is-danger',
          [NotificationTypes.WARNING]: 'is-warning'
        }
      }
    },
    setup() {
      const store = useStore()

      return { notifications: computed(() => store.state.notifications) }
    }
});
</script>

<style scoped>
.notificacoes {
  position: absolute;
  right: 0;
  width: 300px;
  padding: 8px;
  z-index: 105;
}
</style>