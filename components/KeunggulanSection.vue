<template>
  <section class="relative py-12 overflow-hidden bg-slate-950 sm:py-16">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(249,115,22,0.32),transparent_30%),radial-gradient(circle_at_88%_18%,rgba(20,184,166,0.18),transparent_28%)]"></div>
    <div class="relative max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8 text-center sm:mb-10">
        <span class="inline-flex items-center px-3 py-1 mb-3 text-xs font-bold tracking-wide uppercase rounded-full bg-white/10 text-orange-100">
          Kenapa Pilih SBH
        </span>
        <h2 class="text-2xl font-extrabold text-white sm:text-3xl">
          Keunggulan <span class="text-orange-100">SBH</span>
        </h2>
        <p class="max-w-xl mx-auto mt-2 text-sm leading-6 text-slate-300 sm:text-base">
          Alasan tepat memilih STIKes Bogor Husada
        </p>
      </div>

      <!-- Content -->
      <div class="grid items-start gap-5 md:grid-cols-2 md:gap-8">
        <!-- LEFT: Accordion -->
        <div class="space-y-3">
          <div
            v-for="item in items"
            :key="item.key"
            class="overflow-hidden transition border shadow-sm bg-white/95 border-white/10 rounded-xl hover:-translate-y-0.5 hover:shadow-lg"
          >
            <button
              @click="toggle(item.key)"
              class="flex items-center justify-between w-full gap-3 px-4 py-4 text-left"
            >
              <!-- LEFT ICON + TITLE -->
              <div class="flex items-center min-w-0 gap-3">
                <span class="flex items-center justify-center w-10 h-10 rounded-lg bg-orange-100 text-orange-600 shrink-0">
                  <component :is="item.icon" class="w-5 h-5" />
                </span>
                <span class="text-sm font-semibold text-slate-900 sm:text-base">
                  {{ item.title }}
                </span>
              </div>

              <!-- CHEVRON -->
              <ChevronDown
                class="w-5 h-5 text-orange-600 transition-transform shrink-0"
                :class="{ 'rotate-180': active === item.key }"
              />
            </button>

            <!-- Content -->
            <Transition name="accordion">
              <div
                v-show="active === item.key"
                class="px-4 pb-4 text-sm leading-6 text-slate-600"
              >
                {{ item.description }}
              </div>
            </Transition>
          </div>
        </div>

        <!-- RIGHT: Visual panel -->
        <div class="relative overflow-hidden border shadow-xl rounded-xl md:sticky md:top-24 border-white/10 bg-white/10">
          <div class="absolute rounded-full -top-16 -right-16 h-44 w-44 bg-orange-300/20 blur-3xl"></div>
          <div class="absolute rounded-full -bottom-20 -left-12 h-48 w-48 bg-cyan-300/15 blur-3xl"></div>

          <div class="relative p-4 sm:p-6">
            <div class="flex items-start gap-3 p-4 border rounded-lg bg-white/95 border-white/40">
              <span class="flex items-center justify-center w-12 h-12 rounded-lg bg-orange-100 text-orange-600 shrink-0">
                <GraduationCap class="w-6 h-6" />
              </span>
              <div>
                <p class="text-sm font-extrabold text-slate-900 sm:text-base">
                  Ekosistem Belajar Kesehatan
                </p>
                <p class="mt-1 text-xs leading-5 text-slate-600 sm:text-sm">
                  Program akademik, praktik laboratorium, dan pendampingan karier disiapkan dalam satu alur belajar.
                </p>
              </div>
            </div>

            <div class="grid grid-cols-3 gap-2 mt-3">
              <div
                v-for="metric in metrics"
                :key="metric.label"
                class="p-3 text-center border rounded-lg bg-white/90 border-white/40"
              >
                <component :is="metric.icon" class="w-5 h-5 mx-auto text-orange-600" />
                <p class="mt-2 text-lg font-extrabold leading-none text-slate-900">
                  {{ metric.value }}
                </p>
                <p class="mt-1 text-[11px] leading-4 text-slate-500">
                  {{ metric.label }}
                </p>
              </div>
            </div>

            <div class="grid gap-2 mt-3">
              <div
                v-for="proof in proofs"
                :key="proof"
                class="flex items-center gap-3 px-3 py-3 border rounded-lg bg-white/10 border-white/10"
              >
                <CheckCircle2 class="w-4 h-4 text-cyan-200 shrink-0" />
                <span class="text-xs font-semibold leading-5 text-white sm:text-sm">
                  {{ proof }}
                </span>
              </div>
            </div>

            <div class="p-4 mt-3 border rounded-lg bg-slate-950/45 border-white/10">
              <p class="text-xs font-bold tracking-wide uppercase text-orange-100">
                Fokus PMB
              </p>
              <p class="mt-2 text-sm font-semibold leading-6 text-white">
                Calon mahasiswa dibantu memilih program studi, memahami promo gelombang berjalan, dan melengkapi data pendaftaran awal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import {
  Award,
  FlaskConical,
  Users,
  Lightbulb,
  Briefcase,
  ChevronDown,
  CheckCircle2,
  GraduationCap,
} from "lucide-vue-next";

const active = ref(null);

const items = [
  {
    key: "akreditasi",
    title: "Terakreditasi BAN-PT",
    description:
      "Institusi terakreditasi sebagai jaminan mutu pendidikan tinggi.",
    icon: Award,
  },
  {
    key: "praktik",
    title: "Pembelajaran Berbasis Praktik",
    description: "Didukung laboratorium dan praktik lapangan yang aplikatif.",
    icon: FlaskConical,
  },
  {
    key: "dosen",
    title: "Dosen Profesional",
    description: "Pengajar berpengalaman dari kalangan akademisi dan praktisi.",
    icon: Users,
  },
  {
    key: "softskill",
    title: "Soft Skills & Entrepreneurship",
    description: "Pembekalan karakter, komunikasi, dan kewirausahaan.",
    icon: Lightbulb,
  },
  {
    key: "career",
    title: "Career Development Center",
    description: "Pendampingan karier nasional dan internasional.",
    icon: Briefcase,
  },
];

const metrics = [
  { value: "3", label: "Prodi", icon: GraduationCap },
  { value: "Lab", label: "Praktik", icon: FlaskConical },
  { value: "CDC", label: "Karier", icon: Briefcase },
];

const proofs = [
  "Kurikulum diarahkan untuk kebutuhan dunia kesehatan.",
  "Dosen dan praktisi mendampingi proses belajar mahasiswa.",
  "Lingkungan kampus mendukung soft skill dan kesiapan kerja.",
];

function toggle(key) {
  active.value = active.value === key ? null : key;
}
</script>

<style scoped>
.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.25s ease;
}
.accordion-enter-from,
.accordion-leave-to {
  opacity: 0;
  max-height: 0;
}
</style>
