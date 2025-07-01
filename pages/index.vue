<template>
  <div class="flex flex-col min-h-screen">
    <AppHeader />
    <main class="flex items-center justify-center flex-1">
      <HeroSection />
      <!-- <FormulirSection /> -->
    </main>
    <FormulirSection />
    <AppFooter />
    <BackToTopButton />
  </div>
</template>

<script setup>
// Anda bisa menambahkan logika atau data fetching di sini jika diperlukan
useHead({
  title: "Tike Beasiswa STIKes Bogor Husada - Jalur SNBT / SNBP 2025",
  meta: [
    {
      name: "description",
      content:
        "Daftar Beasiswa STIKes Bogor Husada sekarang dan raih kesempatan beas melalui jalur SNBT 2025. Jadilah bagian dari tenaga kesehatan profesional masa depan bersama kami!",
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
