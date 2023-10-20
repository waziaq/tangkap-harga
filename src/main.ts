import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// Vuetify
import vuetify from './plugins/vuetify'

createApp(App)
.use(vuetify)
.mount('#app')
