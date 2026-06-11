<template>
  <section class="py-10 bg-white sm:py-14">
    <div class="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
      <div class="relative grid gap-5 p-4 overflow-hidden border shadow-sm rounded-xl border-orange-100 bg-gradient-to-br from-orange-50 via-white to-cyan-50 sm:p-6 md:grid-cols-[1fr_auto] md:items-center">
        <div class="absolute w-32 h-32 rounded-full -right-10 -top-10 bg-orange-200/40 blur-2xl"></div>
        <div class="absolute w-28 h-28 rounded-full -left-10 bottom-0 bg-cyan-200/40 blur-2xl"></div>
        <div>
          <div class="flex items-center gap-2">
            <span class="flex items-center justify-center w-10 h-10 bg-white border border-orange-100 shadow-sm rounded-lg text-orange-600">
              <CalendarDays class="w-5 h-5" />
            </span>
            <div>
              <p class="text-xs font-bold tracking-wide uppercase text-orange-600">
                Jadwal Pendaftaran
              </p>
              <h2 class="text-xl font-extrabold text-slate-900 sm:text-2xl">
                {{ gelombang }}
              </h2>
            </div>
          </div>

          <div class="grid gap-3 mt-5 sm:grid-cols-2">
            <div class="flex items-center gap-3 p-3 bg-white border shadow-sm rounded-lg border-orange-100">
              <span class="flex items-center justify-center w-9 h-9 rounded-lg bg-orange-100 text-orange-600">
                <Clock3 class="w-4 h-4" />
              </span>
              <div>
                <p class="text-xs font-semibold text-slate-500">Mulai</p>
                <p class="mt-1 text-base font-bold text-slate-900">{{ mulai }}</p>
              </div>
            </div>
            <div class="flex items-center gap-3 p-3 bg-white border shadow-sm rounded-lg border-orange-100">
              <span class="flex items-center justify-center w-9 h-9 rounded-lg bg-cyan-100 text-cyan-700">
                <CheckCircle2 class="w-4 h-4" />
              </span>
              <div>
                <p class="text-xs font-semibold text-slate-500">Berakhir</p>
                <p class="mt-1 text-base font-bold text-slate-900">{{ berakhir }}</p>
              </div>
            </div>
          </div>

          <p class="mt-4 text-sm leading-6 text-slate-600">
            {{ infoKelulusan }}
          </p>
        </div>

        <a
          :href="waLink"
          target="_blank"
          rel="noopener"
          class="relative inline-flex items-center justify-center w-full gap-2 px-5 py-3 text-sm font-bold text-white transition bg-green-600 rounded-lg shadow-lg md:w-auto hover:bg-green-700 hover:-translate-y-0.5"
        >
          <Icon icon="mdi:whatsapp" class="w-5 h-5" />
          Konsultasi Admin CS
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { CalendarDays, CheckCircle2, Clock3 } from "lucide-vue-next";
import { Icon } from "@iconify/vue";

defineProps({
  gelombang: {
    type: String,
    default: "Gelombang 3",
  },
  mulai: {
    type: String,
    default: "1 Juni 2026",
  },
  berakhir: {
    type: String,
    default: "30 Juni 2026",
  },
  infoKelulusan: {
    type: String,
    default: "3-5 hari kerja hasil kelulusan dapat dicek secara online.",
  },
  waLink: {
    type: String,
    default:
      "https://wa.me/6281110111560?text=Halo+Admin+CS+STIKes+Bogor+Husada%2C+saya+ingin+konsultasi+tentang+penerimaan+mahasiswa+baru.",
  },
});
</script>
