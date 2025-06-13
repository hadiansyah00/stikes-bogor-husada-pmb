export default defineNuxtConfig({
  ssr: true, // Set ke false jika hanya ingin SPA
  app: {
    baseURL: '/', // Ubah jika menggunakan subfolder
  },

  runtimeConfig: {
    public: {
      googleScriptUrl: process.env.GOOGLE_SCRIPT_URL || '',
      waApiKey: process.env.WA_API_KEY || '',
      waNumberKey: process.env.WA_NUMBER_KEY || ''
    }
  },

  modules: [
    '@nuxtjs/tailwindcss'
  ],

  tailwindcss: {
    viewer: false // Nonaktifkan Tailwind viewer di build
  },

  vite: {
    css: {
      devSourcemap: process.env.NODE_ENV === 'development', // Hanya aktif di dev mode
    }
  },

  build: {
    transpile: [] // Jika perlu transpile lib tertentu, masukkan di sini
  }
})
