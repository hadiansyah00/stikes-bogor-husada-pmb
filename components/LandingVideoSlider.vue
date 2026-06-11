<script setup lang="ts">
import { computed, ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-vue-next";

import "swiper/css";
import "swiper/css/navigation";

type LandingVideo = {
  id: number;
  youtube_video_id: string;
  title: string;
  thumbnail_url: string;
  embed_url: string;
  sort_order: number;
};

const activeVideoId = ref<number | null>(null);
const swiperModules = [Navigation];

const { data } = await useFetch<{ data: LandingVideo[] }>(
  "/api/landing-videos",
  {
    headers: {
      Accept: "application/json",
    },
    default: () => ({ data: [] }),
  },
);

const videos = computed(() => data.value?.data ?? []);

function toggleVideo(video: LandingVideo) {
  activeVideoId.value = activeVideoId.value === video.id ? null : video.id;
}

function embedSrc(video: LandingVideo) {
  const params = new URLSearchParams({
    autoplay: "1",
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
  });

  return `${video.embed_url}?${params.toString()}`;
}
</script>

<template>
  <section
    v-if="videos.length"
    class="py-8 overflow-hidden bg-slate-50 sm:py-14 video-section"
  >
    <div class="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8 video-shell">
      <div class="video-mobile-track lg:hidden" aria-label="Video PMB">
        <article
          v-for="video in videos"
          :key="`mobile-${video.id}`"
          class="overflow-hidden bg-white border shadow-sm rounded-2xl border-slate-200 video-card video-mobile-card"
        >
          <div
            class="relative w-full mx-auto bg-black aspect-[9/16] video-frame"
          >
            <iframe
              v-if="activeVideoId === video.id"
              class="absolute inset-0 w-full h-full"
              :src="embedSrc(video)"
              :title="video.title"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowfullscreen
            />

            <img
              v-else
              :src="video.thumbnail_url"
              :alt="video.title"
              class="absolute inset-0 object-cover w-full h-full"
              loading="lazy"
            />

            <div
              class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10"
            />

            <button
              type="button"
              class="absolute z-20 flex items-center justify-center text-white transition-all duration-300 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-lg w-14 h-14 left-1/2 top-1/2 bg-white/20 backdrop-blur-md hover:scale-110 video-play-button"
              :aria-label="
                activeVideoId === video.id ? 'Pause video' : 'Play video'
              "
              @click="toggleVideo(video)"
            >
              <Pause v-if="activeVideoId === video.id" class="w-6 h-6" />

              <Play v-else class="w-6 h-6 ml-1" />
            </button>
          </div>
        </article>
      </div>

      <Swiper
        :modules="swiperModules"
        :loop="videos.length > 1"
        :navigation="{
          prevEl: '.landing-video-prev',
          nextEl: '.landing-video-next',
        }"
        :space-between="16"
        :breakpoints="{
          0: {
            slidesPerView: 1,
            centeredSlides: true,
            spaceBetween: 12,
          },
          640: {
            slidesPerView: 2,
            centeredSlides: false,
            spaceBetween: 16,
          },
          1024: {
            slidesPerView: 3,
            centeredSlides: false,
            spaceBetween: 24,
          },
          1280: {
            slidesPerView: 4,
            centeredSlides: false,
            spaceBetween: 24,
          },
        }"
        class="hidden video-swiper lg:block"
      >
        <SwiperSlide v-for="video in videos" :key="video.id">
          <article
            class="overflow-hidden bg-white border shadow-sm rounded-2xl border-slate-200 video-card"
          >
            <div
              class="relative w-full mx-auto bg-black aspect-[9/16] max-w-[320px] sm:max-w-none video-frame"
            >
              <iframe
                v-if="activeVideoId === video.id"
                class="absolute inset-0 w-full h-full"
                :src="embedSrc(video)"
                :title="video.title"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowfullscreen
              />

              <img
                v-else
                :src="video.thumbnail_url"
                :alt="video.title"
                class="absolute inset-0 object-cover w-full h-full"
                loading="lazy"
              />

              <div
                class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10"
              />

              <button
                type="button"
                class="absolute z-20 flex items-center justify-center text-white transition-all duration-300 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-lg w-14 h-14 left-1/2 top-1/2 bg-white/20 backdrop-blur-md hover:scale-110 video-play-button"
                :aria-label="
                  activeVideoId === video.id ? 'Pause video' : 'Play video'
                "
                @click="toggleVideo(video)"
              >
                <Pause v-if="activeVideoId === video.id" class="w-6 h-6" />

                <Play v-else class="w-6 h-6 ml-1" />
              </button>
            </div>
          </article>
        </SwiperSlide>
      </Swiper>

      <button
        v-if="videos.length > 3"
        type="button"
        class="hidden landing-video-nav landing-video-prev"
        aria-label="Video sebelumnya"
      >
        <ChevronLeft class="w-6 h-6" aria-hidden="true" />
      </button>
      <button
        v-if="videos.length > 3"
        type="button"
        class="hidden landing-video-nav landing-video-next"
        aria-label="Video berikutnya"
      >
        <ChevronRight class="w-6 h-6" aria-hidden="true" />
      </button>
    </div>
  </section>
</template>

<style scoped>
.video-swiper {
  overflow: visible;
}

.video-frame {
  aspect-ratio: 9 / 16;
}

.video-mobile-track {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(238px, 78vw);
  gap: 0.875rem;
  padding: 0.25rem 1rem 0.75rem;
  margin-right: -1rem;
  margin-left: -1rem;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scroll-padding-inline: 1rem;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
}

.video-mobile-track::-webkit-scrollbar {
  display: none;
}

.video-mobile-card {
  width: 100%;
  max-width: 320px;
  scroll-snap-align: center;
}

:deep(.swiper-slide) {
  height: auto;
}

@media (max-width: 640px) {
  :deep(.swiper-slide) {
    display: flex;
    justify-content: center;
  }
}

@media (min-width: 1024px) {
  .video-section {
    padding-top: 5rem;
    padding-bottom: 5rem;
  }

  .video-shell {
    position: relative;
    max-width: 1180px;
    padding-left: 3.25rem;
    padding-right: 3.25rem;
  }

  .video-swiper {
    padding: 0.75rem 0.25rem 1.25rem;
  }

  :deep(.swiper-wrapper) {
    align-items: stretch;
  }

  :deep(.swiper-slide) {
    display: flex;
    height: auto;
  }

  .video-card {
    width: 100%;
    border-radius: 1rem;
    box-shadow: 0 18px 42px rgba(15, 23, 42, 0.1);
    transition:
      transform 220ms ease,
      box-shadow 220ms ease,
      border-color 220ms ease;
  }

  .video-card:hover {
    transform: translateY(-6px);
    border-color: rgba(245, 158, 11, 0.42);
    box-shadow: 0 26px 56px rgba(15, 23, 42, 0.16);
  }

  .video-frame {
    max-width: none;
    min-height: 440px;
    max-height: 520px;
  }

  .video-play-button {
    width: 4.25rem;
    height: 4.25rem;
    background: rgba(15, 23, 42, 0.36);
    border: 1px solid rgba(255, 255, 255, 0.42);
    box-shadow: 0 18px 38px rgba(15, 23, 42, 0.28);
  }

  .video-play-button:hover {
    background: rgba(245, 158, 11, 0.92);
    transform: translate(-50%, -50%) scale(1.07);
  }

  .landing-video-nav {
    position: absolute;
    top: 50%;
    z-index: 10;
    display: grid;
    place-items: center;
    width: 44px;
    height: 44px;
    padding: 0;
    color: #0f172a;
    background: rgba(255, 255, 255, 0.92);
    border: 1px solid rgba(148, 163, 184, 0.36);
    border-radius: 999px;
    box-shadow: 0 16px 34px rgba(15, 23, 42, 0.14);
    transform: translateY(-50%);
    transition:
      transform 180ms ease,
      background-color 180ms ease,
      color 180ms ease,
      box-shadow 180ms ease;
  }

  .landing-video-nav:hover {
    color: #fff;
    background: #f59e0b;
    box-shadow: 0 18px 38px rgba(245, 158, 11, 0.3);
    transform: translateY(-50%) scale(1.04);
  }

  .landing-video-prev {
    left: 0.75rem;
  }

  .landing-video-next {
    right: 0.75rem;
  }
}

@media (min-width: 1536px) {
  .video-shell {
    max-width: 1260px;
  }

  .video-frame {
    min-height: 480px;
    max-height: 560px;
  }
}
</style>
