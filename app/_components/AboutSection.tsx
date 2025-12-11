'use client'
import { motion } from 'motion/react'

const aboutCards = [
  { title: "Full-Stack Dev", content: "I build scalable web apps with clean code." },
  { title: "UI/UX Designer", content: "I design intuitive and beautiful interfaces." },
  { title: "ML Learner", content: "I am learning machine learning and AI concepts." },
  { title: "Problem Solver", content: "I love tackling complex challenges efficiently." },
  { title: "Team Player", content: "I collaborate effectively and communicate clearly." },
  { title: "DevOps Learner", content: "I explore CI/CD, cloud, and deployment practices." },
];
export default function AboutSection() {
  return (
    <div className="relative overflow-hidden pb-15 pt-15 max-md:pb-5 max-md:pt-0 max-md:scale-90" id='about'>
      <h2 className="text-6xl text-white text-center mb-16 font-serif">About Me</h2>

      <motion.div
        className="flex gap-6 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 20,
          ease: "linear",
        }}
      >
        {/* Duplicate the cards to make the loop seamless */}
        {[...aboutCards, ...aboutCards].map((card, idx) => (
          <div
            key={idx}
            className="min-w-[200px] max-w-xs p-6 rounded-2xl cardgraybg backdrop-blur-xl border border-[#454545] text-white shadow-md shrink-0"
          >
            <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
            <p className="text-gray-300 text-sm">{card.content}</p>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
