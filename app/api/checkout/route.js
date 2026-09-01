import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { formType, text } = body;

    const { data, error } = await resend.emails.send({
      from: 'Shotnesia <onboarding@resend.dev>', // Menggunakan default Resend domain untuk testing
      to: ['ddhykaa@gmail.com'],
      subject: `New Order from Shotnesia - ${formType}`,
      text: text, // Isi text sama dengan pesan WhatsApp
      html: `<p style="white-space: pre-wrap;">${text}</p>`
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
