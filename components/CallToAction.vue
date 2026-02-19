<template>
  <section class="py-16 bg-gradient-to-b from-orange-50 to-white">
    <div class="px-6 mx-auto max-w-7xl lg:px-8">
      <div
        class="relative grid gap-8 p-8 overflow-hidden bg-white shadow-lg rounded-2xl md:grid-cols-3"
      >
        <!-- Left: Info -->
        <div class="md:col-span-2">
          <div class="flex items-center gap-3 mb-4">
            <span
              class="inline-block w-1.5 h-6 bg-orange-600 rounded-full"
            ></span>
            <CalendarDays class="w-6 h-6 text-orange-600" />
            <h2 class="text-2xl font-bold text-gray-800">Jadwal Pendaftaran</h2>
          </div>

          <div
            class="inline-flex items-center px-4 py-2 mb-6 text-sm font-semibold text-orange-700 bg-orange-100 border border-orange-200 rounded-full"
          >
            Sedang Dibuka:
            <span class="ml-2 text-orange-600">
              {{ gelombang }}
            </span>
          </div>

          <!-- Dates -->
          <div class="grid gap-6 sm:grid-cols-2">
            <div>
              <p class="text-sm text-gray-500">Mulai</p>
              <p class="mt-1 text-lg font-semibold text-gray-800">
                {{ mulai }}
              </p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Berakhir</p>
              <p class="mt-1 text-lg font-semibold text-gray-800">
                {{ berakhir }}
              </p>
            </div>
          </div>

          >
        </div>
        <!-- Right: CTA -->
        <a
          :href="waLink"
          target="_blank"
          class="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-bold text-white transition bg-gradient-to-br from-green-500 to-green-600 rounded-xl"
        >
          <Icon icon="mdi:whatsapp" class="w-5 h-5 text-white-600" />
          Konsultasi Admin CS
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { CalendarDays } from "lucide-vue-next";
import { Icon } from "@iconify/vue";

defineProps({
  gelombang: {
    type: String,
    default: "Gelombang 1",
  },
  mulai: {
    type: String,
    default: "7 Oktober 2025",
  },
  berakhir: {
    type: String,
    default: "31 Januari 2026",
  },
  infoKelulusan: {
    type: String,
    default: "3–5 Hari Kerja Hasil Kelulusan Secara Online Langsung Diketahui.",
  },
  waLink: {
    type: String,
    default:
      "https://wa.me/6281110111560?text=Halo+Admin+CS+STIKes+Bogor+Husada%2C+saya+ingin+konsultasi+tentang+penerimaan+mahasiswa+baru.",
  },
});
</script>
