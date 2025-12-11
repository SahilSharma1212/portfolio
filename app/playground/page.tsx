'use client'

import Link from "next/link"
import { CgArrowTopRight } from "react-icons/cg"

export default function PlaygroundPage() {

  return (
    <div className="min-h-screen p-6 sm:p-10">
      <h2 className="text-5xl sm:text-7xl font-serif text-center text-white">
        Welcome to Playground
      </h2>
      <h4 className="text-white/80 font-serif mt-4 text-center sm:text-xl">
        This page contains fun side projects
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">

        <Link href={'/playground/hover-glow'} className="bg-[#222] h-30 text-white font-serif text-lg rounded-md p-7 group hover:scale-105 hover:bg-[#333] flex items-center justify-between transition">
          <div className="flex flex-col items-start justify-center">
          <p className="text-2xl">Hover Glowing Grid</p>
          <p className="text-[#777] mt-1">Glowing boxes appear on hovering</p>
          </div>
          <CgArrowTopRight size={30} strokeWidth={0.1} className="group-hover:rotate-45 transition text-[#777]"/>
        </Link>

        <Link href={'/playground/modern-carousel'} className="bg-[#222] h-30 text-white font-serif text-lg rounded-md p-7 group hover:scale-105 hover:bg-[#333] flex items-center justify-between transition">
          <div className="flex flex-col items-start justify-center">
          <p className="text-2xl">Modern Carousel</p>
          <p className="text-[#777] mt-1">A fun floating modern carousel</p>
          </div>
          <CgArrowTopRight size={30} strokeWidth={0.1} className="group-hover:rotate-45 transition text-[#777]"/>
        </Link>
        <div className="bg-white/5 backdrop-blur-xl rounded-md h-30 flex items-center justify-center text-[#888] font-serif">
          More Projects to come
        </div>
      </div>
    </div>
  )
}