type LandingVideoResponse = {
  data: Array<{
    id: number;
    youtube_video_id: string;
    title: string;
    thumbnail_url: string;
    embed_url: string;
    sort_order: number;
  }>;
};

export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const apiBase = String(config.public.API_URL_BASE || "").replace(/\/$/, "");

  if (!apiBase) {
    return { data: [] };
  }

  try {
    return await $fetch<LandingVideoResponse>(`${apiBase}/api/landing-videos`, {
      headers: {
        Accept: "application/json",
      },
      timeout: 5000,
    });
  } catch (error) {
    console.error("[Landing Videos] Failed to fetch videos", error);

    return { data: [] };
  }
});
