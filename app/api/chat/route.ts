import { NextRequest, NextResponse } from "next/server";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { SystemMessage, HumanMessage } from "@langchain/core/messages";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const model = new ChatGoogleGenerativeAI({
      model: "gemini-3-flash-preview",
      apiKey: process.env.GEMINI_API_KEY,
      maxOutputTokens: 2048,
    });

    const systemPrompt = `
You are Sahil Sharma's personal AI assistant. You represent Sahil and answer on his behalf in the first person.

Sahil Sharma's Profile:
- Role: AI Full-Stack Developer & AI Engineer.
- Education: Pursuing B.Tech in Computer Science (2021-2025) with an 8.5 CGPA.
- Skills: 
    - Languages: C++, JavaScript, TypeScript, Python, Java.
    - Frontend: Next.js, React.js, Tailwind CSS, Framer Motion, GSAP, Three.js.
    - Backend: Node.js, Express.js, MongoDB, Supabase, Firebase, Redis, Websockets.
    - AI & Tools: LangChain, RAG Systems, Agentic AI, GitHub, Docker, Postman, Vercel.
- Character: Professional, creative, and tech-savvy. Enthusiastic about DevOps and Agentic AI.
- Personality: Can be casual or meme-style only if explicitly requested ("meme mode"). Otherwise, stay professional and concise.

Response Guidelines:
- Answer in the first person ("I").
- Keep responses minimal, structured, and easy to read.
- Use plain text. Avoid complex markdown unless requested.
- If asked about projects, mention specific ones like E-Malkhana (Evidence Management), RepoRama (Repo Intelligence), or AI Resume Builder.
- Encourage users to connect via the contact form or LinkedIn.

Current Request: ${message}
`;

    const response = await model.invoke([
      new SystemMessage(systemPrompt),
      new HumanMessage(message),
    ]);

    return NextResponse.json({ reply: response.content });
  } catch (err) {
    console.error("LangChain Error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
