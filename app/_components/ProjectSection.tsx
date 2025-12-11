'use client'

import Image from 'next/image'
import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
// --- Example Projects ---
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
  },
]

// --- Single Project Card ---
const ProjectCard = ({ project }: { project: typeof projects[0] }) => {
  const boxStyle = 'bg-[#222222] border border-white/30 rounded-2xl p-6'

  return (
    <motion.div
      className='relative w-full' id='projects'>
      {/* Stacked Background Cards */}
      <div className='absolute -top-4 -right-4 w-full h-full cardgraybg border border-white/20 rounded-lg z-0' />
      <div className='absolute -top-2 -right-2 w-full h-full -800/70 border border-white/20 rounded-lg z-10' />

      {/* Main Card */}
      <div className='relative w-full cardgraybg backdrop-blur-3xl flex flex-col md:flex-row gap-6 p-5 border border-white/30 rounded-lg z-20'>

        {/* Image Box */}
        <div className={`md:w-1/4 flex gap-2 flex-col ${boxStyle}`}>
          {project.images.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ y: 30, opacity: 0, scale: 0 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 * idx }}
              className='relative w-full h-32 md:h-40 rounded-xl overflow-hidden bg-gray-800 flex items-center justify-center'
            >
              <Image
                src={img}
                alt={`${project.title} image ${idx + 1}`}
                fill
                style={{ objectFit: 'cover' }}
                onError={(e) => {
                  // fallback: gray background if image fails
                  e.currentTarget.src = '/fallback.png' // optional: local placeholder
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Details Box */}
        <div className={`md:w-3/4 flex flex-col justify-between gap-4 ${boxStyle}`}>

          {/* Title */}
          <motion.h2

            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 * 0 }}
            className='text-2xl font-bold text-white mb-2'>{project.title}</motion.h2>

          {/* Description */}
          <motion.div

            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 * 1 }}
            className={`${boxStyle}`}>
            <h3 className='text-white font-semibold mb-1'>Description:</h3>
            <p className='text-gray-300'>{project.desc}</p>
          </motion.div>

          {/* Features */}
          <motion.div

            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 * 2 }}
            className={`${boxStyle}`}>
            <h3 className='text-white font-semibold mb-1'>Features:</h3>
            <ul className='list-disc list-inside text-gray-300'>
              {project.features.map((feat, idx) => (
                <li key={idx}>{feat}</li>
              ))}
            </ul>
          </motion.div>

          {/* Tech Stack */}
          <motion.div

            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 * 3 }}
            className={`${boxStyle}`}>
            <h3 className='text-white font-semibold mb-1'>Tech Stack:</h3>
            <div className='flex flex-wrap gap-2'>
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className='text-sm px-2 py-1 -700/30 rounded-full text-white'
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

// --- Main Project Section ---
export default function ProjectSection() {
  const [current, setCurrent] = useState(0)

  const nextProject = () => setCurrent((prev) => (prev + 1) % projects.length)
  const prevProject = () =>
    setCurrent((prev) => (prev - 1 + projects.length) % projects.length)

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      className='min-h-screen -900 flex flex-col items-center justify-center gap-6 px-8 md:px-20 py-10'>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -40, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >

          <ProjectCard project={projects[current]} />


        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className='flex items-center justify-center gap-5 z-30'>
        <button
          onClick={prevProject}
          className='px-6 py-2 text-white bg-[#222] rounded-lg border border-white/20 hover:bg-[#333] transition cursor-pointer'
        >
          Back
        </button>
        <button
          onClick={nextProject}
          className='px-6 py-2 text-white bg-[#222] rounded-lg border border-white/20 hover:bg-[#333] transition cursor-pointer'
        >
          Next
        </button>
      </div>

    </motion.div>
  )
}
