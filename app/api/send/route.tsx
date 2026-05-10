import { ContactEmail } from '../../_components/ContactEmail';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email, message } = await req.json();

    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['sahilbhaisharma1212@gmail.com'],
      subject: 'New Portfolio Inquiry',
      react: <ContactEmail email={email} message={message} />,
    });

    if (error) {
      console.log(error, "");
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.log(error, "here");
    return NextResponse.json({ error }, { status: 500 });
  }
}
