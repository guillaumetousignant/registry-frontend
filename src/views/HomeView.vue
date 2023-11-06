<script setup lang="ts">
import RegistryTable from '../components/RegistryTable.vue'
import { useRouter } from 'vue-router'
import { useTokenStore } from '@/stores/token'
import { onMounted } from 'vue'

const token = useTokenStore()
const router = useRouter()

onMounted(() => {
    if (token.token == null) {
        router.push("/login")
    }
})
</script>

<template>
    <RegistryTable/>
</template>
