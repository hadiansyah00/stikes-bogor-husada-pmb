<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";

const { $fbTrack } = useNuxtApp();
const config = useRuntimeConfig();

/* =========================
   FORM STATE
========================= */
const nama = ref("");
const asalSekolah = ref("");
const minatProdi = ref("");
const noWa = ref("");
const adminWa = "6281110111560";
const showSuccess = ref(false);
const isSubmitting = ref(false); // ⬅️ INI KUNCI

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

function handlePhoneInput(e) {
  let value = e.target.value.replace(/\D/g, "");
  if (value.length > 12) value = value.slice(0, 12);
  noWa.value = value;
}

/* =========================
   SUBMIT FORM
========================= */
async function submitForm() {
  if (!nama.value || !asalSekolah.value || !minatProdi.value || !noWa.value) {
    alert("Mohon lengkapi seluruh data terlebih dahulu.");
    return;
  }

  if (!/^08\d{9,10}$/.test(noWa.value)) {
    alert("Nomor WhatsApp harus 11–12 digit dan diawali 08.");
    return;
  }

  isSubmitting.value = true;

  try {
    $fbTrack("Lead", {
      content_name: "Formulir PMB",
      content_category: "Pendaftaran",
    });

    await $fetch(`${config.public.apiBaseUrl}/api/lead`, {
      method: "POST",
      body: {
        nama: nama.value,
        asalSekolah: asalSekolah.value,
        minatProdi: minatProdi.value,
        noWa: noWa.value,
        source: "Landing PMB",
      },
    });

    $fbTrack("CompleteRegistration", {
      content_name: "PMB SBH",
    });

    showSuccess.value = true;
  } catch (err) {
    alert("Terjadi kesalahan, silakan coba kembali.");
  } finally {
    isSubmitting.value = false;
  }
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

/* =========================
   AUTO REDIRECT
========================= */
const redirectDelay = 2000;

watch(showSuccess, (val) => {
  if (val) {
    setTimeout(goToWhatsApp, redirectDelay);
  }
});
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

          <input
            v-model="noWa"
            type="tel"
            inputmode="numeric"
            pattern="[0-9]*"
            maxlength="12"
            placeholder="08xxxxxxxxxx"
            class="input"
            @input="handlePhoneInput"
          />

          <button
            type="submit"
            class="flex items-center justify-center gap-2 btn-primary"
            :disabled="isSubmitting"
          >
            <span v-if="!isSubmitting">Daftar Sekarang</span>

            <span v-else class="flex items-center gap-2">
              <span class="btn-loader"></span>
              Memproses...
            </span>
          </button>
        </form>

        <!-- SUCCESS STATE -->
        <div
          v-else
          class="p-6 mt-4 text-center border border-green-200 bg-green-50 rounded-xl"
        >
          <h3 class="text-lg font-bold text-green-700">Pendaftaran Berhasil</h3>

          <p class="mt-2 text-sm text-green-600">
            Data Anda telah kami terima.
          </p>

          <!-- LOADING -->
          <div class="flex justify-center mt-4">
            <span class="loader"></span>
          </div>

          <p class="mt-3 text-xs text-green-500">
            Mengalihkan ke WhatsApp dalam 2 detik...
          </p>

          <!-- FALLBACK -->
          <button
            class="px-6 py-3 mt-4 font-bold text-white bg-green-600 rounded-xl hover:bg-green-700"
            @click="goToWhatsApp"
          >
            Lanjut Sekarang
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
.loader {
  width: 36px;
  height: 36px;
  border: 4px solid #bbf7d0;
  border-top: 4px solid #16a34a;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-loader {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.6);
  border-top: 2px solid #ffffff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
</style>
