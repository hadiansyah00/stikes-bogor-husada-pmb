export default defineNuxtConfig({
  ssr: true,

  app: {
    baseURL: "/",

    head: {
      script: [
        {
          hid: "meta-pixel",
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
          type: "text/javascript",
          charset: "utf-8",
        },
      ],

      noscript: [
        {
          hid: "meta-pixel-noscript",
          innerHTML:
            '<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=3852898454807503&ev=PageView&noscript=1" />',
        },
      ],
    },
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || "https://sbh.ac.id",
      imageBaseUrl:
        process.env.NUXT_PUBLIC_IMAGE_BASE_URL || "https://sbh.ac.id",
    },
  },

  modules: ["@nuxtjs/tailwindcss"],

  devServer: {
    port: 3001,
    host: "0.0.0.0",
  },
});
