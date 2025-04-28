<template>
  <body class="grid">
    <div class="container hidden" ref="logo">
      <S51Logo class="s51 text-4xl" :fontControlled="false" />
    </div>
  </body>
</template>

<script setup>
import S51Logo from "~/assets/S51-logo.svg";
const { $animate, $svg, $stagger } = useNuxtApp();

const logoVisible = false;
const logo = useTemplateRef("logo");

onMounted(async () => {
  await nextTick();

  $animate($svg.createDrawable(".s51 path"), {
    draw: ["0 0", "0 1"],
    ease: "inOutQuad",
    duration: 8000,
    delay: $stagger(1000),
    loop: false,
  });

  logo.value.classList.remove("hidden");

  $animate(".s51 path", {
    fillOpacity: [0, 1],
    delay: 8000,
    duration: 1000,
    ease: "inOutQuad",
    loop: false,
    autoplay: true,
  });
});
</script>

<style>
.hidden {
  opacity: 0;
}

.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  place-content: center;
  gap: 1rem;
}

.s51,
.s51 * {
  fill: #ee3124 !important;
  fill-opacity: 0;
  stroke: #ee3124;
  stroke-width: 10px;
}
</style>
