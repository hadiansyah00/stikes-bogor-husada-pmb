export default defineNuxtConfig({
  ssr: true, // atau false jika SPA
  app: {
    baseURL: '/', // jangan diubah kecuali pakai subfolder
  },
  runtimeConfig: {
    public: {
      googleScriptUrl: process.env.GOOGLE_SCRIPT_URL,
      waApiKey: process.env.WA_API_KEY,
      waNumberKey: process.env.WA_NUMBER_KEY
    }
  },
  modules: [
    '@nuxtjs/tailwindcss'
  ]
})