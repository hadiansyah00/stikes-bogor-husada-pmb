<script setup>
import { ref, onMounted, onUnmounted } from "vue";

/* =========================
   FORM STATE
========================= */
const nama = ref("");
const asalSekolah = ref("");
const minatProdi = ref("");
const noWa = ref("");
const adminWa = "6281110111560";

/* =========================
   TYPING EFFECT (LOOPING)
========================= */
const fullText = "Formulir Pendaftaran";
const typedText = ref("");
const isDeleting = ref(false); // Penanda sedang mengetik atau menghapus
let typingTimeout = null; // Simpan ID timeout untuk dibersihkan

onMounted(() => {
  loopTyping();
});

onUnmounted(() => {
  if (typingTimeout) clearTimeout(typingTimeout);
});

function loopTyping() {
  const currentText = typedText.value;
  let speed = 150; // Kecepatan default mengetik

  if (isDeleting.value) {
    // LOGIKA MENGHAPUS (DELETING)
    typedText.value = fullText.substring(0, currentText.length - 1);
    speed = 100; // Menghapus lebih cepat
  } else {
    // LOGIKA MENGETIK (TYPING)
    typedText.value = fullText.substring(0, currentText.length + 1);
    speed = 150;
  }

  // LOGIKA PERPINDAHAN FASE
  if (!isDeleting.value && typedText.value === fullText) {
    // Jika selesai mengetik, tunggu lama sebelum menghapus
    speed = 2000; // Pause 2 detik
    isDeleting.value = true;
  } else if (isDeleting.value && typedText.value === "") {
    // Jika selesai menghapus, tunggu sebentar sebelum mengetik ulang
    isDeleting.value = false;
    speed = 500; // Pause 0.5 detik
  }

  // Panggil fungsi ini lagi setelah waktu 'speed'
  typingTimeout = setTimeout(loopTyping, speed);
}
/* =========================
   HELPERS
========================= */
function normalizePhone(phone) {
  let clean = phone.replace(/\D/g, "");
  if (clean.startsWith("08")) {
    clean = "628" + clean.slice(2);
  }
  return clean;
}

/* =========================
   SUBMIT
========================= */
function submitToWhatsApp() {
  if (!nama.value || !asalSekolah.value || !minatProdi.value || !noWa.value) {
    alert("Mohon lengkapi seluruh data terlebih dahulu.");
    return;
  }

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
        <p
          class="max-w-xl mx-auto mt-4 text-gray-600"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Silakan lengkapi data berikut untuk mendapatkan informasi pendaftaran
          STIKes Bogor Husada.
        </p>
      </div>

      <div
        class="p-8 bg-white shadow-sm rounded-2xl lg:p-10"
        data-aos="fade-up"
        data-aos-delay="150"
      >
        <form @submit.prevent="submitToWhatsApp" class="space-y-6">
          <div>
            <label class="block mb-1 text-sm font-semibold text-gray-700"
              >Nama Lengkap</label
            >
            <input
              v-model="nama"
              type="text"
              placeholder="Nama lengkap Anda"
              class="w-full px-4 py-3 text-gray-800 transition bg-white border border-gray-300 rounded-xl placeholder:text-gray-400 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          <div>
            <input
              v-model="asalSekolah"
              type="text"
              placeholder="Asal sekolah"
              class="w-full px-4 py-3 text-gray-800 transition bg-white border border-gray-300 rounded-xl placeholder:text-gray-400 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          <div>
            <label class="block mb-1 text-sm font-semibold text-gray-700"
              >Minat Program Studi</label
            >
            <select
              v-model="minatProdi"
              class="w-full px-4 py-3 text-gray-800 transition bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
            >
              <option value="" disabled>-- Pilih Program Studi --</option>
              <option value="D3 Kebidanan (A.Md.Keb)">
                D3 Kebidanan (A.Md.Keb)
              </option>
              <option value="S1 Farmasi (S.Farm)">S1 Farmasi (S.Farm)</option>
              <option value="S1 Farmasi Karyawan (S.Farm)">
                S1 Farmasi Karyawan (S.Farm)
              </option>
              <option value="S1 Gizi (S.Gz)">S1 Gizi (S.Gz)</option>
            </select>
          </div>

          <div>
            <label class="block mb-1 text-sm font-semibold text-gray-700"
              >Nomor WhatsApp Aktif</label
            >
            <input
              v-model="noWa"
              type="tel"
              placeholder="Contoh: 08123456789"
              class="w-full px-4 py-3 text-gray-800 transition bg-white border border-gray-300 rounded-xl placeholder:text-gray-400 focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            class="w-full py-3 font-bold text-white transition bg-orange-500 rounded-xl hover:bg-orange-600"
          >
            Daftar Sekarang
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Animasi cursor kedip-kedip */
.typing-cursor {
  display: inline-block;
  margin-left: 2px;
  animation: blink 1s step-end infinite;
  color: #f97316; /* Warna orange sesuai tema */
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
</style>
