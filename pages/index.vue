<template>
  <div class="flex flex-col min-h-screen">
    <AppHeader />
    <main class="flex-1">
      <HeroSection />
    </main>
    <CallToAction />
    <SejarahSection />
    <ProgramStudiSection />
    <KeunggulanSection />
    <LandingVideoSlider />
    <LogoKemitraan />
    <AppFooter />
    <BackToTopButton />
  </div>
</template>
<script setup lang="ts">
import { onMounted } from "vue";

useHead({
  title: "Penerimaan Mahasiswa Baru STIKes Bogor Husada",
  meta: [
    {
      name: "description",
      content:
        "Selamat datang di halaman resmi Penerimaan Mahasiswa Baru STIKes Bogor Husada. Daftar sekarang untuk memulai perjalanan pendidikan kesehatan Anda bersama kami!",
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
  // Event view landing page
  window.trackFB?.("ViewContent", {
    content_name: "Landing PMB STIKes Bogor Husada",
    content_category: "PMB",
  });
});
</script>
