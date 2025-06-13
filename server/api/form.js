export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        console.log('Data masuk:', body);

        const config = useRuntimeConfig();

        // Kirim ke Google Script
        const googleRes = await $fetch(config.public.googleScriptUrl, {
            method: 'POST',
            body,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Pesan WhatsApp rapi
        const pesan = `
Halo ${body.nama},

Terima kasih telah mendaftar Beasiswa SNBT melalui formulir kami.

📚 *Minat Prodi:* ${body.programStudi}
🏫 *Asal Sekolah:* ${body.asalSekolah}
📱 *Nomor WhatsApp:* ${body.whatsapp}

Kami akan segera menghubungi Anda untuk informasi lebih lanjut.

- ICT STIKes Bogor Husada
        `;

        const waPayload = {
            api_key: config.public.waApiKey,
            number_key: config.public.waNumberKey,
            phone_no: body.whatsapp,
            message: pesan,
            wait_until_send: "1"
        };

        // Kirim ke WA Gateway
        const waRes = await $fetch('https://api.watzap.id/v1/send_message', {
            method: 'POST',
            body: waPayload,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return {
            message: 'Data berhasil dikirim ke Google Script & WhatsApp',
            googleRes,
            waRes
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            message: 'Terjadi kesalahan saat mengirim data',
            error: error.message || error
        };
    }
});
