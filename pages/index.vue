<template>
  <div class="container">
    <h1 class="h1">These are links...</h1>
    <UButton
      active
      color="neutral"
      variant="outline"
      active-color="primary"
      active-variant="solid"
      class="p-2 text-center block"
      to="/loading"
      >Loading</UButton
    >
    <UButton
      active
      color="neutral"
      variant="outline"
      active-color="primary"
      active-variant="solid"
      class="p-2 text-center block"
      to="/scroll"
      >Scrolling</UButton
    >
    <UButton
      active
      color="neutral"
      variant="outline"
      active-color="primary"
      active-variant="solid"
      class="p-2 text-center block"
      to="/matrix"
      >Matrix</UButton
    >
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

