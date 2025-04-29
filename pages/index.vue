<template>
  <div class="container">
    <UButton active color="neutral" variant="outline" active-color="primary" active-variant="solid" class="p-2" to="/loading">Loading</UButton>
    <UButton active color="neutral" variant="outline" active-color="primary" active-variant="solid" class="p-2" to="/scroll">Scrolling</UButton>
  </div>
</template>

<style scoped>
.container {
  display: grid;
  place-content: center;
  margin: auto;
  gap: 1rem;
  height: 100vh;
}
</style>