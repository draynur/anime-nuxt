<template>
  <div class="loading-container" ref="logo">
    <div class="stagger-visualizer" ref="stagger-container">
      <S51Logo class="s51 cursor" :fontControlled="false" />
      <S51Logo
        v-for="index in numberOfElements"
        :key="index"
        class="s51 dot"
        :fontControlled="false"
      />
    </div>
  </div>
</template>

<script setup>
import S51Logo from "~/assets/S51-Logo.svg";
const { $utils, $createTimeline, $stagger } = useNuxtApp();
const logo = useTemplateRef("logo");
const staggerContainer = useTemplateRef("stagger-container");
const cursor = useTemplateRef("cursor");
const rows = 4;
const grid = [rows, rows];
const numberOfElements = rows * rows;
var animation;

onMounted(async () => {
  let index = $utils.random(0, numberOfElements);
  let nextIndex = 0;

  $utils.set(".cursor", {
    x: $stagger("-1rem", { grid, from: index, axis: "x" }),
    y: $stagger("-1rem", { grid, from: index, axis: "y" }),
  });

  function animateGrid() {
    if (animation) animation.pause();

    nextIndex = $utils.random(0, numberOfElements);

    animation = $createTimeline({
      defaults: {
        ease: "inOutQuad",
      },
      onComplete: animateGrid,
    })
      .add(
        ".cursor",
        {
          translateX: {
            from: $stagger("-5.5rem", { grid, from: index, axis: "x" }),
            to: $stagger("-5.5rem", { grid, from: nextIndex, axis: "x" }),
            duration: 2000,
          },
          translateY: {
            from: $stagger("-5.5rem", { grid, from: index, axis: "y" }),
            to: $stagger("-5.5rem", { grid, from: nextIndex, axis: "y" }),
            duration: 2000,
          },
          delay: $utils.random(100, 1000)
        },
      );

    index = nextIndex;
  }

  animateGrid();
});

onBeforeUnmount(() => {
  if (animation) {
    animation.cancel();
  }
});
</script>

<style>
.loading-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  place-content: center;
  gap: 1rem;
  height: 100vh;
}

.stagger-visualizer {
  --rows: 4;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: calc(var(--rows) * 5.5rem);
  height: calc(var(--rows) * 5.5rem);
}

.stagger-visualizer .dot {
  position: relative;
  width: 4.5rem;
  height: 4.5rem;
  margin: 0.5rem;
}

.stagger-visualizer .dot path {
  fill-opacity: 1;
  stroke: #ee3124;
}

.stagger-visualizer .cursor {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 4.5rem;
  height: 4.5rem;
  margin: 0.5rem;
}

.stagger-visualizer .cursor path{
  fill-opacity: 1;
  fill: white !important;
  stroke: white;
}
</style>
