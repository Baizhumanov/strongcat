import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
import components from '@/components/UI'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min'
import "bootstrap"
window.bootstrap = bootstrap

const app = createApp(App)

components.forEach(component => {
    app.component(component.name, component)
})

app.use(store)
   .use(router)

app.mount('#app')