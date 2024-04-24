import { createApp } from 'vue'
import App from './App.vue'

import '@fortawesome/fontawesome-free/css/all.css'
import { key, store } from './store'
import router from './routes'

createApp(App)
  .use(router)
  .use(store, key)
  .mount('#app')
