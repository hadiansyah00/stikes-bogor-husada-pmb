<template>
  <section class="py-16 bg-orange-50">
    <div class="container max-w-xl px-4 mx-auto">
      <h2 class="mb-8 text-3xl font-bold text-center text-gray-800">Formulir Pendaftaran Beasiswa SNBT</h2>
      
      <form @submit.prevent="handleSubmit" class="p-8 space-y-6 bg-gray-100 border border-orange-200 shadow-md rounded-xl">
        
        <!-- Nama Lengkap -->
        <div>
          <label class="block mb-2 font-medium text-orange-700">Nama Lengkap</label>
          <input v-model="form.nama" type="text" class="w-full px-4 py-2 text-orange-600 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400" required />
        </div>

        <!-- Kelas -->
        <div>
          <label class="block mb-2 font-medium text-orange-700">Kelas</label>
          <input v-model="form.kelas" type="text" class="w-full px-4 py-2 text-orange-600 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400" required />
        </div>

        <!-- Asal Sekolah -->
        <div>
          <label class="block mb-2 font-medium text-orange-700">Asal Sekolah</label>
          <input v-model="form.asalSekolah" type="text" class="w-full px-4 py-2 text-orange-600 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400" required />
        </div>

        <!-- No Whatsapp -->
        <div>
          <label class="block mb-2 font-medium text-orange-700">No WhatsApp</label>
          <input v-model="form.whatsapp" type="tel" class="w-full px-4 py-2 text-orange-600 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400" required />
        </div>

        <!-- Minat Program Studi -->
        <div>
          <label class="block mb-2 font-medium text-orange-700">Minat Program Studi</label>
          <select v-model="form.programStudi" class="w-full px-2 py-1 text-sm text-orange-600 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400" required>
            <option value="" disabled>Pilih Program Studi</option>
            <option value="D3 Kebidanan">D3 Kebidanan</option>
            <option value="S1 Farmasi">S1 Farmasi</option>
            <option value="S1 Farmasi Kelas Karyawan">S1 Farmasi Kelas Karyawan</option>
            <option value="S1 Gizi">S1 Gizi</option>
          </select>
        </div>

        <!-- Tombol Submit -->
        <div class="text-center">
          <button type="submit" class="px-6 py-2 font-semibold text-white transition bg-orange-500 rounded-md hover:bg-orange-600">
            Daftar Sekarang
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  nama: '',
  kelas: '',
  asalSekolah: '',
  whatsapp: '',
  programStudi: ''
})

const handleSubmit = async () => {
  try {
    const response = await $fetch('/api/form', {
      method: 'POST',
      body: form
    });

    alert('Formulir berhasil dikirim!');
    console.log('Response:', response);

    // Reset form
    form.nama = '';
    form.kelas = '';
    form.asalSekolah = '';
    form.whatsapp = '';
    form.programStudi = '';
  } catch (error) {
    console.error('Gagal mengirim:', error);
    alert('Terjadi kesalahan saat mengirim formulir.');
  }
}
</script>
