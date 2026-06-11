export default defineNuxtConfig({
  ssr: true,

  app: {
    baseURL: "/",

    head: {
      script: [
        {
          hid: "meta-pixel",
          innerHTML: `
            !function(f,b,e,v,n,t,s){
              if(f.fbq)return;
              n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;
              n.push=n;
              n.loaded=!0;
              n.version='2.0';
              n.queue=[];
              t=b.createElement(e);
              t.async=!0;
              t.src=v;
              s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)
            }(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${
              process.env.NUXT_PUBLIC_META_PIXEL_ID || "3852898454807503"
            }');
            fbq('track', 'PageView');
          `,
          type: "text/javascript",
        },
      ],

      noscript: [
        {
          innerHTML: `
            <img height="1" width="1" style="display:none"
            src="https://www.facebook.com/tr?id=${
              process.env.NUXT_PUBLIC_META_PIXEL_ID || "3852898454807503"
            }&ev=PageView&noscript=1" />
          `,
        },
      ],
    },
  },

  runtimeConfig: {
    public: {
      metaPixelId: process.env.NUXT_PUBLIC_META_PIXEL_ID,
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || "https://sbh.ac.id",
      imageBaseUrl:
        process.env.NUXT_PUBLIC_IMAGE_BASE_URL || "https://sbh.ac.id",
      API_URL_BASE:
        process.env.NUXT_PUBLIC_PMB_API_BASE_URL ||
        (process.env.NODE_ENV === "development"
          ? "http://127.0.0.1:8001"
          : undefined) ||
        process.env.API_URL_BASE ||
        "https://join.sbh.ac.id",
    },
  },

  modules: ["@nuxtjs/tailwindcss", "@nuxt/image"],

  tailwindcss: {
    viewer: false,
  },

  devServer: {
    port: 3001,
    host: "0.0.0.0",
  },
});
