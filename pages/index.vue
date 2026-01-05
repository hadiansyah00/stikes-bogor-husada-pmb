<template>
  <div class="flex flex-col min-h-screen">
    <AppHeader />
    <main class="flex items-center justify-center flex-1">
      <HeroSection />
      <!-- <FormulirSection /> -->
    </main>
    <!-- <FormulirSection /> -->
    <!-- <BeritaMahasiswa /> -->
    <FormulirWaSection />
    <SejarahSection />
    <ProgramStudiSection />
    <TestimoniSlider />
    <LogoKemitraan />
    <AppFooter />
    <BackToTopButton />
  </div>
</template>

<script setup>
// Anda bisa menambahkan logika atau data fetching di sini jika diperlukan
useHead({
  title: "Penerimaan Mahasiswa Baru STIKes Bogor Husada ",
  meta: [
    {
      name: "description",
      content:
        "Selamat datang di halaman resmi Penerimaan Mahasiswa Baru STIKes Bogor Husada. Daftar sekarang untuk memulai perjalanan pendidikan kesehatan Anda bersama kami!",
    },
  ],

  script: [
    {
      src: "https://cdn.watzap.id/widget-api.js",
      async: true,
      "data-watzapkey": "xgWw1957", // Use quotes for attributes with hyphens
    },
  ],
  // --- TAMBAHKAN BAGIAN INI UNTUK FAVICON ---
  link: [
    {
      rel: "icon",
      type: "image/png",
      href: "/img/logo/logo_sbh_bulet.png",
    },
  ],
});
</script>
