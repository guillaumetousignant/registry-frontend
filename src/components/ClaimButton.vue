<script setup lang="ts">
defineProps<{
  item_id: number
}>()
</script>

<template>
    <div class="claim_button">
        <v-text-field
            clearable
            label="Label"
            prepend-icon="mdi-account"
            variant="outlined"
        ></v-text-field>
    </div>
</template>