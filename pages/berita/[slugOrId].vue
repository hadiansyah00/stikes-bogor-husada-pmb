<template>
    <div class="max-w-3xl px-4 py-8 mx-auto">
        <div v-if="loading" class="text-center text-gray-500">Memuat...</div>
        <div v-else-if="error" class="text-center text-red-500">{{ error.message }}</div>
        <article v-else>
            <h1 class="mb-4 text-3xl font-bold text-blue-900">{{ berita.judul }}</h1>
            <p class="mb-2 text-sm text-gray-500">{{ formatDate(berita.tanggal) }}</p>
            <img
                v-if="berita.gambar"
                :src="berita.gambar"
                alt="Gambar Berita"
                class="object-cover w-full h-64 mb-6 rounded-lg"
                loading="lazy"
            />
            <div class="prose max-w-none" v-html="berita.isi"></div>
        </article>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const slugOrId = route.params.slugOrId

const berita = ref({
    id: null,
    judul: '',
    isi: '',
    tanggal: '',
    gambar: null
})
const loading = ref(true)
const error = ref(null)

const config = useRuntimeConfig()

function formatDate(dateStr) {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    return date.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}

async function fetchBerita() {
    loading.value = true
    error.value = null
    try {
        const res = await fetch(`${config.public.API_BASE}/posts?_embed&slug=${slugOrId}`)
        const data = await res.json()
        if (!data.length && /^[0-9]+$/.test(slugOrId)) {
        // jika slug tidak ditemukan tetapi param adalah angka, coba fetch by ID
        const res2 = await fetch(`${config.public.API_BASE}/posts/${slugOrId}?_embed`)
        const single = await res2.json()
        beritaObj = single ? [single] : []
        }

        const item = data[0]
        berita.value = {
            id: item.id,
            judul: item.title?.rendered || '',
            isi: item.content?.rendered || '',
            tanggal: item.date,
            gambar: item._embedded?.['wp:featuredmedia']?.[0]?.source_url || null
        }
    } catch (e) {
        error.value = e
    } finally {
        loading.value = false
    }
}

onMounted(fetchBerita)
</script>