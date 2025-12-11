'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  FaHtml5,
  FaJava,
  FaNodeJs,
  FaPython,
  FaReact,
  FaGithub,
  FaBrain,
  FaGitlab,
  FaDocker,
  FaFigma,
  FaLinux,
} from 'react-icons/fa'

import { IoLogoJavascript } from 'react-icons/io'
import { IoLogoCss3 } from 'react-icons/io'
import { IoLogoFirebase } from 'react-icons/io5'
import {
  SiNextdotjs,
  SiExpress,
  SiMongodb,
  SiGoogleauthenticator,
  SiFramer,
} from 'react-icons/si'
import { TbBrandTypescript } from 'react-icons/tb'
import { RiTailwindCssFill, RiSupabaseFill } from 'react-icons/ri'
import { TbBrandCpp, TbBrandThreejs } from 'react-icons/tb'
import { IconType } from 'react-icons'

// Properly typed skill items
const skills: { name: string; icon: IconType; color: string }[] = [
  { name: 'Java', icon: FaJava, color: '#f89820' },
  { name: 'C++', icon: TbBrandCpp, color: '#00599C' },
  { name: 'Python', icon: FaPython, color: '#3776AB' },
  { name: 'HTML', icon: FaHtml5, color: '#E44D26' },
  { name: 'CSS', icon: IoLogoCss3, color: '#1572B6' },
  { name: 'TailwindCSS', icon: RiTailwindCssFill, color: '#38BDF8' },
  { name: 'JavaScript', icon: IoLogoJavascript, color: '#F7DF1E' },
  { name: 'TypeScript', icon: TbBrandTypescript, color: '#3178C6' },
  { name: 'React', icon: FaReact, color: '#61DAFB' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#ffffff' },
  { name: 'Three.js', icon: TbBrandThreejs, color: '#000000' },
  { name: 'Node.js', icon: FaNodeJs, color: '#68A063' },
  { name: 'Express.js', icon: SiExpress, color: '#ffffff' },
  { name: 'MongoDB', icon: SiMongodb, color: '#4DB33D' },
  { name: 'JWT Auth', icon: SiGoogleauthenticator, color: '#FF6B6B' },
  { name: 'Firebase', icon: IoLogoFirebase, color: '#FFCA28' },
  { name: 'Supabase', icon: RiSupabaseFill, color: '#3ECF8E' },
  { name: 'Framer Motion', icon: SiFramer, color: '#FFCA28' },
  { name: 'GitHub', icon: FaGithub, color: '#ffffff' },
  { name: 'AI / ML', icon: FaBrain, color: '#B800FF' },
  { name: 'Figma', icon: FaFigma, color: '#F24E1E' },
  { name: 'Linux', icon: FaLinux, color: '#FCC624' },
  { name: 'GitLab', icon: FaGitlab, color: '#FC6D26' },
  { name: 'Docker', icon: FaDocker, color: '#2496ED' }
]

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function SkillsSection() {
  return (
    <>
      <h2 className="text-6xl text-white text-center font-serif mt-4" id='skills'>Skills & Interests</h2>
      <section className="flex flex-col items-center justify-center py-20 px-4">

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="cardgraybg backdrop-blur-xl 
                     grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 
                     gap-6 sm:gap-8 p-8 sm:p-12 rounded-2xl border border-[#454545]
                     max-w-7xl w-full"
        >
          {skills.map((skill, idx) => {
            const Icon = skill.icon

            return (
              <motion.div
                key={idx}
                variants={item}
                whileHover={{
                  scale: 1.18,
                  y: -10,
                  transition: { duration: 0.4, ease: [0.6, -0.05, 0.01, 0.99] },
                }}
                className="relative group flex justify-center"
              >
                {/* Icon - Dim on desktop by default, full on hover */}
                <div
                  className={`
                    w-16 h-16 flex items-center justify-center 
                    bg-[#2d2d2d]/90 text-white rounded-xl 
                    shadow-xl shadow-black/40 backdrop-blur-sm
                    border border-white/10
                    transition-all duration-500
                    sm:opacity-50 sm:group-hover:opacity-100 opacity-100
                  `}
                >
                  {/* Apply color via style for reliable results */}
                  <Icon size={34} style={{ color: skill.color }} className="drop-shadow-md" />
                </div>

                {/* Tooltip - Only on hover & desktop */}
                <motion.span
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  whileHover={{ opacity: 1, y: -12, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute -top-10 left-1/2 -translate-x-1/2
                             px-4 py-2 text-sm font-medium text-white 
                             bg-black/95 backdrop-blur-md rounded-lg
                             border border-white/10 whitespace-nowrap
                             pointer-events-none z-10
                             hidden sm:group-hover:block"
                >
                  {skill.name}
                </motion.span>
              </motion.div>
            )
          })}
        </motion.div>
      </section>
    </>
  )
}
