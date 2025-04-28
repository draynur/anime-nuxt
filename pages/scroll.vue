<template>
  <body class="grid" ref="body">
    <section class="sticky-container">
      <div class="logo-container hidden" ref="logo">
        <S51Logo class="s51 text-4xl" :fontControlled="false" />
      </div>
    </section>
  </body>
</template>

<script setup>
import S51Logo from "~/assets/S51-logo.svg";
const { $createTimeline, $stagger, $onScroll, $svg } = useNuxtApp();
const logo = useTemplateRef("logo");

onMounted(() => {
  logo.value.classList.remove("hidden");

  $createTimeline({
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
      $svg.createDrawable(".s51 path"),
      {
        draw: ["0 0", "0 1"],
        ease: "inOutQuad",
        duration: 8000,
        delay: $stagger(1000),
        loop: false,
      },
      0,
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
</style>
