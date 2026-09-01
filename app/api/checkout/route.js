import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const body = await request.json();
    const { formType, formData, text } = body;
    
    // Ambil email dari formData
    const clientEmail = formData?.email;

    if (!clientEmail) {
      return NextResponse.json({ error: "Email client tidak ditemukan di dalam form" }, { status: 400 });
    }

    // Konfigurasi transporter Nodemailer menggunakan SMTP Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // e.g., ddhykaa@gmail.com
        pass: process.env.GMAIL_APP_PASSWORD, // App Password dari akun Google
      },
    });

    // Opsi Email yang akan dikirim ke Client (dan BCC ke Admin)
    const mailOptions = {
      from: `"Shotnesia" <${process.env.GMAIL_USER}>`, // Akan terlihat dikirim dari Gmail Anda
      to: clientEmail, // Dikirim ke alamat email client
      bcc: process.env.GMAIL_USER, // Tembusan (BCC) ke email admin agar admin punya salinan
      subject: `Terima Kasih! Konfirmasi Pesanan - ${formType}`,
      text: `Halo ${formData?.fullName || 'Kak'},\n\nTerima kasih telah melakukan pemesanan di Shotnesia. Berikut adalah rincian form yang baru saja Anda isi:\n\n${text}\n\nKami telah menerima pesanan Anda dan akan segera membalas pesan WhatsApp Anda untuk konfirmasi lebih lanjut.\n\nSalam Hangat,\nTim Shotnesia`,
      html: `<div style="font-family: sans-serif; color: #333; max-width: 600px; margin: auto;">
        <h2 style="color: #11223f;">Halo ${formData?.fullName || 'Kak'},</h2>
        <p>Terima kasih telah melakukan pemesanan di Shotnesia. Berikut adalah rincian form yang baru saja Anda isi:</p>
        <div style="background-color: #faf8f5; padding: 20px; border-left: 4px solid #c8a97e; border-radius: 4px; margin: 20px 0;">
          <p style="white-space: pre-wrap; margin: 0;">${text}</p>
        </div>
        <p>Kami telah menerima pesanan Anda (melalui sistem & WhatsApp) dan akan segera menindaklanjutinya.</p>
        <p>Salam Hangat,<br/><strong>Tim Shotnesia</strong></p>
      </div>`
    };

    // Kirim email
    const info = await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error("Nodemailer Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
