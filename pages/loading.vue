<template>
  <div class="loading-container hidden" ref="logo">
    <S51Logo class="s51 text-4xl" :fontControlled="false" />
  </div>
</template>

<script setup>
import S51Logo from "~/assets/S51-Logo.svg";
const { $animate, $svg, $stagger, $createTimeline } = useNuxtApp();
const logo = useTemplateRef("logo");

onMounted(async () => {
  await nextTick();

  const tl = $createTimeline({
    defaults: {
      ease: "inOutQuad",
      loop: false,
    },
  });

  tl.add($svg.createDrawable(".s51 path"), {
    draw: ["0 0", "0 1", "1 1"],
    ease: "inOutQuad",
    duration: 12000,
    // delay: $stagger(1000),
    loop: true,
  });

  logo.value.classList.remove("hidden");
});
</script>

<style>
.hidden {
  opacity: 0;
}

.loading-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  place-content: center;
  gap: 1rem;
  height: 100vh;
}
</style>
