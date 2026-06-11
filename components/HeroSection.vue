<template>
  <section class="relative overflow-hidden bg-slate-950">
    <InteractiveHeroBackground variant="pmb" />

    <div class="relative max-w-6xl px-4 pt-7 pb-8 mx-auto sm:px-6 lg:px-8 lg:py-14">
      <div class="grid items-start gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
        <div ref="copyRef" class="text-white lg:pt-8">
          <p class="inline-flex max-w-full px-3 py-1 text-[11px] font-bold tracking-wide uppercase border rounded-full border-orange-300/40 bg-orange-500/15 text-orange-100">
            PMB Gelombang 3 Dibuka
          </p>

          <h1 class="mt-3 text-[2rem] font-extrabold leading-[1.08] sm:mt-4 sm:text-5xl lg:text-6xl">
            Mulai Kuliah Kesehatan di STIKes Bogor Husada
          </h1>

          <p class="mt-3 text-sm font-medium leading-6 text-slate-200 sm:mt-4 sm:max-w-xl sm:text-lg sm:leading-8">
            Isi data pendaftaran awal sekali saja. Data langsung masuk ke Admin PMB
            dan tim admisi akan membantu follow up pilihan program studi Anda.
          </p>

          <div class="grid gap-2 mt-4 sm:flex sm:flex-wrap sm:gap-3">
            <a
              href="#form-pmb"
              class="inline-flex items-center justify-center px-4 py-3 text-sm font-bold text-white transition bg-orange-600 rounded-lg shadow-lg shadow-orange-950/20 hover:bg-orange-700"
            >
              Daftar Sekarang
            </a>
            <a
              href="https://wa.me/6282321780950?text=Halo+Admin+PMB+STIKes+Bogor+Husada%2C+saya+ingin+konsultasi+pendaftaran."
              target="_blank"
              rel="noopener"
              class="inline-flex items-center justify-center px-4 py-3 text-sm font-bold transition border rounded-lg border-white/25 text-white hover:bg-white/10"
            >
              Chat Admin
            </a>
          </div>

          <div class="grid grid-cols-2 gap-2 mt-4 sm:mt-5 sm:grid-cols-4">
            <div
              v-for="benefit in benefits"
              :key="benefit.text"
              class="flex items-center min-h-[42px] gap-2 px-3 py-2 border rounded-lg border-white/15 bg-white/10 backdrop-blur"
            >
              <component :is="benefit.icon" class="w-4 h-4 text-orange-200 shrink-0" />
              <span class="text-xs font-semibold leading-4 text-white">{{ benefit.text }}</span>
            </div>
          </div>

          <div class="grid grid-cols-3 gap-2 mt-4 sm:mt-5 sm:max-w-lg">
            <div class="px-3 py-2 border rounded-lg border-white/15 bg-white/10 backdrop-blur">
              <p class="text-base font-extrabold text-white sm:text-lg">3</p>
              <p class="text-[11px] leading-4 text-slate-300">Program studi</p>
            </div>
            <div class="px-3 py-2 border rounded-lg border-white/15 bg-white/10 backdrop-blur">
              <p class="text-base font-extrabold text-white sm:text-lg">1x</p>
              <p class="text-[11px] leading-4 text-slate-300">Form ringkas</p>
            </div>
            <div class="px-3 py-2 border rounded-lg border-white/15 bg-white/10 backdrop-blur">
              <p class="text-base font-extrabold text-white sm:text-lg">Admin</p>
              <p class="text-[11px] leading-4 text-slate-300">PMB aktif</p>
            </div>
          </div>
        </div>

        <div id="form-pmb" ref="formRef" class="w-full max-w-xl mx-auto scroll-mt-20 lg:max-w-none">
          <FormulirWaSection lead-category="pmb" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { CheckCircle, Laptop, School, Wallet } from "lucide-vue-next";

const copyRef = ref(null);
const formRef = ref(null);

const benefits = [
  { text: "Gratis Laptop", icon: Laptop },
  { text: "Biaya Kuliah Gel. 2", icon: School },
  { text: "Gratis Uang Gedung", icon: CheckCircle },
  { text: "Free Pendaftaran", icon: Wallet },
];

onMounted(async () => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || !copyRef.value || !formRef.value) return;

  const { gsap } = await import("gsap");
  const copyItems = copyRef.value.querySelectorAll("p, h1, a, .grid > div");

  gsap.from(copyItems, {
    y: 18,
    autoAlpha: 0,
    duration: 0.75,
    stagger: 0.055,
    ease: "power3.out",
  });

  gsap.from(formRef.value, {
    y: 24,
    autoAlpha: 0,
    duration: 0.85,
    delay: 0.18,
    ease: "power3.out",
  });
});
</script>
