import { createApp } from 'vue'
import App from './App'
import router from './router'

const vuejs_app = createApp(App)

vuejs_app.use(router)

vuejs_app.mount('#vuejs_app')

