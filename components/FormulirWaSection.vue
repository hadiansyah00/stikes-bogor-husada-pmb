<script setup lang="ts">
import { computed, reactive } from "vue";
import { usePmbForm } from "@/composables/usePmbForm";

const props = withDefaults(
  defineProps<{
    leadCategory?: "pmb" | "promo_snbt_snbp";
    eyebrow?: string;
    title?: string;
    subtitle?: string;
    buttonLabel?: string;
    termsText?: string;
    successTitle?: string;
    trackingName?: string;
    trackingCategory?: string;
    showProofUpload?: boolean;
    proofLabel?: string;
    proofHelper?: string;
  }>(),
  {
    leadCategory: "pmb",
    eyebrow: "Form Pendaftaran Awal",
    title: "Daftar Sekarang",
    subtitle: "Data langsung masuk ke Admin PMB untuk ditindaklanjuti tim admisi.",
    buttonLabel: "Kirim Data PMB",
    termsText:
      "Saya setuju data ini digunakan untuk proses pendaftaran awal dan follow up PMB.",
    successTitle: "Pendaftaran awal terkirim",
    trackingName: "Landing PMB STIKes Bogor Husada",
    trackingCategory: "PMB",
    showProofUpload: false,
    proofLabel: "Bukti Kartu SNBT/SNBP",
    proofHelper: "Upload kartu SNBT/SNBP dalam format JPG, PNG, WEBP, atau PDF. Maksimal 4 MB.",
  }
);

const jurusanOptions = [
  { id: 1, label: "S1 Farmasi" },
  { id: 7, label: "S1 Farmasi Karyawan" },
  { id: 2, label: "S1 Gizi" },
  { id: 3, label: "D3 Kebidanan" },
];

const kuesionerOptions = [
  { id: 4, label: "Instagram" },
  { id: 5, label: "Website" },
  { id: 6, label: "Facebook" },
  { id: 8, label: "TikTok" },
  { id: 11, label: "Iklan" },
  { id: 13, label: "Flyer" },
  { id: 14, label: "Sosialisasi Sekolah" },
];

const form = reactive({
  name: "",
  phone: "",
  email: "",
  jurusan_id: "",
  kuesioner_id: "",
  proof_file: null as File | null,
  proof_file_name: "",
  terms: false,
});

const localErrors = reactive<Record<string, string>>({});
const { submit, success, isSubmitting, message, errors } = usePmbForm();

const isValidPhone = computed(() =>
  /^(08|628|\+628)\d{8,13}$/.test(form.phone)
);

function handlePhoneInput(e: Event) {
  let value = (e.target as HTMLInputElement).value.replace(/\D/g, "");
  if (value.length > 15) value = value.slice(0, 15);
  form.phone = value;
}

function handleProofFile(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0] || null;

  form.proof_file = file;
  form.proof_file_name = file?.name || "";
}

const firstError = (field: string) =>
  localErrors[field] || errors.value[field]?.[0] || "";

function validateLocal() {
  Object.keys(localErrors).forEach((key) => delete localErrors[key]);

  if (form.name.trim().length < 3) {
    localErrors.name = "Nama lengkap minimal 3 karakter.";
  }

  if (!isValidPhone.value) {
    localErrors.phone = "Nomor WhatsApp diawali 08, 628, atau +628.";
  }

  if (!/^\S+@\S+\.\S+$/.test(form.email)) {
    localErrors.email = "Gunakan email aktif, contoh nama@email.com.";
  }

  if (!form.jurusan_id) {
    localErrors.jurusan_id = "Pilih program studi minat.";
  }

  if (!form.kuesioner_id) {
    localErrors.kuesioner_id = "Pilih sumber informasi.";
  }

  if (props.showProofUpload) {
    if (!form.proof_file) {
      localErrors.proof_file = "Upload bukti kartu SNBT/SNBP untuk klaim tiket beasiswa.";
    } else {
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "application/pdf",
      ];

      if (!allowedTypes.includes(form.proof_file.type)) {
        localErrors.proof_file = "File harus JPG, PNG, WEBP, atau PDF.";
      } else if (form.proof_file.size > 4 * 1024 * 1024) {
        localErrors.proof_file = "Ukuran file maksimal 4 MB.";
      }
    }
  }

  if (!form.terms) {
    localErrors.terms = "Centang persetujuan agar data dapat diproses PMB.";
  }

  return Object.keys(localErrors).length === 0;
}

async function onSubmit() {
  if (isSubmitting.value || !validateLocal()) return;

  const submitted = await submit({
    name: form.name.trim(),
    phone: form.phone,
    email: form.email.trim(),
    lead_category: props.leadCategory,
    jurusan_id: Number(form.jurusan_id),
    kuesioner_id: Number(form.kuesioner_id),
    proof_file: form.proof_file,
    terms: form.terms,
  });

  if (submitted && window.trackFB) {
    window.trackFB("Lead", {
      content_name: props.trackingName,
      content_category: props.trackingCategory,
    });
  }
}
</script>

<template>
  <div class="w-full overflow-hidden bg-white border shadow-2xl border-slate-200 rounded-xl shadow-slate-950/12">
    <div class="px-4 py-3 border-b border-slate-100 bg-gradient-to-br from-white via-slate-50 to-orange-50/60 sm:px-6 sm:py-4">
      <p class="text-[11px] font-bold tracking-wide uppercase text-orange-600">{{ eyebrow }}</p>
      <h2 class="mt-1 text-xl font-extrabold leading-tight text-slate-900 sm:text-2xl">{{ title }}</h2>
      <p class="mt-1 text-sm leading-6 text-slate-600">
        {{ subtitle }}
      </p>
    </div>

    <form v-if="!success" class="p-4 space-y-3 sm:p-6 sm:space-y-4" novalidate @submit.prevent="onSubmit">
      <div>
        <label class="label" for="lead-name">Nama Lengkap</label>
        <input
          id="lead-name"
          v-model="form.name"
          type="text"
          placeholder="Nama sesuai ijazah"
          class="input"
          autocomplete="name"
          :aria-invalid="Boolean(firstError('name'))"
        />
        <p v-if="firstError('name')" class="field-error">{{ firstError("name") }}</p>
      </div>

      <div class="grid gap-3 sm:grid-cols-2">
        <div>
          <label class="label" for="lead-phone">Nomor WhatsApp</label>
          <input
            id="lead-phone"
            v-model="form.phone"
            type="tel"
            inputmode="tel"
            maxlength="15"
            placeholder="08xxxxxxxxxx"
            class="input"
            autocomplete="tel"
            :aria-invalid="Boolean(firstError('phone'))"
            @input="handlePhoneInput"
          />
          <p v-if="firstError('phone')" class="field-error">{{ firstError("phone") }}</p>
        </div>

        <div>
          <label class="label" for="lead-email">Email Aktif</label>
          <input
            id="lead-email"
            v-model="form.email"
            type="email"
            placeholder="nama@email.com"
            class="input"
            autocomplete="email"
            :aria-invalid="Boolean(firstError('email'))"
          />
          <p v-if="firstError('email')" class="field-error">{{ firstError("email") }}</p>
        </div>
      </div>

      <div>
        <label class="label" for="lead-jurusan">Program Studi Minat</label>
        <select
          id="lead-jurusan"
          v-model="form.jurusan_id"
          class="input"
          :aria-invalid="Boolean(firstError('jurusan_id'))"
        >
          <option value="" disabled>Pilih program studi</option>
          <option v-for="item in jurusanOptions" :key="item.id" :value="item.id">
            {{ item.label }}
          </option>
        </select>
        <p v-if="firstError('jurusan_id')" class="field-error">
          {{ firstError("jurusan_id") }}
        </p>
      </div>

      <div>
        <label class="label" for="lead-kuesioner">Sumber Informasi</label>
        <select
          id="lead-kuesioner"
          v-model="form.kuesioner_id"
          class="input"
          :aria-invalid="Boolean(firstError('kuesioner_id'))"
        >
          <option value="" disabled>Pilih sumber informasi</option>
          <option v-for="item in kuesionerOptions" :key="item.id" :value="item.id">
            {{ item.label }}
          </option>
        </select>
        <p v-if="firstError('kuesioner_id')" class="field-error">
          {{ firstError("kuesioner_id") }}
        </p>
      </div>

      <div v-if="showProofUpload">
        <label class="label" for="lead-proof">{{ proofLabel }}</label>
        <label
          for="lead-proof"
          class="flex items-center justify-between gap-3 p-3 transition border border-dashed cursor-pointer rounded-lg border-slate-300 bg-slate-50 hover:border-orange-400 hover:bg-orange-50"
          :class="{ 'border-red-400 bg-red-50': Boolean(firstError('proof_file')) }"
        >
          <span class="min-w-0">
            <span class="block text-sm font-semibold truncate text-slate-800">
              {{ form.proof_file_name || "Pilih file bukti" }}
            </span>
            <span class="block mt-1 text-xs leading-5 text-slate-500">
              {{ proofHelper }}
            </span>
          </span>
          <span class="px-3 py-2 text-xs font-bold text-orange-700 bg-orange-100 rounded-lg shrink-0">
            Upload
          </span>
        </label>
        <input
          id="lead-proof"
          type="file"
          class="sr-only"
          accept=".jpg,.jpeg,.png,.webp,.pdf,image/jpeg,image/png,image/webp,application/pdf"
          :aria-invalid="Boolean(firstError('proof_file'))"
          @change="handleProofFile"
        />
        <p v-if="firstError('proof_file')" class="field-error">
          {{ firstError("proof_file") }}
        </p>
      </div>

      <label class="flex gap-3 p-3 text-sm leading-5 border rounded-lg cursor-pointer border-slate-200 bg-slate-50 text-slate-700">
        <input
          v-model="form.terms"
          type="checkbox"
          class="w-4 h-4 mt-1 text-orange-600 rounded border-slate-300 focus:ring-orange-500"
        />
        <span>
          {{ termsText }}
        </span>
      </label>
      <p v-if="firstError('terms')" class="field-error">{{ firstError("terms") }}</p>

      <div
        v-if="message && !success"
        class="p-3 text-sm border rounded-lg border-red-200 bg-red-50 text-red-700"
      >
        {{ message }}
      </div>

      <div class="sticky bottom-0 z-10 pt-2 pb-1 -mx-4 bg-white border-t border-slate-100 px-4 sm:static sm:mx-0 sm:border-0 sm:p-0">
        <button type="submit" class="btn-primary" :disabled="isSubmitting">
        <span v-if="!isSubmitting">{{ buttonLabel }}</span>
        <span v-else class="flex items-center justify-center gap-2">
          <span class="btn-loader"></span>
          Mengirim data...
        </span>
        </button>
      </div>

      <p class="text-xs leading-5 text-center text-slate-500">
        Data Anda aman dan hanya digunakan oleh tim PMB STIKes Bogor Husada.
      </p>
    </form>

    <div
      v-else
      class="m-4 p-4 text-center border border-green-200 bg-green-50 rounded-xl sm:m-6"
    >
      <h3 class="text-base font-bold text-green-800 sm:text-lg">{{ successTitle }}</h3>
      <p class="mt-2 text-sm leading-6 text-green-700">
        {{ message }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.label {
  display: block;
  margin-bottom: 5px;
  font-size: 12px;
  font-weight: 700;
  color: #374151;
}

.input {
  width: 100%;
  min-height: 46px;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background-color: #ffffff;
  color: #111827;
  font-size: 14px;
}

.input:focus {
  outline: none;
  border-color: #f97316;
  box-shadow: 0 0 0 2px rgba(249, 115, 22, 0.15);
}

.input[aria-invalid="true"] {
  border-color: #ef4444;
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.12);
}

.field-error {
  margin-top: 5px;
  font-size: 12px;
  line-height: 18px;
  color: #dc2626;
}

.btn-primary {
  width: 100%;
  min-height: 48px;
  padding: 13px 16px;
  font-weight: 700;
  color: #ffffff;
  background: linear-gradient(135deg, #ea580c, #f97316);
  border-radius: 8px;
  box-shadow: 0 14px 28px rgba(234, 88, 12, 0.24);
  transition: box-shadow 0.2s ease, transform 0.2s ease, filter 0.2s ease;
}

.btn-primary:hover:not(:disabled) {
  filter: brightness(0.96);
  box-shadow: 0 16px 32px rgba(234, 88, 12, 0.3);
  transform: translateY(-1px);
}

.btn-primary:disabled {
  opacity: 0.6;
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

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>
