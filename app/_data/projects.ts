export const projects = [
    {
        title: 'E-Malkhana',
        category: 'Digital Evidence Management',
        images: ['/emalkhana1.png', '/emalkhana2.png', '/emalkhana3.png'],
        desc: 'Digital Evidence Management System for law enforcement agencies, built with Next.js, Supabase, and TailwindCSS. The application enables secure storage and management of case-related evidence (images, PDFs) with advanced search, category-based filtering, and role-based access control.',
        features: [
            'Advanced Search, Filtering & Pagination',
            'Role-Based Access Control',
            'Secure File Upload & Deletion',
            'Supabase Storage Management',
            'Responsive & Accessible UI',
        ],
        techStack: ['Next.js', 'Supabase', 'TailwindCSS', 'ShadCn', 'JWT', 'REST API', 'Firebase'],
        github: 'https://github.com/SahilSharma1212/E-Malkhana',
        live: 'https://e-malkhana-smoky.vercel.app/'
    },
    {
        title: 'RepoRama',
        category: 'Developer Productivity / AI',
        images: ['/reporama1.png', '/reporama2.png', '/reporama3.png'],
        desc: 'AI-powered GitHub repository intelligence platform that analyzes repositories to generate structured insights such as code summaries, architecture breakdowns, feature explanations, and visualized repo analytics. Designed to help developers, recruiters, and learners quickly understand real-world codebases.',
        features: [
            'GitHub Repository Analysis via GitHub API',
            'AI-Based Code & Architecture Summarization',
            'Spotify-Wrapped Style Developer Insights (Planned)',
            'Structured Feature & Tech Stack Extraction',
            'Multi-Repo Comparison & Visualization (Planned)',
        ],
        techStack: [
            'Next.js',
            'Supabase',
            'Clerk Auth',
            'GitHub API',
            'LangChain',
            'Gemini API',
            'Zustand',
            'ShadCn',
            'Framer Motion',
        ],
        github: 'https://github.com/SahilSharma1212/RepoRama',
        live: 'https://repo-rama.vercel.app/'
    },
    {
        title: 'AI Resume Builder',
        category: 'AI / Productivity',
        images: ['/resume1.png', '/resume2.png', '/resume3.png'],
        desc: 'AI-powered resume builder that generates job-tailored resumes based on user input. Integrates Gemini API to auto-fill relevant achievements, skills, and experience. Includes editable sections, live PDF preview, and export to Word & PDF.',
        features: [
            'AI Prompt Engineering',
            'User Authentication (OAuth & Email)',
            'Dynamic PDF Generation',
            'Form Handling & Validation',
            'Resume Parsing & Exporting',
        ],
        techStack: ['Next.js', 'MongoDB', 'Tailwind', 'Gemini-API', 'JWT', 'ShadCn', 'Mailtrap'],
        github: 'https://github.com/SahilSharma1212/Next.js-AI-Powered-Resume-Builder',
        live: 'https://next-js-ai-powered-resume-builder.vercel.app/'
    }
];
