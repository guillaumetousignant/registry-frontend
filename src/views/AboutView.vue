<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<template>
    <div class="about" style="max-width: 1280; min-width: 128; padding: 16px 16px 16px 16px">
        <h1 class="font-weight-thin">{{ t('about.title') }}</h1>
        <p class="font-weight-light">
            <b>{{ t('about.p5') }}</b>
        </p>
        <p class="font-weight-light">
            <b>{{ t('about.p1') }}</b>
            <a
                class="font-weight-medium"
                href="mailto:desiree.champagne-charles@hotmail.com"
                style="text-decoration: none"
                >desiree.champagne-charles@hotmail.com</a
            >
            <b>{{ t('about.p2') }}</b>
            <a
                class="font-weight-medium"
                href="mailto:moi_felixtou@hotmail.com"
                style="text-decoration: none"
                >moi_felixtou@hotmail.com</a
            >
            <b>{{ t('about.p3') }}</b>
            <a
                class="font-weight-medium"
                href="mailto:guillaume@arietguillaume.ca"
                style="text-decoration: none"
                >guillaume@arietguillaume.ca</a
            >
            <b>{{ t('about.p4') }}</b>
        </p>
    </div>
</template>
