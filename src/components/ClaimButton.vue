<script setup lang="ts">
const props = defineProps<{
  item_id: number,
}>()

import { useI18n } from 'vue-i18n'
import axios from 'axios'
import { ref, computed  } from 'vue'
import { useLogger } from 'vue-logger-plugin'
import { useTokenStore } from '@/stores/token'

const { t } = useI18n()
const log = useLogger()
const token = useTokenStore()
const emit = defineEmits(["claimed", "conflict", "unauthorized"])

enum ErrorType {
  None,
  Claim,
  Empty,
  Conflict,
  Internal,
  Unauthorized,
}
let is_loading = ref(false)
let error = ref(ErrorType.None)
let assigned = ref("")

const claim_error_message = computed(() => {
    switch (error.value) {
        case ErrorType.None:
            return ""
        case ErrorType.Claim:
            return t("claim.error") 
        case ErrorType.Empty:
            return t("claim.empty") 
        case ErrorType.Conflict:
            return t("claim.conflict") 
        case ErrorType.Internal:
            return t("claim.internal") 
        case ErrorType.Unauthorized:
            return t("claim.unauthorized") 
        default:
            return t("claim.unknown")
    }
})

function claimItems(){
    is_loading.value = true
    error.value = ErrorType.None

    if (assigned.value) {
        axios.post(`http://127.0.0.1:8000/api/v1/items/${props.item_id}/claim`, { assigned: assigned.value }, {
            headers: { Authorization: `Bearer ${token.token}` }
        }).then(response => {
            if (response.status == 202) {
                emit("claimed") // Maybe send the value of claimed?
            }
            else if (response.status == 409) {
                error.value = ErrorType.Conflict
                emit("conflict")
            }
            else if (response.status == 500) {
                error.value = ErrorType.Internal
            }
            else if (response.status == 401) {
                error.value = ErrorType.Unauthorized
                emit("unauthorized")
            }
            else {
                error.value = ErrorType.Claim
            }
        },
        err => {
            log.error(err)
            if (err.response.status == 409) {
                error.value = ErrorType.Conflict
                emit("conflict")
            }
            else if (err.response.status == 500) {
                error.value = ErrorType.Internal
            }
            else if (err.response.status == 401) {
                error.value = ErrorType.Unauthorized
                emit("unauthorized")
            }
            else {
                error.value = ErrorType.Claim
            }
        })
    }
    else {
        error.value = ErrorType.Empty
    }

    is_loading.value = false
}
</script>

<template>
    <div class="d-flex align-center justify-space-between">
        <v-text-field
            style="padding-right: 16px"
            hide-details
            prepend-inner-icon="mdi-account"
            variant="solo"
            v-model="assigned"
            :label='t("claim.label")'
            :error-messages="claim_error_message"
            v-on:keyup.enter="claimItems"
        ></v-text-field>
        <v-btn 
            style="padding-left: 16px"
            color="success" 
            :loading="is_loading"
            @click="claimItems"
        >
            {{ t("claim.submit") }}
        </v-btn>
    </div>
</template>