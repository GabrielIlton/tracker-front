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
import { defineComponent, ref } from 'vue';

import { NotificationTypes } from '../../interfaces/INotification';
import { INSERT_PROJECT, UPDATE_PROJECT } from '@/store/action-types';
import useNotifier from '../../hooks/notifier';
import { useStore } from '../../store';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'FormsView',
  props: {
    id: { type: String }
  },
  setup(props) {
    const { notify } = useNotifier()
    const router = useRouter()
    const store = useStore()

    const projectName = ref('')

    if (props.id) {
      const project = store.state.project.projects.find(project => Number(project.id) === Number(props.id))
      projectName.value = project?.name || ''
    }

    const save = () => {
      const successMessage = () => {
        const text = 'Seu projeto já está disponível.';
        const title = 'Novo projeto foi salvo';
        const type = NotificationTypes.SUCCESS;

        notify(type, title, text)

        projectName.value = ''

        router.push('/projetos')
      }

      if (props.id) store.dispatch(UPDATE_PROJECT, { id: props.id, name: projectName.value }).then(() => successMessage())
      else store.dispatch(INSERT_PROJECT, projectName.value).then(() => successMessage())
    }

    return { projectName, save }
  }
});
</script>
