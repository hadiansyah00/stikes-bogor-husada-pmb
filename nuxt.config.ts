export default defineNuxtConfig({
  ssr: true, // Set ke false jika hanya ingin SPA
  app: {
    // Properti baseURL Anda yang sudah ada, JANGAN DIHAPUS
    baseURL: "/",

    // Tambahkan properti 'head' di sini, di dalam 'app'
    head: {
      // ... title, meta, dan link Anda yang lain bisa ditambahkan di sini

      script: [
        {
          innerHTML: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '3852898454807503');
            fbq('track', 'PageView');
          `,
          body: true,
          type: "text/javascript",
          charset: "utf-8",
        },
      ],
      noscript: [
        {
          innerHTML:
            '<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=3852898454807503&ev=PageView&noscript=1" />',
          body: true,
        },
      ],
    },
  },

  runtimeConfig: {
    public: {
      googleScriptUrl: process.env.GOOGLE_SCRIPT_URL || "",
      waApiKey: process.env.WA_API_KEY || "",
      waNumberKey: process.env.WA_NUMBER_KEY || "",
    },
  },

  modules: ["@nuxtjs/tailwindcss"],

  tailwindcss: {
    viewer: false, // Nonaktifkan Tailwind viewer di build
  },

  vite: {
    css: {
      devSourcemap: process.env.NODE_ENV === "development", // Hanya aktif di dev mode
    },
  },

  build: {
    transpile: [], // Jika perlu transpile lib tertentu, masukkan di sini
  },
});
