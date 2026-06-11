type LandingLeadPayload = {
  name: string;
  phone: string;
  email: string;
  lead_category: "pmb" | "promo_snbt_snbp";
  jurusan_id: number | string;
  kuesioner_id: number | string;
  proof_file?: File | null;
  terms: boolean;
};

type ValidationErrors = Record<string, string[]>;

export function usePmbForm() {
  const isSubmitting = ref(false);
  const success = ref(false);
  const message = ref("");
  const errors = ref<ValidationErrors>({});

  async function submit(data: LandingLeadPayload) {
    if (isSubmitting.value) return false;

    isSubmitting.value = true;
    success.value = false;
    message.value = "";
    errors.value = {};

    try {
      const config = useRuntimeConfig();
      const apiBase = String(config.public.API_URL_BASE || "").replace(/\/$/, "");
      const body = new FormData();

      body.append("name", data.name);
      body.append("phone", data.phone);
      body.append("email", data.email);
      body.append("lead_category", data.lead_category);
      body.append("jurusan_id", String(data.jurusan_id));
      body.append("kuesioner_id", String(data.kuesioner_id));
      body.append("terms", data.terms ? "1" : "0");

      if (data.proof_file) {
        body.append("proof_file", data.proof_file);
      }

      await $fetch(`${apiBase}/api/pmb/landing-leads`, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body,
      });

      success.value = true;
      message.value =
        "Data pendaftaran awal berhasil dikirim. Tim PMB akan menghubungi Anda.";
      return true;
    } catch (error: any) {
      const data = error?.data || {};
      const statusCode = error?.statusCode || error?.response?.status;

      errors.value = data.errors || {};

      if (data.message) {
        message.value = data.message;
      } else if (statusCode === 404) {
        message.value =
          "Endpoint API PMB tidak ditemukan. Periksa konfigurasi NUXT_PUBLIC_PMB_API_BASE_URL.";
      } else if (statusCode === 0 || error?.message?.includes("fetch")) {
        message.value =
          "API PMB tidak dapat dihubungi. Periksa koneksi, CORS, atau alamat backend PMB.";
      } else {
        message.value =
          "Data belum berhasil dikirim. Periksa kembali isian formulir Anda.";
      }

      if (process.dev) {
        console.error("[PMB Lead] Submit failed", {
          statusCode,
          message: error?.message,
          data,
        });
      }

      return false;
    } finally {
      isSubmitting.value = false;
    }
  }

  return {
    submit,
    success,
    isSubmitting,
    message,
    errors,
  };
}
