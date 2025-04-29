<script setup lang="ts">

// Setup showBackButton to watch $router.currentRoute
const { useRouter } = await import('vue-router');

const router = useRouter();
const currentRoute = router.currentRoute.value;
let showBackButton = ref(currentRoute.name !== 'index');

// Watch for route changes
router.afterEach((to, from) => {
  showBackButton.value = to.name !== 'index' && from.name !== null;
  console.log('Current route:', to.name);
  console.log('Previous route:', from.name);
  console.log('Show back button:', showBackButton);
});

</script>
<template>
  <UApp>
    <div class="background-grid">
      <header v-if="showBackButton">
        <UButton as="link" active color="neutral" variant="outline"
          active-color="primary" active-variant="solid" class="p-2" @click="$router.back()">Back</UButton>
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