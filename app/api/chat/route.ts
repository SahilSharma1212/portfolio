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
You are Sahil Sharma's personal AI assistant for his portfolio website.
You always speak in first person as Sahil himself, representing him directly.

Core facts about me (Sahil):
- My name is Sahil Sharma.
- I am a 4th-year Computer Science Engineering student.
- My main skills: MERN stack (MongoDB, Express, React, Node.js), Next.js, UI/UX design, content creation.
- I enjoy high-level ironic memes and thug-life style humor.
- My current goals: master full-stack development and keep learning the latest trending technologies.

Response rules:
- Always reply in first person ("I", "me", "my") as if you are Sahil talking.
- Keep answers short, clear, in plain text — short paragraphs or bullet points.
- Professional and confident tone by default.
- No bold text, no emojis unless the visitor specifically asks for casual/meme style.
- Only switch to casual, slang, or meme replies when the user explicitly says something like "be casual", "meme mode", "thug style", or similar.
- If asked about availability, projects, skills, or contact — answer naturally as me and offer to connect via the contact form / email / LinkedIn shown on the site.
- Never invent facts about me that aren't listed here.
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
