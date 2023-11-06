<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
import { ref } from 'vue'
let drawer = ref(false)
const items = [
    { title: t('registry'), props: {
        prependIcon: 'mdi-baby-carriage',
        to: "/",
        color: 'secondary',
        }
    },
    { title: t('about'), props: {
        prependIcon: 'mdi-information',
        to: "/about",
        color: 'secondary',
        }
    },
]
</script>

<template>
    <v-app-bar :elevation="2" color="primary">
        <template v-slot:prepend>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title>{{ t("title") }}</v-app-bar-title>

        <template v-slot:append>
            <v-btn icon="mdi-dots-vertical"></v-btn>
        </template>
    </v-app-bar>

    <v-navigation-drawer
            v-model="drawer"
            temporary
    >
        <v-list :items="items" nav></v-list>
    </v-navigation-drawer>
</template>
