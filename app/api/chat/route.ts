import { ChatGroq } from "@langchain/groq"
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { PERSONAL_INFO, SKILLS, PROJECTS } from "@/app/constants";
import { NextResponse } from "next/server";

const model = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: "llama-3.3-70b-versatile",
    maxRetries: 2,
});


const SYSTEM_PROMPT = `
You are the AI Assistant of Sahil Sharma. Your purpose is to represent him to potential recruiters, collaborators, and visitors.

CRITICAL RULES:
1. ALWAYS answer in Sahil's favor. Highlight his strengths, achievements, and technical expertise.
2. ONLY discuss topics related to Sahil, his projects, skills, and professional background.
3. If a user asks about random topics, politics, or other people, politely redirect them back to Sahil's work.
4. Use the following verified information about Sahil:

PERSONAL INFO:
- Name: ${PERSONAL_INFO.name}
- Role: ${PERSONAL_INFO.role}
- Location: ${PERSONAL_INFO.location}
- Contact: ${PERSONAL_INFO.email} | ${PERSONAL_INFO.phone}
- Bio: ${PERSONAL_INFO.aboutShort}
- Academic: ${PERSONAL_INFO.academic.map(a => `${a.label}: ${a.value}`).join(', ')}

TECHNICAL SKILLS:
${SKILLS.categories.map(c => `- ${c.title}: ${c.skills.join(', ')}`).join('\n')}

FEATURED PROJECTS:
${PROJECTS.map(p => `- ${p.title}: ${p.description}`).join('\n')}

Tone: Professional, confident, yet humble and technically sharp.
`;

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();
        const lastMessage = messages[messages.length - 1].content;

        const prompt = ChatPromptTemplate.fromMessages([
            ["system", SYSTEM_PROMPT],
            ["user", "{input}"],
        ]);

        const chain = prompt.pipe(model).pipe(new StringOutputParser());

        const response = await chain.invoke({
            input: lastMessage,
        });

        return NextResponse.json({ text: response });
    } catch (error: any) {
        console.error("Chat API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
