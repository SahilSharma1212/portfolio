'use client'

import Link from "next/link"
import { CgArrowTopRight } from "react-icons/cg"

import { useThemeStore } from "@/store/themeStore"

export default function PlaygroundPage() {
  const { theme } = useThemeStore()

  return (
    <div className={`min-h-screen p-6 sm:p-10 ${theme === 'light' ? 'bg-white text-black' : 'bg-black text-white'}`}>
      <h2 className={`text-5xl sm:text-7xl font-serif text-center ${theme === 'light' ? 'text-black' : 'text-white'}`}>
        Welcome to Playground
      </h2>
      <h4 className={`font-serif mt-4 text-center sm:text-xl ${theme === 'light' ? 'text-gray-500' : 'text-white/80'}`}>
        This page contains fun side projects
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">

        <Link href={'/playground/hover-glow'} className={`h-30 font-serif text-lg rounded-md p-7 group hover:scale-105 flex items-center justify-between transition border ${theme === 'light' ? 'bg-white border-gray-200 text-black hover:bg-gray-50' : 'bg-black border-gray-800 text-white hover:bg-[#111]'}`}>
          <div className="flex flex-col items-start justify-center">
            <p className="text-2xl">Hover Glowing Grid</p>
            <p className={`mt-1 ${theme === 'light' ? 'text-gray-500' : 'text-[#777]'}`}>Glowing boxes appear on hovering</p>
          </div>
          <CgArrowTopRight size={30} strokeWidth={0.1} className={`group-hover:rotate-45 transition ${theme === 'light' ? 'text-gray-400' : 'text-[#777]'}`} />
        </Link>

        <Link href={'/playground/modern-carousel'} className={`h-30 font-serif text-lg rounded-md p-7 group hover:scale-105 flex items-center justify-between transition border ${theme === 'light' ? 'bg-white border-gray-200 text-black hover:bg-gray-50' : 'bg-black border-gray-800 text-white hover:bg-[#111]'}`}>
          <div className="flex flex-col items-start justify-center">
            <p className="text-2xl">Modern Carousel</p>
            <p className={`mt-1 ${theme === 'light' ? 'text-gray-500' : 'text-[#777]'}`}>A fun floating modern carousel</p>
          </div>
          <CgArrowTopRight size={30} strokeWidth={0.1} className={`group-hover:rotate-45 transition ${theme === 'light' ? 'text-gray-400' : 'text-[#777]'}`} />
        </Link>
        <div className={`backdrop-blur-xl rounded-md h-30 flex items-center justify-center font-serif border ${theme === 'light' ? 'bg-gray-50 border-gray-200 text-gray-400' : 'bg-white/5 border-transparent text-[#888]'}`}>
          More Projects to come
        </div>
      </div>
    </div>
  )
}