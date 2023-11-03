<script setup lang="ts">
import { ref, computed  } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLogger } from 'vue-logger-plugin'
import axios from 'axios'
import { useTokenStore } from '@/stores/token'
import { useRouter } from 'vue-router'
const { t } = useI18n()
const log = useLogger()
const token = useTokenStore()
const router = useRouter()

let show = ref(false)
let is_loading = ref(false)
let login_error = ref(false)
let password = ref("")
const login_error_message = computed(() => {
  return login_error.value ? t("login.error") :  ""
})

async function authenticate() {
    login_error.value = false
    is_loading.value = true
    try {
        axios.get(" http://127.0.0.1:8000/api/v1/authorize/", {
        // Axios looks for the `auth` option, and, if it is set, formats a
        // basic auth header for you automatically.
            auth: {
                username: "frontend",
                password: password.value
            }
        })
        .then(response => {
            password.value = ""
            
            token.token = response.data
            router.push("/")
        },
        error => {
            login_error.value = true
            log.error(error)
        })
    } catch (error) {
        login_error.value = true
        log.error(error)
    }

    is_loading.value = false
}
</script>

<template>
    <v-card width="400">
      <v-card-item>
        <v-card-title>{{ t("login.title") }}</v-card-title>
      </v-card-item>

      <v-card-text>
        <v-form>
            <v-text-field
                v-model="password"
                id="password"
                v-bind:label='t("login.password")'
                name="password"
                prepend-icon="mdi-lock"
                :type="show ? 'text' : 'password'"
                :error-messages="login_error_message"
                :append-icon='show ? "mdi-eye" : "mdi-eye-off"'
                @click:append="show = !show"
                v-on:keyup.enter="authenticate"
            ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn 
            color="success" 
            :loading="is_loading"
            @click="authenticate"
        >
            {{ t("login.submit") }}
        </v-btn>
      </v-card-actions>
    </v-card>
</template>
