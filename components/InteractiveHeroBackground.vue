<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import {
  BookOpenCheck,
  GraduationCap,
  HeartPulse,
  Microscope,
  Pill,
  Sparkles,
} from "lucide-vue-next";

const props = withDefaults(
  defineProps<{
    variant?: "pmb" | "promo";
  }>(),
  {
    variant: "pmb",
  }
);

const root = ref<HTMLElement | null>(null);
const sceneLayer = ref<HTMLElement | null>(null);
const imageLayer = ref<HTMLElement | null>(null);
const glowLayer = ref<HTMLElement | null>(null);
const accentOne = ref<HTMLElement | null>(null);
const accentTwo = ref<HTMLElement | null>(null);
const accentThree = ref<HTMLElement | null>(null);
const iconNodes = ref<HTMLElement[]>([]);

let cleanup: (() => void) | null = null;

const isPromo = computed(() => props.variant === "promo");

const accentClasses = computed(() =>
  isPromo.value
    ? {
        glow: "bg-cyan-300/25",
        ring: "border-cyan-200/35 bg-cyan-300/10",
        chip: "border-cyan-200/30 bg-cyan-200/10",
      }
    : {
        glow: "bg-orange-300/25",
        ring: "border-orange-200/35 bg-orange-300/10",
        chip: "border-orange-200/30 bg-orange-200/10",
      }
);

const floatingIcons = computed(() =>
  isPromo.value
    ? [
        { icon: Sparkles, label: "Beasiswa", class: "left-[7%] top-[18%]" },
        { icon: BookOpenCheck, label: "SNBT", class: "right-[16%] top-[17%]" },
        { icon: GraduationCap, label: "Validasi", class: "left-[46%] bottom-[16%]" },
      ]
    : [
        { icon: HeartPulse, label: "Kesehatan", class: "left-[7%] top-[18%]" },
        { icon: Pill, label: "Farmasi", class: "right-[16%] top-[17%]" },
        { icon: Microscope, label: "Praktikum", class: "left-[46%] bottom-[16%]" },
      ]
);

function setIconNode(el: Element | null, index: number) {
  if (el instanceof HTMLElement) {
    iconNodes.value[index] = el;
  }
}

onMounted(async () => {
  if (!root.value || !sceneLayer.value || !imageLayer.value || !glowLayer.value) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

  const { gsap } = await import("gsap");

  const context = gsap.context(() => {
    gsap.set([sceneLayer.value, imageLayer.value, glowLayer.value, ...iconNodes.value], {
      transformOrigin: "50% 50%",
      willChange: "transform, opacity",
    });

    gsap.fromTo(
      [sceneLayer.value, glowLayer.value, ...iconNodes.value],
      { autoAlpha: 0, scale: 1.08, y: 12 },
      {
        autoAlpha: 1,
        scale: 1,
        y: 0,
        duration: reduceMotion.matches ? 0.2 : 1.15,
        ease: "power3.out",
        stagger: 0.08,
      }
    );

    if (!reduceMotion.matches) {
      gsap.to(imageLayer.value, {
        y: -14,
        scale: 1.035,
        duration: 7,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to([accentOne.value, accentTwo.value, accentThree.value], {
        y: (index) => [-18, 14, -10][index] ?? -12,
        x: (index) => [10, -12, 8][index] ?? 8,
        duration: (index) => [5.5, 6.8, 7.5][index] ?? 6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.25,
      });

      gsap.to(iconNodes.value, {
        y: (index) => [-12, 14, -10][index] ?? -10,
        rotation: (index) => [-4, 5, -3][index] ?? 3,
        duration: (index) => [4.8, 5.6, 6.2][index] ?? 5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.18,
      });
    }
  }, root.value);

  const moveX = gsap.quickTo(sceneLayer.value, "x", {
    duration: 0.7,
    ease: "power3.out",
  });
  const moveY = gsap.quickTo(sceneLayer.value, "y", {
    duration: 0.7,
    ease: "power3.out",
  });
  const glowX = gsap.quickTo(glowLayer.value, "x", {
    duration: 0.9,
    ease: "power3.out",
  });
  const glowY = gsap.quickTo(glowLayer.value, "y", {
    duration: 0.9,
    ease: "power3.out",
  });

  const handlePointerMove = (event: PointerEvent) => {
    if (!root.value || reduceMotion.matches || !finePointer.matches) return;

    const rect = root.value.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    moveX(x * 28);
    moveY(y * 18);
    glowX(x * -18);
    glowY(y * -14);
  };

  const handlePointerLeave = () => {
    moveX(0);
    moveY(0);
    glowX(0);
    glowY(0);
  };

  const handleScroll = () => {
    if (!root.value || reduceMotion.matches) return;

    const rect = root.value.getBoundingClientRect();
    const progress = Math.min(1, Math.max(-1, rect.top / window.innerHeight));
    gsap.to(imageLayer.value, {
      yPercent: progress * 4,
      duration: 0.5,
      overwrite: "auto",
      ease: "power2.out",
    });
  };

  window.addEventListener("pointermove", handlePointerMove, { passive: true });
  root.value.addEventListener("pointerleave", handlePointerLeave, { passive: true });
  window.addEventListener("scroll", handleScroll, { passive: true });

  cleanup = () => {
    context.revert();
    window.removeEventListener("pointermove", handlePointerMove);
    root.value?.removeEventListener("pointerleave", handlePointerLeave);
    window.removeEventListener("scroll", handleScroll);
  };
});

onBeforeUnmount(() => {
  cleanup?.();
});
</script>

<template>
  <div ref="root" class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
    <div ref="sceneLayer" class="absolute inset-[-6%]">
      <img
        ref="imageLayer"
        class="object-cover w-full h-full max-w-none opacity-80"
        src="/img/front-pages/backgrounds/hero-bg.png"
        alt=""
        loading="eager"
        decoding="async"
      />
    </div>

    <div class="absolute inset-0 bg-gradient-to-b from-slate-950/88 via-slate-950/76 to-slate-950"></div>
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(255,255,255,0.18),transparent_28%),radial-gradient(circle_at_82%_20%,rgba(255,255,255,0.08),transparent_24%)]"></div>

    <div
      ref="glowLayer"
      class="absolute rounded-full -top-28 right-[8%] h-72 w-72 blur-3xl sm:h-96 sm:w-96"
      :class="accentClasses.glow"
    ></div>

    <div
      ref="accentOne"
      class="absolute hidden w-24 h-24 border rounded-full left-[7%] top-[18%] sm:block"
      :class="accentClasses.ring"
    ></div>
    <div
      ref="accentTwo"
      class="absolute hidden w-40 h-16 border rounded-lg right-[36%] top-[12%] rotate-6 sm:block"
      :class="accentClasses.chip"
    ></div>
    <div
      ref="accentThree"
      class="absolute hidden w-28 h-28 border rounded-full -right-8 bottom-[18%] sm:block sm:right-[7%]"
      :class="accentClasses.ring"
    ></div>

    <div
      v-for="(item, index) in floatingIcons"
      :key="item.label"
      :ref="(el) => setIconNode(el, index)"
      class="absolute items-center hidden gap-2 px-3 py-2 text-white border rounded-lg opacity-0 shadow-lg sm:flex backdrop-blur-md border-white/15 bg-white/10"
      :class="item.class"
    >
      <span
        class="flex items-center justify-center w-8 h-8 rounded-lg"
        :class="isPromo ? 'bg-cyan-300/20 text-cyan-100' : 'bg-orange-300/20 text-orange-100'"
      >
        <component :is="item.icon" class="w-4 h-4" />
      </span>
      <span class="hidden text-xs font-bold tracking-wide sm:inline">
        {{ item.label }}
      </span>
    </div>
  </div>
</template>
