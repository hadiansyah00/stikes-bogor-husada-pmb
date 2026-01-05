export default defineNuxtPlugin(() => {
  if (typeof window === "undefined") return;

  // Pastikan fbq sudah tersedia
  const fbq = (window as any).fbq;
  if (!fbq) return;

  /**
   * Global helper untuk Meta Pixel
   */
  window.trackFB = (event: string, params: Record<string, any> = {}) => {
    try {
      fbq("track", event, params);
    } catch (err) {
      if (import.meta.dev) {
        console.warn("[MetaPixel]", err);
      }
    }
  };
});
