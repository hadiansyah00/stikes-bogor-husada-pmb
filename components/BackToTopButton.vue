<template>
  <button
    v-show="isVisible"
    @click="scrollToTop"
    class="fixed z-50 p-3 text-white transition-opacity duration-300 bg-orange-600 rounded-full shadow-lg bottom-8 right-8 hover:bg-prange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
    aria-label="Go back to top"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="w-6 h-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M5 15l7-7 7 7"
      />
    </svg>
  </button>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

// Reactive state to control button visibility
const isVisible = ref(false);

// Function to smoothly scroll to the top of the page
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

// Function to toggle button visibility based on scroll position
const handleScroll = () => {
  if (window.scrollY > 200) {
    isVisible.value = true;
  } else {
    isVisible.value = false;
  }
};

// Add and remove scroll event listener
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
/* You can add additional custom styles here if needed */
</style>
