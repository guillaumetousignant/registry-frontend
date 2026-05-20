import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import 'vuetify/styles'
import { createVuetify, type ThemeDefinition } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'

// logger
import { createLogger } from 'vue-logger-plugin'

const logger = createLogger({
    enabled: true,
    level: 'error'
})

const myCustomLightTheme: ThemeDefinition = {
    dark: false,
    colors: {
        background: '#FFFFFF',
        surface: '#FFFFFF',
        primary: '#49DC38',
        'primary-lighten-1': '#5EE04F',
        'primary-lighten-2': '#79EB6C',
        'primary-lighten-3': '#A0F296',
        'primary-lighten-4': '#C6FAC0',
        'primary-lighten-5': '#E8FFE6',
        secondary: '#9253AE',
        error: '#F44336',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FF9800'
    }
}

const vuetify = createVuetify({
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi
        }
    },
    components,
    directives,
    theme: {
        defaultTheme: 'myCustomLightTheme',
        themes: {
            myCustomLightTheme
        }
    }
})

import App from './App.vue'
import router from './router'
import frCA from './locales/fr-CA.json'
import enCA from './locales/en-CA.json'

type MessageSchema = typeof enCA

const usersLanguage = window.navigator.language
const usersLocale = usersLanguage.startsWith('fr') ? 'fr-CA' : 'en-CA'
const i18n = createI18n<[MessageSchema], 'en-CA' | 'fr-CA'>({
    inheritLocale: true,
    legacy: false, // you must set `false`, to use Composition API
    locale: usersLocale, // set locale
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
app.use(logger)

app.mount('#app')
