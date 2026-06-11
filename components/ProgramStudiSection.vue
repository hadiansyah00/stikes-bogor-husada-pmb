<script setup>
import { ArrowRight, Baby, Beaker, Utensils } from "lucide-vue-next";

const title = "Program Studi Kami";
const subtitle =
  "Jelajahi berbagai program studi yang kami tawarkan untuk membantu Anda mencapai tujuan akademik dan profesional.";

const programs = [
  {
    id: "d3-kebidanan",
    name: "D3 Kebidanan",
    degree: "A.Md.Keb",
    description:
      "Berfokus pada pendidikan bidan profesional yang kompeten di bidang kesehatan ibu dan anak.",
    image: "/img/prodi/diploma-kebidanan-stikes-bogor-husada.png",
    link: "https://sbh.ac.id/program-studi-d3-kebidanan",
    icon: Baby,
    accent: "from-pink-500 to-rose-500",
    meta: "Praktik ibu & anak",
  },
  {
    id: "s1-farmasi",
    name: "S1 Farmasi",
    degree: "S.Farm",
    description:
      "Menghasilkan tenaga profesional di bidang farmasi klinis, industri, dan penelitian.",
    image: "/img/prodi/s1-farmasi-stikes-bogor-husada.png",
    link: "https://sbh.ac.id/program-studi-farmasi",
    icon: Beaker,
    accent: "from-orange-500 to-amber-500",
    meta: "Farmasi klinis & industri",
  },
  {
    id: "s1-gizi",
    name: "S1 Gizi",
    degree: "S.Gz",
    description:
      "Mempersiapkan lulusan kompeten dalam pelayanan gizi masyarakat, klinis, dan penelitian.",
    image: "/img/prodi/s1-gizi-stikes-bogor-husada.png",
    link: "https://sbh.ac.id/program-studi-s1-gizi",
    icon: Utensils,
    accent: "from-emerald-500 to-teal-500",
    meta: "Gizi klinis & masyarakat",
  },
];
</script>

<template>
  <section class="py-12 bg-white sm:py-16 lg:py-20">
    <div class="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
      <!-- HEADER -->
      <div class="max-w-2xl mx-auto mb-8 text-center sm:mb-10" data-aos="fade-up">
        <span class="inline-flex items-center px-3 py-1 text-xs font-bold tracking-wide uppercase rounded-full bg-orange-100 text-orange-700">
          Pilih Jalur Karier Kesehatan
        </span>
        <h2 class="text-2xl font-extrabold text-slate-900 sm:text-3xl">
          {{ title }}
        </h2>
        <p class="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
          {{ subtitle }}
        </p>
      </div>

      <!-- CARD GRID -->
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(program, index) in programs"
          :key="program.id"
          class="overflow-hidden transition bg-white border shadow-sm border-slate-200 rounded-xl hover:-translate-y-1 hover:shadow-xl group"
          data-aos="fade-up"
          :data-aos-delay="index * 120"
        >
          <!-- IMAGE -->
          <div class="relative overflow-hidden aspect-[4/3] bg-slate-100">
            <div class="absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-slate-950/40 to-transparent"></div>
            <img
              :src="program.image"
              :alt="program.name"
              class="object-cover w-full h-full transition duration-500 group-hover:scale-105"
            />
            <div
              class="absolute z-20 flex items-center justify-center w-11 h-11 text-white shadow-lg top-4 left-4 rounded-xl bg-gradient-to-br"
              :class="program.accent"
            >
              <component :is="program.icon" class="w-5 h-5" />
            </div>
          </div>

          <!-- CONTENT -->
          <div class="p-4 sm:p-5">
            <div class="flex items-start justify-between gap-3">
              <div>
                <h3 class="text-lg font-bold text-slate-900">
                  {{ program.name }}
                </h3>
                <p class="mt-1 text-xs font-semibold text-slate-500">
                  {{ program.meta }}
                </p>
              </div>
              <span class="px-3 py-1 text-xs font-semibold rounded-full text-slate-700 bg-slate-100">
                {{ program.degree }}
              </span>
            </div>

            <p class="mt-3 text-sm leading-6 text-slate-600">
              {{ program.description }}
            </p>

            <!-- CTA -->
            <a
              :href="program.link"
              target="_blank"
              class="inline-flex items-center justify-center w-full gap-2 px-4 py-2.5 mt-5 text-sm font-bold text-white transition bg-orange-600 rounded-lg sm:w-auto hover:bg-orange-700"
            >
              Selengkapnya
              <ArrowRight class="w-4 h-4 transition group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
