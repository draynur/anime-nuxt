<script setup>
import S51Logo from "~/assets/S51-logo.svg";
const { $animate, $svg, $stagger } = useNuxtApp();
let isAnimating = false;
let animation = false;

const animate = () => {
  if (animation) {
    if (isAnimating) {
      animation.play();
    } else {
      animation.pause();
    }
    isAnimating = !isAnimating;
  }
};

onMounted(() => {
  animation = $animate($svg.createDrawable(".s51 path"), {
    draw: ["0 0", "0 1", "1 1"],
    ease: "inOutQuad",
    duration: 8000,
    delay: $stagger(500),
    loop: true,
    autoplay: false,
  });
});
</script>
<template>
  <div class="container">
    <UButton
      icon="i-lucide-rocket"
      size="md"
      color="primary"
      variant="solid"
      @click="animate"
      >{{ isAnimating ? "Pause" : "Play" }}</UButton
    >
    <S51Logo class="s51 text-4xl" :fontControlled="false" />
  </div>
</template>
<style>
.s51 {
  height: 400px;
  width: auto;
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
  fill: none !important;
  stroke: #ee3124;
  stroke-width: 10px;
}
</style>
