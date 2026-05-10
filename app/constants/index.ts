export const GITHUB_USERNAME = "SahilSharma1212";

export const PERSONAL_INFO = {
    name: "Sahil Sharma",
    role: "Full Stack Developer & AI Engineer",
    location: "Bhilai, Chhattisgarh, India",
    email: "sahilbhaisharma1212@gmail.com",
    phone: "+91 8821809999",
    linkedin: "https://www.linkedin.com/in/sahil-sharma-822a752a9/",
    github: `https://github.com/${GITHUB_USERNAME}`,
    aboutShort: "If AI thinks it can code better than me, let it do the dumb hardwork, while I design systems, sit back and relax.",
    academic: [
        { label: "10th", value: "96.2%" },
        { label: "12th", value: "94.2%" },
        { label: "B.Tech CGPA", value: "8.70" }
    ]
};

export const SKILLS = {
    categories: [
        {
            title: "Languages",
            skills: ["C++", "JavaScript", "TypeScript", "Python", "Java"]
        },
        {
            title: "Frontend",
            skills: [
                "HTML5", "CSS3", "JavaScript", "TypeScript", "React.js", "Next.js",
                "Tailwind CSS", "Framer Motion", "Responsive UI",
                "Context API", "Zustand", "UI Libraries", "Three.js", "GSAP"
            ]
        },
        {
            title: "Backend",
            skills: [
                "Node.js", "Express.js", "REST APIs", "JWT Authentication",
                "Databases", "Mongo DB", "Supabase", "Firebase",
                "Clerk", "Websockets", "Redis"
            ]
        },
        {
            title: "Tools",
            skills: [
                "Git", "GitHub", "Figma", "Postman", "Vercel",
                "Netlify", "Debugging", "Langchain", "RAGs"
            ]
        },
        {
            title: "Learning",
            skills: ["Devops", "DSA", "Linux", "Agentic AI", "Docker"]
        }
    ],
    levels: {
        "C++": "Intermediate",
        "JavaScript": "PRO",
        "TypeScript": "Proficient",
        "Python": "Intermediate",
        "Java": "Intermediate",
        "HTML5": "PRO",
        "CSS3": "PRO",
        "React.js": "PRO",
        "Next.js": "PRO",
        "Tailwind CSS": "PRO",
        "Framer Motion": "Proficient",
        "Responsive UI": "PRO",
        "Context API": "PRO",
        "Zustand": "Proficient",
        "UI Libraries": "PRO",
        "Three.js": "Intermediate",
        "GSAP": "Intermediate",
        "Node.js": "Proficient",
        "Express.js": "Proficient",
        "REST APIs": "PRO",
        "JWT Authentication": "Proficient",
        "Databases": "Intermediate",
        "Mongo DB": "Proficient",
        "Supabase": "Proficient",
        "Firebase": "Intermediate",
        "Clerk": "Proficient",
        "Websockets": "Intermediate",
        "Redis": "Intermediate",
        "Git": "PRO",
        "GitHub": "PRO",
        "Figma": "Proficient",
        "Postman": "Proficient",
        "Vercel": "PRO",
        "Netlify": "Proficient",
        "Debugging": "Proficient",
        "Langchain": "Intermediate",
        "RAGs": "Intermediate",
        "Devops": "Basic",
        "DSA": "Intermediate",
        "Linux": "Intermediate",
        "Agentic AI": "Basic",
        "Docker": "Intermediate",
    }
};

export const PROJECTS = [
    {
        title: "VOWS & VERIFY",
        description: "A government-grade marriage document validation platform built for registrar offices. Implements a two-stage AI pipeline — OCR extraction via TheHive.ai followed by structured verification through Gemini API — to automate authenticity checks on submitted documents. Features automatic PII purge via Vercel Cron Jobs to meet data privacy compliance.",
        tech: ["Next.js", "TypeScript", "LangChain", "Gemini API", "TheHive.ai", "TanStack Query", "Supabase", "Vercel Cron Jobs"],
        features: ["Two-Stage AI Pipeline", "Automated PII Purge", "Rate-Limited API Gateway"],
        images: ["/vows&verify1.png", "/vows&verify2.png", "/vows&verify3.png"],
        liveLink: "https://vows-and-verify.vercel.app",
        githubLink: "https://github.com/SahilSharma1212/Vows-and-Verify"
    },
    {
        title: "PDF INTEL",
        description: "A document intelligence platform powered by Retrieval-Augmented Generation (RAG). Ingests complex PDFs, chunks and embeds content into a vector store, and enables conversational querying with cited, grounded responses. Uses Groq for low-latency inference and PGVector DB for scalable semantic retrieval.",
        tech: ["Next.js", "LangChain", "Gemini AI", "Groq", "PGVector DB", "TypeScript"],
        features: ["RAG-Powered Q&A", "Semantic Vector Search", "Low-Latency Inference"],
        images: ["/pdfintel1.png", "/pdfintel2.png", "/pdfintel3.png"],
        liveLink: "https://pdf-intel.vercel.app",
        githubLink: "https://github.com/SahilSharma1212/pdf-intel"
    },
    {
        title: "COMPLAINT DASHBOARD",
        description: "A production-deployed complaint management system actively used across 30+ police stations. Built with role-based access control (RBAC) to enforce officer-level permissions, JWT-secured authentication, and a multi-step case escalation workflow. Real-time data sync prevents stale records across concurrent sessions.",
        tech: ["Next.js", "PostgreSQL", "Supabase", "JWT", "Zustand", "Tailwind CSS", "Vultr VPS"],
        features: ["RBAC Authorization", "Multi-Step Case Escalation", "Production VPS Deployment"],
        images: ["/complaindash1.png", "/complaindash2.png", "/complaindash3.png"],
        liveLink: "https://complaint-dashboard.vercel.app",
        githubLink: "https://github.com/SahilSharma1212/complaint-dashboard"
    }
];
