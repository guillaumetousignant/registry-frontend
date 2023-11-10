<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<template>
    <v-app class="rounded rounded-md">
        <NavBar />

        <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
            <RouterView />
        </v-main>
    </v-app>
</template>
