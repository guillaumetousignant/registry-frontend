import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

import App from './App.vue'
import router from './router'
import frCA from './locales/fr-CA.json'
import enCA from './locales/en-CA.json'

type MessageSchema = typeof enCA

const i18n = createI18n<[MessageSchema], 'en-CA' | 'fr-CA'>({
  inheritLocale: true,
  legacy: false, // you must set `false`, to use Composition API
  locale: 'fr-CA', // set locale
  fallbackLocale: 'en-CA', // set fallback locale
  messages: {
    'fr-CA': frCA,
    'en-CA': enCA
  }
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(vuetify)

app.mount('#app')
