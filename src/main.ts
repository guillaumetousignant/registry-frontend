import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import 'vuetify/styles'
import { createVuetify, type ThemeDefinition } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/lib/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'

// logger
import { createLogger } from 'vue-logger-plugin'

const isProduction = process.env.NODE_ENV === 'production'

const logger = createLogger({
    enabled: true,
    level: isProduction ? 'error' : 'debug'
})

const myCustomLightTheme: ThemeDefinition = {
    dark: false,
    colors: {
        background: '#FFFFFF',
        surface: '#FFFFFF',
        primary: '#FFFE91',
        'primary-darken-1': '#3700B3',
        secondary: '#03DAC6',
        'secondary-darken-1': '#018786',
        error: '#B00020',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
        something: '#00ff00'
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
app.use(logger)

app.mount('#app')
