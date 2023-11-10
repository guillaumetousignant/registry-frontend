<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import axios from 'axios'
import { onMounted } from 'vue'
import { ref } from 'vue'
import type { Ref } from 'vue'
import { useLogger } from 'vue-logger-plugin'
import { useTokenStore } from '@/stores/token'
import ClaimButton from './ClaimButton.vue'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const log = useLogger()
const token = useTokenStore()
const router = useRouter()

interface Item {
    id: number
    name: string
    colour: string
    link: string
    assigned: string
}

let items: Ref<Array<Item>> = ref([])
let alert = ref(false)
let alert_type: Ref<'success' | 'error' | 'warning' | 'info' | undefined> = ref(undefined)
let alert_title = ref('')
let alert_text = ref('')

function getItems() {
    axios
        .get('https://api.arietguillaume.ca/api/v1/items', {
            headers: { Authorization: `Bearer ${token.token}` }
        })
        .then(
            (response) => {
                items.value = response.data.data
            },
            (error) => {
                log.error(error)
            }
        )
}

function alreadyClaimed() {
    alert.value = true
    alert_type.value = 'warning'
    alert_title.value = t('claim.warning_title')
    alert_text.value = t('claim.conflict_error_text')
    getItems()
}

function unauthorizedResponse() {
    router.push('/')
}

// onUpdated maybe?
onMounted(() => {
    if (token.token != null) {
        getItems()
    }
})
</script>

<template>
    <v-alert
        v-model="alert"
        closable
        :type="alert_type"
        :title="alert_title"
        :text="alert_text"
    ></v-alert>
    <v-table fixed-header style="max-width: 1680px; min-width: 128px; padding: 16px 16px 16px 16px;" class="registry_table">
        <thead>
            <tr>
                <th class="text-left">{{ t('table.item') }}</th>
                <th class="text-left">{{ t('table.colour') }}</th>
                <th class="text-left">{{ t('table.link') }}</th>
                <th class="text-left">{{ t('table.assigned') }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in items" :key="item.name">
                <td style="min-width: 96px;">{{ item.name }}</td>
                <td style="min-width: 96px;">{{ item.colour }}</td>
                <td style="min-width: 96px;">
                    <a :href="item.link" style="text-decoration: none;">
                        {{ item.link }}
                    </a>
                </td>
                <td v-if="item.assigned == null">
                    <ClaimButton
                        :item_id="item.id"
                        @claimed="getItems"
                        @conflict="alreadyClaimed"
                        @unauthorized="unauthorizedResponse"
                    />
                </td>
                <td v-else style="padding: 16px 16px 16px 16px;">{{ item.assigned }}</td>
            </tr>
        </tbody>
    </v-table>
</template>
