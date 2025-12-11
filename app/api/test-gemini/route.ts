import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // Initialize Gemini client
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY ?? "",
    });

    // Generate response
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: message,
    });

    return NextResponse.json({ reply: response.text });
  } catch (err) {
    console.error("Gemini Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
