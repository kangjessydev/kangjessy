<template>
    <BaseButton v-bind="$attrs" variant="primary">
        <slot />
    </BaseButton>
</template>

<script setup lang="ts">
import { BaseButton } from "@kangjessy/ui"
</script>
