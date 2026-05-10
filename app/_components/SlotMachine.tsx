"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const roles = [
    "Frontend Developer",
    "Backend Developer",
    "Fullstack Engineer",
    "AI Fullstack Engineer",
    "Devops Engineer"
]

export default function SlotMachine() {
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % roles.length)
        }, 2500)
        return () => clearInterval(timer)
    }, [])

    const getIndex = (offset: number) => {
        let newIndex = (index + offset) % roles.length
        if (newIndex < 0) newIndex += roles.length
        return newIndex
    }

    return (
        <div className="relative h-[400px] flex flex-col justify-center items-center overflow-hidden select-none font-sans">
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={index}
                    initial={{ y: 80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -80, opacity: 0 }}
                    transition={{ 
                        duration: 0.8, 
                        ease: [0.16, 1, 0.3, 1] 
                    }}
                    className="flex flex-col items-center gap-4"
                >
                    {/* LAYER -2 (Most Blurred/Faint) */}
                    <div className="text-zinc-500 font-extralight text-xl blur-[4px] opacity-30 text-center w-full">
                        {roles[getIndex(-2)]}
                    </div>

                    {/* LAYER -1 (Blurred) */}
                    <div className="text-zinc-700 font-extralight text-2xl blur-[2px] opacity-50 text-center w-full">
                        {roles[getIndex(-1)]}
                    </div>

                    {/* MIDDLE LAYER (Prominent with Intersecting Viewfinder Lines & Vanishing Gradients) */}
                    <div className="relative w-[300px] md:w-[450px] py-4 flex justify-center items-center">
                        {/* HORIZONTAL LINES (TOP & BOTTOM) */}
                        <div 
                            className="absolute top-0 left-[-100px] right-[-100px] border-t border-dashed border-zinc-400" 
                            style={{ maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}
                        />
                        <div 
                            className="absolute bottom-0 left-[-100px] right-[-100px] border-b border-dashed border-zinc-400" 
                            style={{ maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}
                        />
                        
                        {/* VERTICAL LINES (LEFT & RIGHT) */}
                        <div 
                            className="absolute left-0 top-[-100px] bottom-[-100px] border-l border-dashed border-zinc-400" 
                            style={{ maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)' }}
                        />
                        <div 
                            className="absolute right-0 top-[-100px] bottom-[-100px] border-r border-dashed border-zinc-400" 
                            style={{ maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)' }}
                        />

                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="text-black font-extralight text-3xl md:text-4xl text-center z-10"
                        >
                            {roles[index]}
                        </motion.span>
                    </div>

                    {/* LAYER +1 (Blurred) */}
                    <div className="text-zinc-700 font-extralight text-2xl blur-[2px] opacity-50 text-center w-full">
                        {roles[getIndex(1)]}
                    </div>

                    {/* LAYER +2 (Most Blurred/Faint) */}
                    <div className="text-zinc-500 font-extralight text-xl blur-[4px] opacity-30 text-center w-full">
                        {roles[getIndex(2)]}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    )
}
