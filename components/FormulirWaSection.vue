<script setup>
import { ref, onMounted, onUnmounted } from "vue";
const { $fbTrack } = useNuxtApp();

/* =========================
   FORM STATE
========================= */
const nama = ref("");
const asalSekolah = ref("");
const minatProdi = ref("");
const noWa = ref("");
const adminWa = "6281110111560";
const showSuccess = ref(false);

/* =========================
   TYPING EFFECT
========================= */
const fullText = "Formulir Pendaftaran";
const typedText = ref("");
const isDeleting = ref(false);
let typingTimeout = null;

onMounted(() => loopTyping());
onUnmounted(() => typingTimeout && clearTimeout(typingTimeout));

function loopTyping() {
  const currentText = typedText.value;
  let speed = 150;

  if (isDeleting.value) {
    typedText.value = fullText.substring(0, currentText.length - 1);
    speed = 100;
  } else {
    typedText.value = fullText.substring(0, currentText.length + 1);
  }

  if (!isDeleting.value && typedText.value === fullText) {
    speed = 2000;
    isDeleting.value = true;
  } else if (isDeleting.value && typedText.value === "") {
    isDeleting.value = false;
    speed = 500;
  }

  typingTimeout = setTimeout(loopTyping, speed);
}

/* =========================
   HELPERS
========================= */
function normalizePhone(phone) {
  let clean = phone.replace(/\D/g, "");
  if (clean.startsWith("08")) clean = "628" + clean.slice(2);
  return clean;
}

/* =========================
   SUBMIT FORM (LEAD POINT)
========================= */
function submitForm() {
  if (!nama.value || !asalSekolah.value || !minatProdi.value || !noWa.value) {
    alert("Mohon lengkapi seluruh data terlebih dahulu.");
    return;
  }

  // 🔥 FIRE META LEAD (POINT OF TRUTH)
  $fbTrack("Lead", {
    content_name: "Formulir PMB",
    content_category: "Pendaftaran",
  });

  showSuccess.value = true;
}

/* =========================
   REDIRECT WHATSAPP
========================= */
function goToWhatsApp() {
  const userWa = normalizePhone(noWa.value);

  const message = `Halo Admin STIKes Bogor Husada,

Saya ingin mendaftar PMB dengan data berikut:
Nama Lengkap: ${nama.value}
Asal Sekolah: ${asalSekolah.value}
Minat Program Studi: ${minatProdi.value}
Nomor WhatsApp: ${userWa}

Terima kasih.`;

  const url = `https://wa.me/${adminWa}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}
</script>
<template>
  <section class="py-20 bg-gray-50 lg:py-28">
    <div class="container max-w-4xl px-6 mx-auto lg:px-12">
      <div class="mb-12 text-center">
        <h2 class="text-3xl font-bold text-gray-800 lg:text-4xl">
          {{ typedText }}<span class="typing-cursor">|</span>
        </h2>
        <p class="max-w-xl mx-auto mt-4 text-gray-600">
          Silakan lengkapi data berikut untuk mendapatkan informasi pendaftaran
          STIKes Bogor Husada.
        </p>
      </div>

      <div class="p-8 bg-white shadow-sm rounded-2xl lg:p-10">
        <form
          v-if="!showSuccess"
          @submit.prevent="submitForm"
          class="space-y-6"
        >
          <input v-model="nama" placeholder="Nama lengkap" class="input" />
          <input
            v-model="asalSekolah"
            placeholder="Asal sekolah"
            class="input"
          />

          <select v-model="minatProdi" class="input">
            <option value="" disabled>-- Pilih Program Studi --</option>
            <option>D3 Kebidanan (A.Md.Keb)</option>
            <option>S1 Farmasi (S.Farm)</option>
            <option>S1 Farmasi Karyawan</option>
            <option>S1 Gizi (S.Gz)</option>
          </select>

          <input v-model="noWa" placeholder="08xxxxxxxxxx" class="input" />

          <button type="submit" class="btn-primary">Daftar Sekarang</button>
        </form>

        <!-- SUCCESS STATE -->
        <div
          v-else
          class="p-6 mt-4 text-center border border-green-200 bg-green-50 rounded-xl"
        >
          <h3 class="text-lg font-bold text-green-700">Pendaftaran Berhasil</h3>
          <p class="mt-2 text-sm text-green-600">
            Data Anda telah kami terima. Silakan lanjutkan ke WhatsApp.
          </p>

          <button
            class="px-6 py-3 mt-4 font-bold text-white bg-green-600 rounded-xl hover:bg-green-700"
            @click="goToWhatsApp"
          >
            Lanjut ke WhatsApp
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.input {
  width: 100%;
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  background-color: #ffffff;
  color: #111827; /* ⬅️ INI KUNCI */
}

.btn-primary {
  width: 100%;
  padding: 12px;
  font-weight: bold;
  color: white;
  background: #f97316;
  border-radius: 12px;
}
.typing-cursor {
  animation: blink 1s infinite;
  color: #f97316;
}
@keyframes blink {
  50% {
    opacity: 0;
  }
}
</style>
