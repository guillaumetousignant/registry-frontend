<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import axios from 'axios'
import { onMounted } from 'vue'
import { ref } from 'vue'
import type { Ref } from 'vue'
const { t } = useI18n()

interface Item {
  name: string;
  colour: string;
  link: string;
  assigned: string;
}

let items: Ref<Array<Item>> = ref([])

    // onUpdated maybe?
onMounted(() => {
    axios.get(" http://127.0.0.1:8000/api/v1/items").then(response => {
        items.value = response.data.data
      },
      error => {
        console.log(error)
      })
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
        <td>{{ item.assigned }}</td>
      </tr>
    </tbody>
  </v-table>
</template>
