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
const rows = 20;
const grid = [rows, rows];
const numberOfElements = rows * rows;
var animation;

onMounted(async () => {
  let index = 0;
  let nextIndex = 0;

  function animateGrid() {
    if (animation) animation.pause();
    nextIndex = $utils.random(0, numberOfElements);
    const duration = $utils.random(1000, 3000);

    animation = $createTimeline({
      defaults: {
        ease: "inOutQuad",
      },
      onComplete: animateGrid,
    })
      .add(
        ".dot",
        {
          keyframes: [
            {
              scale: 1.2,
              duration: 500,
            },
            {
              x: 0,
              y: 0,
              scale: 0.8,
              duration: 400,
            },
            {
              x: 0,
              y: 0,
              scale: 1,
              duration: duration - 900,
            },
          ],
          delay: $stagger(50, { grid, from: index }),
        },
        0,
      )
      .add(".cursor", {
        translateX: {
          from: $stagger("-3rem", { grid, from: index, axis: "x" }),
          to: $stagger("-3rem", { grid, from: nextIndex, axis: "x" }),
          duration: duration,
        },
        translateY: {
          from: $stagger("-3rem", { grid, from: index, axis: "y" }),
          to: $stagger("-3rem", { grid, from: nextIndex, axis: "y" }),
          duration: duration,
        },
        // delay: duration,
      });

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
  --rows: 20;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: calc(var(--rows) * 3rem);
  height: calc(var(--rows) * 3rem);
}

.stagger-visualizer .dot {
  position: relative;
  width: 2.5rem;
  height: 2.5rem;
  margin: 0.25rem;
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
  width: 2.5rem;
  height: 2.5rem;
  margin: 0.25rem;
}

.stagger-visualizer .cursor path {
  fill-opacity: 1;
  fill: white !important;
  stroke: white;
}
</style>
