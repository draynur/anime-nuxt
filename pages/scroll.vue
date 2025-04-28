<template>
  <div class="scroll-container">
    <section class="section" id="section-1">
      <div class="content">
        <h1>Section 1</h1>
        <p>
          This is the first section. The background will change color as you
          scroll.
        </p>
      </div>
    </section>
    <section class="section" id="section-2">
      <div class="content">
        <h1>Section 2</h1>
        <p>This section will animate a circle.</p>
        <div ref="circle" class="circle"></div>
      </div>
    </section>
    <section class="section" id="section-3">
      <div class="content">
        <h1>Section 3</h1>
        <p>
          This section demonstrates multiple animations coordinated with scroll
          position.
        </p>
        <div ref="square1" class="square">Square 1</div>
        <div ref="square2" class="square">Square 2</div>
      </div>
    </section>
    <section class="section" id="section-4">
      <div class="content">
        <h1>Section 4</h1>
        <p>The final section.</p>
      </div>
    </section>
  </div>
</template>
<script setup>
import { ref, onMounted, nextTick, onUnmounted } from "vue";
const { $animate } = useNuxtApp();

// Refs for elements we want to animate
const circle = ref(null);
const square1 = ref(null);
const square2 = ref(null);
let scrollListener;
onMounted(async () => {
  // Wait for the DOM to be fully rendered before accessing refs
  await nextTick();
  $initAnimations();
});
onUnmounted(() => {
  window.removeEventListener("scroll", scrollListener); // Remove the event listener when the component is unmounted
});
const $initAnimations = () => {
  // Section 1: Background color change based on scroll
  const section1 = document.getElementById("section-1");
  const section1Top = section1.offsetTop;
  const section1Height = section1.offsetHeight;
  // Section 2: Circle animation
  const section2 = document.getElementById("section-2");
  const section2Top = section2.offsetTop;
  const section2Height = section2.offsetHeight;
  // Section 3: Multiple square animations
  const section3 = document.getElementById("section-3");
  const section3Top = section3.offsetTop;
  const section3Height = section3.offsetHeight;
  scrollListener = () => {
    const scrollPosition = window.scrollY;
    // Section 1 - Background color animation
    const section1Progress = Math.max(
      0,
      Math.min(1, (scrollPosition - section1Top) / section1Height),
    );
    const bgColor = `hsl(${section1Progress * 360}, 70%, 60%)`; // Change hue as you scroll
    section1.style.backgroundColor = bgColor;
    // Section 2 - Circle Animation based on scroll
    const section2Progress = Math.max(
      0,
      Math.min(1, (scrollPosition - section2Top) / section2Height),
    );
    $animate({
      targets: circle.value,
      translateX: section2Progress * 200, // Move the circle horizontally
      scale: 1 + section2Progress * 0.5, // Scale it up slightly
      rotate: section2Progress * 360, // Rotate it
      duration: 0, // IMPORTANT: Set duration to 0 for scroll-based animation
      easing: "linear",
    });
    // Section 3 - Squares Animation
    const section3Progress = Math.max(
      0,
      Math.min(1, (scrollPosition - section3Top) / section3Height),
    );
    $animate({
      targets: [square1.value, square2.value],
      translateX: section3Progress * 300,
      rotate: section3Progress * 720,
      delay: (el, i) => i * 100, // Offset the animation for each square
      duration: 0,
      easing: "linear",
    });
  };
  window.addEventListener("scroll", scrollListener);
};
</script>
<style scoped>
.scroll-container {
  /* Required for scrollable sections to work properly */
  overflow: auto;
  height: 100vh;
  width: 100%;
}
.section {
  height: 100vh; /* Full viewport height for each section */
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #f0f0f0;
  transition: background-color 0.3s ease; /* Smooth background color transition */
}
.content {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
.circle {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #007bff;
  margin: 20px auto;
}
.square {
  width: 80px;
  height: 80px;
  background-color: #28a745;
  color: white;
  margin: 10px;
  display: inline-block;
}
</style>
