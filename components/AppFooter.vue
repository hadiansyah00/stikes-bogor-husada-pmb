<template>
  <footer class="text-white bg-slate-950">
    <div class="max-w-6xl px-4 py-10 mx-auto sm:px-6 lg:px-8">
      <div class="grid gap-8 lg:grid-cols-[1.1fr_1.4fr]">
        <div>
          <div class="inline-flex items-center gap-3 p-3 bg-white rounded-lg">
            <img
              class="w-auto h-10"
              src="/img/logo/logo_sbh_panjang.png"
              alt="Logo STIKes Bogor Husada"
            />
          </div>
          <p class="max-w-md mt-4 text-sm leading-6 text-slate-300">
            STIKes Bogor Husada merupakan institusi pendidikan tinggi kesehatan
            yang mencetak tenaga kesehatan profesional, berkarakter, dan siap bersaing.
          </p>
        </div>

        <div class="grid gap-8 sm:grid-cols-2">
          <div>
            <h3 class="text-sm font-bold tracking-wide uppercase text-slate-100">
              Hubungi Kami
            </h3>
            <ul class="mt-4 space-y-3 text-sm leading-6 text-slate-300">
              <li class="flex gap-3">
                <MapPin class="w-5 h-5 mt-0.5 text-orange-300 shrink-0" />
                <span>
                  Jl. Soleh Iskandar No.4, Kedungbadak, Tanah Sereal, Kota Bogor
                </span>
              </li>
              <li class="flex gap-3">
                <Mail class="w-5 h-5 mt-0.5 text-orange-300 shrink-0" />
                <a href="mailto:admisi@sbh.ac.id" class="break-all hover:text-white">
                  admisi@sbh.ac.id
                </a>
              </li>
              <li class="flex gap-3">
                <Phone class="w-5 h-5 mt-0.5 text-orange-300 shrink-0" />
                <span>(0251) 8576152</span>
              </li>
              <li class="flex gap-3">
                <MessageCircle class="w-5 h-5 mt-0.5 text-orange-300 shrink-0" />
                <div class="space-y-1">
                  <a
                    href="https://wa.me/6281110111560"
                    target="_blank"
                    rel="noopener"
                    class="block hover:text-white"
                  >
                    Admin 1: 0811-1011-1560
                  </a>
                  <a
                    href="https://wa.me/6282321780950"
                    target="_blank"
                    rel="noopener"
                    class="block hover:text-white"
                  >
                    Admin 2: 0823-2178-0950
                  </a>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="text-sm font-bold tracking-wide uppercase text-slate-100">
              Navigasi
            </h3>
            <ul class="mt-4 space-y-3 text-sm text-slate-300">
              <li>
                <a
                  href="https://sbh.ac.id"
                  class="hover:text-white"
                  target="_blank"
                  rel="noopener"
                >
                  Informasi STIKes Bogor Husada
                </a>
              </li>
              <li>
                <a
                  href="https://pmb.sbh.ac.id"
                  class="hover:text-white"
                  target="_blank"
                  rel="noopener"
                >
                  Informasi PMB STIKes Bogor Husada
                </a>
              </li>
            </ul>

            <div class="flex gap-3 mt-6">
              <a
                v-for="item in socials"
                :key="item.label"
                :href="item.href"
                target="_blank"
                rel="noopener"
                :aria-label="item.label"
                class="inline-flex items-center justify-center w-10 h-10 transition rounded-lg bg-white/10 text-slate-200 hover:bg-white/15 hover:text-white"
              >
                <Icon :icon="item.icon" class="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="pt-6 mt-8 border-t border-white/10">
        <p class="text-xs text-center text-slate-400">
          &copy; 2025 STIKes Bogor Husada. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-vue-next";

const socials = [
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@stikesbogorhusada",
    icon: "mdi:tiktok",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/stikesbogorhusada/?hl=id",
    icon: "mdi:instagram",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCLVS17eZrNYWgiAuMCYkkXA",
    icon: "mdi:youtube",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/stikesboda/?locale=id_ID",
    icon: "mdi:facebook",
  },
];
</script>
