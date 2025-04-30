<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const config = useRuntimeConfig();
const home = config.app.baseURL;
const showBackButton = ref(router.currentRoute.value.name !== "index");

watch(
  () => router.currentRoute.value.name,
  (newRouteName) => {
    showBackButton.value = newRouteName !== "index";
  },
  { immediate: true },
);
</script>
<template>
  <UApp>
    <div class="background-grid">
      <header v-if="showBackButton">
        <UButton
          as="link"
          active
          color="neutral"
          variant="outline"
          active-color="primary"
          active-variant="solid"
          class="p-2"
          :to="home"
          >Back</UButton
        >
      </header>
      <NuxtPage />
    </div>
  </UApp>
</template>
<style>
header {
  position: fixed;
  padding: 2rem;
  display: flex;
  align-items: center;
  z-index: 10000;
}
</style>
