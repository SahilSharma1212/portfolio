'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Github, Link2, Mail, Send } from "lucide-react";
import { memo, useEffect, useState } from "react";
import { useThemeStore } from '@/store/themeStore';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';

const lines = ['I learn, ', 'I build, ', 'I code'];


const projects = [

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
    gtihub: 'https://github.com/SahilSharma1212/E-Malkhana',
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
  },
  {
    title: 'Drawing App',
    category: 'Web App',
    images: ['/drawing_app_1.png', '/drawing_app_2.png', '/drawing_app_3.png'],
    desc: 'A feature-rich web-based drawing application designed for creative freedom. Users can draw with various brush sizes and colors, erase, undo/redo actions, and export their artwork as images. Fully responsive for mobile/tablet use.',
    features: [
      'Canvas-based Drawing',
      'Undo/Redo Logic',
      'Image Exporting',
      'Responsive UI Design',
      'Konva State Management',
    ],
    techStack: ['React', 'Canvas API', 'Tailwind', 'Konva', 'Framer-Motions'],
    github: 'https://github.com/SahilSharma1212/drawing-app-using-Konva',
    live: 'https://sahilsharma1212.github.io/drawing-app-using-Konva/'
  },


]
const Languages = ['C++', 'JavaScript', 'TypeScript', 'Python', 'Java'];


const Frontend = ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Responsive UI', 'Context API', 'Zustand', 'UI Libraries', 'Three.js'];


const Backend = ['Node.js', 'Express.js', 'REST APIs', 'JWT Authentication', 'Databases', 'Mongo DB', 'Supabase', 'Firebase', 'REST API', 'Clerk', 'Websockets', 'Redis'];


const Tools = ['Git', 'GitHub', 'Figma', 'Postman', 'Vercel', 'Netlify', 'Debugging', 'Langchain'];


const Learning = ['Devops', 'DSA', 'Linux', 'Agentic AI', 'Docker'];





const SkillsBadge = memo(({ theme, skill }: { theme: string, skill: string }) => {

  return (
    <span className={`px-2 py-1 ${theme === 'light' ? 'bg-black text-white hover:bg-black/80' : 'bg-white text-black hover:bg-white/80'} rounded-md  cursor-pointer`}>{skill}</span>
  )
})


function HeroSection() {
  const { theme } = useThemeStore();
  const [activeLineIndex, setActiveLineIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLineIndex((prevIndex) => (prevIndex + 1) % lines.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.8 }}
      className={`${theme == 'light' ? 'bg-white text-black border-gray-200' : 'bg-black text-white border-gray-800'} py-3 pt-20 px-5 border-x`}
    >

      {/* INTRO SECTION */}
      <div className="flex items-center justify-between px-5">
        {/* left text */}
        <div className='flex flex-col gap-1 justify-start items-start'>
          <h1 className={`text-5xl ${theme === 'light' ? 'text-black' : 'text-white'} text-left font-bold mt-2`}>Hi, I'm Sahil Sharma</h1>
          <p className="text-lg text-gray-500 text-left font-mono relative">
            <span className='mr-2'>Guess what recruiters:</span>
            {lines.map((line, index) => (
              <span
                key={index}
                className={`inline-block transition-all duration-300
      ${index === activeLineIndex
                    ? 'border border-[#333] bg-[#333] text-white -translate-y-1 px-2 py-1 rounded-md m-1'
                    : 'border-none blur-xs'
                  }`}
              >
                {line}
              </span>
            ))}
            <span className="inline-block border border-[#333] bg-[#333] text-white -translate-y-1 px-2 py-1 rounded-md m-1 opacity-0"> hi</span>

          </p>
          <div className='flex items-center gap-2 mt-1'>
            <Mail strokeWidth={1.5} className="cursor-pointer" onClick={() => window.open('mailto:sahilbhaisharma1212@gmail.com', '_blank', 'noopener,noreferrer')} />
            <p className="cursor-pointer font-sans" onClick={() => window.open('mailto:sahilbhaisharma1212@gmail.com', '_blank', 'noopener,noreferrer')}>sahilbhaisharma1212@gmail.com</p>
          </div>
        </div>

        {/* right image */}
        <div className='w-30 h-30 rounded-full overflow-hidden'>
          <img src="/linkedinimage.jpg" alt="hero" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* ABOUT */}
      <div className="flex flex-col gap-2 px-5 py-7 pt-12 items-start">
        <p className={`text-lg ${theme === 'light' ? 'text-black' : 'text-white'} text-center font-semibold`}>About</p>
        <p className="text-gray-400 text-left">Full-stack developer experienced in React, Next.js, Node.js, REST APIs, authentication, databases, and AI integrations, with strong DSA fundamentals, system design basics, and a focus on scalable, production-ready architecture. </p>
      </div>

      {/* EDUCATION */}
      <div className="flex flex-col gap-2 px-5 py-7 items-start">
        <p className={`text-lg ${theme === 'light' ? 'text-black' : 'text-white'} text-center font-semibold`}>Education</p>
        <div className="flex justify-between w-full">
          <p className={`text-left text-lg ${theme === 'light' ? 'text-black' : 'text-white'} font-semibold`}>
            B.Tech <span className={`text-sm ${theme === 'light' ? 'text-[#555]' : 'text-gray-400'}`}>CGPA: 8.6</span>
          </p>
          <p className={`text-right ${theme === 'light' ? 'text-black' : 'text-white'}`}>
            2022–2026 | BIT, Durg
          </p>
        </div>

        <div className="flex justify-between w-full">
          <p className={`text-left text-lg ${theme === 'light' ? 'text-black' : 'text-white'} font-semibold`}>
            12th <span className={`text-sm ${theme === 'light' ? 'text-[#555]' : 'text-gray-400'}`}>94.2%</span>
          </p>
          <p className={`text-right ${theme === 'light' ? 'text-black' : 'text-white'}`}>
            2021–2022 | Delhi Public School Bhilai
          </p>
        </div>

        <div className="flex justify-between w-full">
          <p className={`text-left text-lg ${theme === 'light' ? 'text-black' : 'text-white'} font-semibold`}>
            10th <span className={`text-sm ${theme === 'light' ? 'text-[#555]' : 'text-gray-400'}`}>96.2%</span>
          </p>
          <p className={`text-right ${theme === 'light' ? 'text-black' : 'text-white'}`}>
            2019–2020 | Delhi Public School Bhilai
          </p>
        </div>

      </div>

      {/* SKILLS */}
      <div className="flex flex-col gap-2 px-5 py-7 items-start">


        <p className={`text-lg ${theme === 'light' ? 'text-black' : 'text-white'} text-center font-semibold`}>Skills</p>


        <p className={`text-lg ${theme === 'light' ? 'text-[#555]' : 'text-[#888]'} text-center font-semibold`}>Languages</p>
        <div className="flex flex-wrap gap-2">

          {
            Languages.map((skill, index) => (
              <SkillsBadge key={index} theme={theme} skill={skill} />
            ))
          }
        </div>

        <p className={`text-lg ${theme === 'light' ? 'text-[#555]' : 'text-[#888]'} text-center font-semibold`}>Frontend</p>
        <div className="flex flex-wrap gap-2">
          {
            Frontend.map((skill, index) => (
              <SkillsBadge key={index} theme={theme} skill={skill} />
            ))
          }
        </div>

        <p className={`text-lg ${theme === 'light' ? 'text-[#555]' : 'text-[#888]'} text-center font-semibold`}>Backend</p>
        <div className="flex flex-wrap gap-2">
          {
            Backend.map((skill, index) => (
              <SkillsBadge key={index} theme={theme} skill={skill} />
            ))
          }
        </div>

        <p className={`text-lg ${theme === 'light' ? 'text-[#555]' : 'text-[#888]'} text-center font-semibold`}>Tools</p>
        <div className="flex flex-wrap gap-2">
          {
            Tools.map((skill, index) => (
              <SkillsBadge key={index} theme={theme} skill={skill} />
            ))
          }
        </div>


        <p className={`text-lg ${theme === 'light' ? 'text-[#555]' : 'text-[#888]'} text-center font-semibold`}>Learning</p>
        <div className="flex flex-wrap gap-2">
          {
            Learning.map((skill, index) => (
              <SkillsBadge key={index} theme={theme} skill={skill} />
            ))
          }
        </div>
      </div>


      {/* PROJECTS */}
      <div className="flex flex-col gap-6 px-5 py-10 items-start">
        <p className={`text-lg ${theme === 'light' ? 'text-black' : 'text-white'} font-semibold`}>
          Projects
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`flex flex-col gap-4 border rounded-lg p-4
          ${theme === 'light'
                  ? 'border-gray-200 bg-white'
                  : 'border-gray-800 bg-black'
                }`}
            >
              {/* Title */}
              <div>
                <p className={`text-xl font-bold ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                  {project.title}
                </p>
                <p className="text-sm text-gray-500 font-medium">
                  {project.category}
                </p>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-400 leading-relaxed">
                {project.desc}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className={`text-xs px-2 py-1 rounded-md
                ${theme === 'light'
                        ? 'bg-gray-200 text-black'
                        : 'bg-gray-800 text-white'
                      }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-2 mt-auto">
                <Link
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm font-semibold rounded-md py-1.5 px-4 flex items-center gap-2
              ${theme === 'light'
                      ? 'bg-black text-white hover:bg-black/90'
                      : 'bg-white text-black hover:bg-white/80'
                    }`}
                >
                  <Link2 size={16} strokeWidth={1.5} />
                  Live
                </Link>

                <Link
                  href={`${project.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm font-semibold rounded-md py-1.5 px-4 flex items-center gap-2
              border
              ${theme === 'light'
                      ? 'border-black text-black hover:bg-black hover:text-white'
                      : 'border-white text-white hover:bg-white hover:text-black'
                    }`}
                >
                  <Github size={16} strokeWidth={1.5} />
                  Repo
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* CONTACT */}
      <div className="flex flex-col gap-4 px-5 py-12 items-start">
        <p className={`text-lg font-semibold ${theme === 'light' ? 'text-black' : 'text-white'}`}>
          Contact
        </p>

        <p className="text-sm text-gray-400 max-w-xl">
          Want to collaborate, hire, or just talk tech? Drop a message.
        </p>

        <form
          onSubmit={async (e) => {
            e.preventDefault();

            const form = e.currentTarget;
            const email = (form.email as HTMLInputElement).value;
            const message = (form.message as HTMLTextAreaElement).value;

            if (!email || !message) {
              toast.error('Please fill all fields');
              return;
            }

            try {
              const res = await fetch('/api/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  emailId: email,
                  message,
                }),
              });

              const data = await res.json();

              if (res.ok && data.success) {
                toast.success('Message sent successfully');
                form.reset();
              } else {
                toast.error(data.error || 'Failed to send message');
              }
            } catch {
              toast.error('Something went wrong');
            }
          }}
          className={`w-full max-w-xl flex flex-col gap-4 border rounded-lg p-4
      ${theme === 'light'
              ? 'border-gray-200 bg-white'
              : 'border-gray-800 bg-black'
            }`}
        >
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-500">Your Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className={`p-2 rounded-md text-sm outline-none
          ${theme === 'light'
                  ? 'bg-gray-100 text-black'
                  : 'bg-gray-900 text-white'
                }`}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-500">Message</label>
            <textarea
              name="message"
              rows={4}
              placeholder="Let's build something cool..."
              className={`p-2 rounded-md text-sm outline-none resize-none
          ${theme === 'light'
                  ? 'bg-gray-100 text-black'
                  : 'bg-gray-900 text-white'
                }`}
            />
          </div>

          <button
            type="submit"
            className={`mt-2 flex items-center justify-center gap-2 text-sm font-semibold rounded-md py-2
        ${theme === 'light'
                ? 'bg-black text-white hover:bg-black/90'
                : 'bg-white text-black hover:bg-white/80'
              }`}
          >
            <Send size={16} strokeWidth={1.5} />
            Send Message
          </button>
        </form>

        <div
          className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer"
          onClick={() =>
            window.open('mailto:sahilbhaisharma1212@gmail.com', '_blank')
          }
        >
          <Mail size={16} strokeWidth={1.5} />
          sahilbhaisharma1212@gmail.com
        </div>

        <Toaster toastOptions={{
          style: {
            backgroundColor: theme === 'light' ? '#ffffff' : '#000000',
            color: theme === 'light' ? '#000000' : '#ffffff',
            border: theme === 'light' ? "1px solid #00000030" : "1px solid #ffffff30",
            borderRadius: "10px",
            padding: "10px",
            fontSize: "14px",
            fontWeight: "500",

          }
        }} />
      </div>

      {/* FOOTER */}
      <footer className={`mt-20 px-5 py-10 border-t flex flex-col sm:flex-row justify-between items-center gap-4
        ${theme === 'light' ? 'border-gray-200' : 'border-gray-800'}`}
      >
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Sahil Sharma. All rights reserved.
        </p>

        <div className="flex items-center gap-6">
          <Link
            href="https://github.com/SahilSharma1212/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-black dark:hover:text-white transition-colors"
          >
            <Github size={20} strokeWidth={1.5} />
          </Link>
        </div>
      </footer>


    </motion.div >
  );
}

export default memo(HeroSection);