<template>
  <div class="flex flex-col min-h-screen">
    <AppHeader />
    <main class="flex-1">
      <PromoSnbtSnbpHero />
      <ProgramStudiSection />
      <KeunggulanSection />
      <LandingVideoSlider />
      <LogoKemitraan />
    </main>
    <AppFooter />
    <BackToTopButton />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

useHead({
  title: "Tiket Beasiswa SNBT/SNBP STIKes Bogor Husada",
  meta: [
    {
      name: "description",
      content:
        "Tukarkan bukti kartu SNBT/SNBP menjadi tiket beasiswa Biaya Kuliah Gelombang 1 STIKes Bogor Husada. Data langsung masuk ke Admin PMB untuk validasi dan follow up.",
    },
  ],
  link: [
    {
      rel: "icon",
      type: "image/png",
      href: "/img/logo/logo_sbh_bulet.png",
    },
  ],
});

onMounted(() => {
  window.trackFB?.("ViewContent", {
    content_name: "Landing Tiket Beasiswa SNBT/SNBP STIKes Bogor Husada",
    content_category: "Promo SNBT/SNBP",
  });
});
</script>
