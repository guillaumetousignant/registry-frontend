<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
import { ref } from 'vue'
let drawer = ref(false)
const items = [
    {
        title: t('registry'),
        props: {
            prependIcon: 'mdi-baby-carriage',
            to: '/home',
            color: 'secondary'
        }
    },
    {
        title: t('about.about'),
        props: {
            prependIcon: 'mdi-information',
            to: '/about',
            color: 'secondary'
        }
    }
]

import logo from '@/assets/logo.svg'
</script>

<template>
    <v-app-bar :elevation="2" color="primary-lighten-2">
        <template v-slot:prepend>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title>{{ t('title') }}</v-app-bar-title>

        <!-- This is a bad way of doing this it seems -->
        <v-img
            style="min-width: 62px; max-width: 62px; margin-right: 22px"
            height="48"
            :src="logo"
            :alt="t('logo')"
        ></v-img>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary>
        <v-list :items="items" nav></v-list>
    </v-navigation-drawer>
</template>
