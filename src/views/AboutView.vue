<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<template>
    <div class="about" style="max-width: 1280; min-width: 128; padding: 16px 16px 16px 16px">
        <h1 class="font-weight-thin">{{ t('about.title') }}</h1>
        <p class="font-weight-light">
            <b>{{ t('about.p4') }}</b>
        </p>
        <p class="font-weight-light">
            <b>{{ t('about.p1') }}</b>
            <a
                class="font-weight-medium"
                href="mailto:ari@arietguillaume.ca"
                style="text-decoration: none"
                >ari@arietguillaume.ca</a
            >
            <b>{{ t('about.p2') }}</b>
            <a
                class="font-weight-medium"
                href="mailto:guillaume@arietguillaume.ca"
                style="text-decoration: none"
                >guillaume@arietguillaume.ca</a
            >
            <b>{{ t('about.p3') }}</b>
        </p>
    </div>
</template>
