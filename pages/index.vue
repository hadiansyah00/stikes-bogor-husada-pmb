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
      // This part contains the main Pixel logic.
      innerHTML: `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '3852898454807503');
        fbq('track', 'PageView');
      `,
      // We use 'body: true' to ensure it's placed before the closing </body> tag for better performance.
      body: true,
      // It's important to specify the type
      type: "text/javascript",
      // Optional: Helps with browser security policies
      charset: "utf-8",
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
