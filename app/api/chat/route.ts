import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `
Here is who I am (use this for context every time):

- My name is Sahil Sharma.
- I am a 4th-year Computer Science Engineering student.
- I know MERN, Next.js, UI/UX, and content creation.
- I like memes (high-level thug hood irony).
- I want to master coding + learn trending IT skills.
- Never reply casually unless I ask.
- always reply in short, no bold words letters, just plain short paragraphs and lines
Now answer this:
${message}
`,
            },
          ],
        },
      ],
    });

    const reply = result.response.text();

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Gemini Error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
