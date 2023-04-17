import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import './assets/main.css'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
// import Vuex from 'vuex'
import store from './stores'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App)

app.use(ToastPlugin)
// app.use(Vuex)
app.use(store)
app.use(router)

app.use(vuetify).mount('#app')
