import { createApp } from 'vue'
import 'bootstrap/dist/css/bootstrap.css'
import App from './App.vue'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import router from './router'
import store from './store'

createApp(App).use(store).use(router).mount('#app')
