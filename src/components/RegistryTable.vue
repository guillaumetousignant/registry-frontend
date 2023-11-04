<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import axios from 'axios'
import { onMounted } from 'vue'
import { ref } from 'vue'
import type { Ref } from 'vue'
import { useLogger } from 'vue-logger-plugin'
import { useTokenStore } from '@/stores/token'
import ClaimButton from './ClaimButton.vue'
const { t } = useI18n()
const log = useLogger()
const token = useTokenStore()

interface Item {
    id: number;
    name: string;
    colour: string;
    link: string;
    assigned: string;
}

let items: Ref<Array<Item>> = ref([])

    // onUpdated maybe?
onMounted(() => {
    if (token.token != null) {
        axios.get(" http://127.0.0.1:8000/api/v1/items", {
            headers: { Authorization: `Bearer ${token.token}` }
        }).then(response => {
            items.value = response.data.data
        },
        error => {
            log.error(error)
        })
    }
})
</script>

<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">{{ t("table.item") }}</th>
        <th class="text-left">{{ t("table.colour") }}</th>
        <th class="text-left">{{ t("table.link") }}</th>
        <th class="text-left">{{ t("table.assigned") }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.name">
        <td>{{ item.name }}</td>
        <td>{{ item.colour }}</td>
        <td>{{ item.link }}</td>
        <td v-if="item.assigned == null"><ClaimButton item_id=item.id /></td>
        <td v-else>{{ item.assigned }}</td>
      </tr>
    </tbody>
  </v-table>
</template>
