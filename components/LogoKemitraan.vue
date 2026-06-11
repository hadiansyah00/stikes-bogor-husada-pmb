<script setup>
const partners = [
  { name: "RS Azra Bogor", logo: "/img/mitra/rs-azra.png" },
  { name: "Puskesmas", logo: "/img/mitra/puskesmas.png" },
  { name: "IPB University", logo: "/img/mitra/Logo_IPB.png" },
  { name: "Pemerintah Kota Bogor", logo: "/img/mitra/pemkot_bogor.png" },
  {
    name: "Pemerintah Kabupaten Bogor",
    logo: "/img/mitra/Lambang_Kabupaten_Bogor.svg",
  },
  {
    name: "AIPGI",
    logo: "/img/mitra/Logo-AIPGI-1010x1024.png",
  },
  {
    name: "PAFI",
    logo: "/img/mitra/PAFI.png",
  },
  {
    name: "Ikatan Apoteker Indonesia",
    logo: "/img/mitra/logo-big.jpeg",
  },
  {
    name: "Ikatan Bidan Indonesia",
    logo: "/img/mitra/ibi.png",
  },
];
</script>

<template>
  <section class="py-12 overflow-hidden bg-white sm:py-16">
    <div class="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
      <!-- HEADER -->
      <div class="max-w-2xl mx-auto mb-8 text-center sm:mb-10">
        <span class="inline-block px-3 py-1 mb-3 text-[11px] font-bold tracking-wide uppercase text-cyan-700 rounded-full bg-cyan-100">
          Jejaring Praktik
        </span>
        <h2 class="text-2xl font-extrabold text-slate-900 sm:text-3xl">
          Kerja Sama dengan Stakeholder
        </h2>
        <p class="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
          STIKes Bogor Husada dipercaya menjalin kerja sama dengan berbagai
          institusi pemerintah, layanan kesehatan, dan pendidikan.
        </p>
      </div>

      <!-- MARQUEE -->
      <div class="relative overflow-hidden border rounded-xl border-slate-200 bg-slate-50 py-5">
        <div class="absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-slate-50 to-transparent"></div>
        <div class="absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-slate-50 to-transparent"></div>
        <div class="marquee">
          <div class="marquee-group">
            <div
              v-for="(item, i) in partners"
              :key="i"
              class="flex items-center justify-center px-5 sm:px-8"
            >
              <img
                :src="item.logo"
                :alt="item.name"
                class="object-contain h-10 transition opacity-70 sm:h-12 grayscale hover:grayscale-0 hover:opacity-100"
              />
            </div>
          </div>

          <!-- DUPLICATE (biar infinite) -->
          <div class="marquee-group">
            <div
              v-for="(item, i) in partners"
              :key="'dup-' + i"
              class="flex items-center justify-center px-5 sm:px-8"
            >
              <img
                :src="item.logo"
                :alt="item.name"
                class="object-contain h-10 transition opacity-70 sm:h-12 grayscale hover:grayscale-0 hover:opacity-100"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.marquee {
  display: flex;
  width: max-content;
  animation: marquee 28s linear infinite;
}

.marquee-group {
  display: flex;
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>
