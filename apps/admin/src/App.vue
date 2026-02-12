<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useBranding } from "./composables/useBranding";
import { usePaymentSettings } from "./composables/usePaymentSettings";
import { useProfile } from "./composables/useProfile";

const { initBranding } = useBranding();
const { initPaymentSettings } = usePaymentSettings();
const { initProfile } = useProfile();

onMounted(async () => {
  // Sync all global settings from Supabase on app start
  await Promise.all([initBranding(), initPaymentSettings(), initProfile()]);
});
</script>
