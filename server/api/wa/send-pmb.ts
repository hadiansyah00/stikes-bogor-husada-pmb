import { sendWablasMessage } from "@/server/utils/wablas";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { nama, asalSekolah, minatProdi, noWa } = body;

  if (!nama || !asalSekolah || !minatProdi || !noWa) {
    throw createError({
      statusCode: 400,
      statusMessage: "Data tidak lengkap",
    });
  }

  const config = useRuntimeConfig();

  const adminWa = config.WABLAS_ADMIN_WA;

  // Pesan ke ADMIN
  const adminMessage = `📌 PENDAFTARAN PMB SBH

Nama Lengkap : ${nama}
Asal Sekolah : ${asalSekolah}
Minat Prodi  : ${minatProdi}
No WhatsApp  : ${noWa}

📅 Sumber: Landing PMB
🌐 STIKes Bogor Husada`;

  await sendWablasMessage(adminWa, adminMessage);

  // Pesan AUTO-REPLY ke USER
  const userMessage = `Halo ${nama} 👋

Terima kasih telah mendaftar di STIKes Bogor Husada.
Tim PMB kami akan menghubungi Anda maksimal 1x24 jam.

🙏`;

  await sendWablasMessage(noWa, userMessage);

  return {
    success: true,
  };
});
