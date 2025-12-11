import { EmailTemplate } from "@/app/_components/email-template";
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactPayload {
  emailId: string;
  message: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = (await req.json()) as ContactPayload;

    // Validate fields
    if (!body?.emailId || !body?.message) {
      return NextResponse.json(
        { error: "emailId and message are required" },
        { status: 400 }
      );
    }

    const { emailId, message } = body;

    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: "sahilbhaisharma1212@gmail.com",
      subject: "Portfolio Contact Message",
      react: EmailTemplate({ emailId, message }),
    });

    if (error) {
      return NextResponse.json(
        { error: error.message ?? "Failed to send email" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      {
        error:
          err instanceof Error
            ? err.message
            : "Unknown server error",
      },
      { status: 500 }
    );
  }
}
