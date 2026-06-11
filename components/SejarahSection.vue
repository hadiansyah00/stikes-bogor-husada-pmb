<script setup>
import { Building2, CalendarCheck, Stethoscope } from "lucide-vue-next";

const highlights = [
  { label: "Sejak 2007", icon: CalendarCheck },
  { label: "Kampus Kesehatan", icon: Stethoscope },
  { label: "Mitra RS Azra", icon: Building2 },
];
</script>

<template>
  <section class="py-12 bg-slate-50 sm:py-16 lg:py-20">
    <div class="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
      <!-- HEADER -->
      <div class="max-w-2xl mx-auto mb-8 text-center sm:mb-10" data-aos="fade-up">
        <span
          class="inline-block px-3 py-1 mb-3 text-[11px] font-bold tracking-wide uppercase text-orange-700 rounded-full bg-orange-100"
        >
          Profil Institusi
        </span>

        <h2 class="text-2xl font-extrabold text-slate-900 sm:text-3xl">
          STIKes Bogor Husada
        </h2>
        <p class="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
          Lingkungan belajar kesehatan yang dekat dengan praktik, layanan, dan kebutuhan dunia kerja.
        </p>
      </div>

      <!-- CONTENT -->
      <div
        class="grid items-center gap-6 p-4 bg-white border shadow-sm border-slate-200 lg:grid-cols-2 sm:p-6 lg:p-8 rounded-xl"
        data-aos="fade-up"
        data-aos-delay="150"
      >
        <!-- IMAGE -->
        <div class="relative overflow-hidden rounded-lg aspect-[4/3] bg-slate-100">
          <img
            src="/img/front-pages/landing-page/foto_utama_webb-1-1024x669.png"
            alt="Gedung STIKes Bogor Husada"
            loading="lazy"
            class="object-cover w-full h-full"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent"></div>
          <div class="absolute grid grid-cols-3 gap-2 left-3 right-3 bottom-3">
            <div
              v-for="item in highlights"
              :key="item.label"
              class="flex flex-col items-center justify-center gap-1 px-2 py-2 text-center border rounded-lg bg-white/90 border-white/50 backdrop-blur"
            >
              <component :is="item.icon" class="w-4 h-4 text-orange-600" />
              <span class="text-[10px] font-bold leading-3 text-slate-800">{{ item.label }}</span>
            </div>
          </div>
        </div>

        <!-- TEXT -->
        <div class="space-y-4 text-sm leading-6 text-slate-700 sm:text-base sm:leading-7">
          <p>
            STIKes Bogor Husada merupakan institusi pendidikan tinggi kesehatan
            yang berawal dari Akademi Kebidanan Bogor Husada yang berdiri sejak
            tahun 2007 dan resmi bertransformasi menjadi STIKes pada tahun 2019.
          </p>

          <p>
            Dalam penyelenggaraan pendidikan, STIKes Bogor Husada menekankan
            integrasi antara pembelajaran akademik dan praktik profesional yang
            didukung oleh jejaring institusi layanan kesehatan, termasuk
            <span class="font-semibold text-gray-800">
              Rumah Sakit Azra Kota Bogor </span
            >.
          </p>

          <p>
            Saat ini, STIKes Bogor Husada menyelenggarakan program studi
            <span class="font-semibold">
              D3 Kebidanan, S1 Farmasi, dan S1 Gizi
            </span>
            untuk mempersiapkan lulusan yang kompeten dan siap berkontribusi di
            berbagai sektor pelayanan kesehatan.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
