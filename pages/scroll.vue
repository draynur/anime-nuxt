<template>
  <section class="sticky-container">
    <div class="logo-container hidden" ref="logo">
      <S51Logo class="s51 text-4xl" :fontControlled="false" />
    </div>
  </section>
</template>

<script setup>
import S51Logo from "~/assets/S51-Logo.svg";
const { $createTimeline, $stagger, $onScroll, $svg, $waapi } = useNuxtApp();
const logo = useTemplateRef("logo");
let tl = null;

onMounted(() => {
  logo.value.classList.remove("hidden");
  const el = logo.value.querySelector("svg");
  const drawableLogo = $svg.createDrawable(".s51 path");

  // Get current bounding box + centers
  const { left, top, width, height } = el.getBoundingClientRect();
  const startCx = left + width / 2;
  const startCy = top + height / 2;

  // Define your scale and margin
  const finalScale = 0.1;
  const marginY = 20;
  const marginX = 32;

  // Compute where the center should end up
  const endCx = window.innerWidth - (width * finalScale) / 2 - marginX;
  const endCy = (height * finalScale) / 2 + marginY;

  // Calculate distances of each vector
  const translateX = endCx - startCx;
  const translateY = endCy - startCy;

  tl = $createTimeline({
    defaults: {
      ease: "linear",
      duration: 500,
      composition: "blend",
    },
    autoplay: $onScroll({
      target: ".sticky-container",
      enter: "top top",
      leave: "bottom bottom",
      sync: 0.5,
    }),
  })
    .add(
      drawableLogo,
      {
        draw: ["0 0", "0 1"],
        ease: "inOutQuad",
        duration: 8000,
        delay: $stagger(1000),
        loop: false,
      },
      0,
    )
    .add(logo.value, {
      duration: 4000,
      ease: "inOutQuad",
      loop: false,
      x: translateX,
      y: translateY,
      scale: finalScale,
    })
    .add(
      logo.value.querySelectorAll("path"),
      {
        duration: 4000,
        ease: "inOutQuad",
        fillOpacity: 1,
        loop: false,
      },
      "-=4000",
    )
    .init();

  logo.value.classList.remove("hidden");
});
</script>

<style>
.sticky-container {
  align-items: flex-start;
  height: 400lvh;
}

.logo-container {
  perspective: 1000px;
  perspective-origin: 50%;
  transform-style: preserve-3d;
  position: sticky;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100lvh;
  width: 100%;
}

section {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100lvh;
  border-top: 1px dotted var(--red);
  border-bottom: 1px dotted var(--red);
}

section.spacer {
  min-height: 50lvh;
}

.section-content {
  transform-style: preserve-3d;
  display: flex;
  width: 100%;
  height: 100lvh;
  justify-content: center;
}

.hidden {
  opacity: 0;
}

.filled .s51 *,
.filled .s51 {
  fill-opacity: 1;
}
</style>
