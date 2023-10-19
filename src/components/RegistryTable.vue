<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const items = [
    {
        name: "Poussette X",
        colour: "Fuschia",
        link: "https://www.arietguillaume.ca",
        assigned: null
    },
    {
        name: "Bavette cool",
        colour: "Verte",
        link: "https://www.arietguillaume.ca",
        assigned: null
    },
    {
        name: "Parc McDonald",
        colour: "Jaune",
        link: "https://www.arietguillaume.ca",
        assigned: "Ariane Laurier"
    },
]
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
