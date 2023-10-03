<script setup lang="ts">
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
        <th class="text-left">Item TRADUIRE</th>
        <th class="text-left">Couleur TRADUIRE</th>
        <th class="text-left">Lien TRADUIRE</th>
        <th class="text-left">Acheté par TRADUIRE</th>
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
