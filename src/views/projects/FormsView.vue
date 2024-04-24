<template>
  <section>
    <form @submit.prevent="save">
      <div class="field">
        <label class="label">
          Nome do Projeto
        </label>
        <input type="text" class="input" v-model="projectName" id="projectName">
      </div>
      <div class="field">
        <button class="button" type="submit">
          Salvar
        </button>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ADD_PROJECT, UPDATE_PROJECT } from '@/store/mutation-types';
import { NotificationTypes } from '../../interfaces/INotification';
import useNotifier from '../../hooks/notifier';
import { useStore } from '../../store';

export default defineComponent({
  name: 'FormsView',
  props: {
    id: { type: String }
  },
  mounted() {
    if (this.id) {
      const project = this.store.state.projects.find(project => project.id === this.id)
      this.projectName = project?.name || ''
    }
  },
  data() {
    return { projectName: '' }
  },
  methods: {
    save() {
      if (this.id) this.store.commit(UPDATE_PROJECT, { id: this.id, name: this.projectName })
      else this.store.commit(ADD_PROJECT, this.projectName)

      const text = 'Seu projeto já está disponível.';
      const title = 'Novo projeto foi salvo';
      const type = NotificationTypes.SUCCESS;
      
      this.notify(type, title, text)

      this.projectName = ''
      this.$router.push('/projetos')
    }
  },
  setup () {
    const store = useStore()

    const { notify } = useNotifier()

    return { store, notify }
  },
  components: { }
});
</script>
