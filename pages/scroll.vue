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
  // const { left, right, top, bottom, x, y, width, height } = logo.value.getBoundingClientRect();
  const drawableLogo = $svg.createDrawable(".s51 path");

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
      onEnter: () => {
        logo.value.classList.remove("filled");
      },
      onLeave: () => {
        logo.value.classList.add("filled");
        // if at top of the screen, remove the filled class
        if (logo.value.getBoundingClientRect().top < 10) {
          logo.value.classList.remove("filled");
        }
      },
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
    .add(
      logo.value,
      {
        duration: 4000,
        fillOpacity: [0, 1],
        ease: "elastic",
        loop: false,
        x: 500,
        y: -420,
        scale: .1,
      },
    )
    .add(
      logo.value.querySelector(".s51"),
      {
        duration: 4000,
        fill: "#ee3124",
        ease: "elastic",
        loop: false,
        onComplete: () => {
          logo.value.classList.add("filled");
        },
      },
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