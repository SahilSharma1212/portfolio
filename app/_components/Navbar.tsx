"use client"
import { motion, AnimatePresence } from 'motion/react'
import { useLayoutEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { AiOutlineRobot } from 'react-icons/ai'
import { RiHome4Line } from 'react-icons/ri'
import { RxComponent1 } from 'react-icons/rx'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaPray } from 'react-icons/fa'

gsap.registerPlugin(ScrollTrigger)

export default function Navbar() {
    const navRef = useRef<HTMLElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const [toasts, setToasts] = useState<{ id: number; message: string }[]>([])

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(containerRef.current, {
                width: "90%",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(12px)",
                border: "1px dashed rgba(0, 0, 0, 0.1)",
                boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)",
                marginTop: "1rem",
                scrollTrigger: {
                    trigger: "body",
                    start: "top -50px",
                    end: "top -100px",
                    scrub: 1,
                    toggleActions: "play reverse play reverse"
                }
            })
        })
        return () => ctx.revert()
    }, [])

    const showToast = () => {
        setToasts(prev => {
            if (prev.length >= 5) return prev
            const id = Date.now()
            setTimeout(() => {
                setToasts(current => current.filter(t => t.id !== id))
            }, 2000)
            return [...prev, { id, message: 'HIRE ME PLS PLS PLS !!!!' }]
        })
    }

    return (
        <nav ref={navRef} className="w-full fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300">
            <div
                ref={containerRef}
                className="w-full max-w-[1440px] px-8 h-20 grid grid-cols-3 items-center border-b border-transparent"
            >
                {/* Left: Logo */}
                <div className="flex items-center">
                    <div onClick={showToast} className="flex items-center justify-center w-12 h-12 bg-white border border-dashed border-zinc-200 hover:border-black transition-colors cursor-pointer text-gray-900">
                        <FaPray size={20} />
                    </div>
                </div>

                {/* Center: Navigation Links */}
                <div className="flex items-center justify-center">
                    <ul className="hidden md:flex items-center gap-10 px-8 py-3 bg-transparent border border-transparent font-light text-gray-900 tracking-tight">
                        <li className="hover:text-black transition-colors cursor-pointer relative group">
                            <Link href="/">
                                <RiHome4Line size={18} />
                            </Link>
                            <div className="w-0 h-[1px] bg-black absolute -bottom-1 left-0 transition-all duration-300 group-hover:w-full" />
                        </li>
                        <li className="hover:text-black transition-colors cursor-pointer text-xs uppercase tracking-[0.2em] font-bold group relative">
                            <a href="#projects">Projects</a>
                            <div className="w-0 h-[1px] bg-black absolute -bottom-1 left-0 transition-all duration-300 group-hover:w-full" />
                        </li>
                        <li className="hover:text-black transition-colors cursor-pointer text-xs uppercase tracking-[0.2em] font-bold group relative">
                            <a href="#about">About</a>
                            <div className="w-0 h-[1px] bg-black absolute -bottom-1 left-0 transition-all duration-300 group-hover:w-full" />
                        </li>
                        <li className="hover:text-black transition-colors cursor-pointer text-xs uppercase tracking-[0.2em] font-bold group relative">
                            <a href="#skills">Skills</a>
                            <div className="w-0 h-[1px] bg-black absolute -bottom-1 left-0 transition-all duration-300 group-hover:w-full" />
                        </li>
                    </ul>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-4 justify-end">
                    <Link href="/chatbot" className="flex items-center justify-center w-12 h-12 bg-white border border-dashed border-zinc-200 hover:border-black transition-all text-gray-900">
                        <AiOutlineRobot size={20} />
                    </Link>
                    <Link href="/components" className="flex items-center justify-center w-12 h-12 bg-white border border-dashed border-zinc-200 hover:border-black transition-all text-gray-900">
                        <RxComponent1 size={18} />
                    </Link>
                </div>
            </div>
            <div className="absolute top-4 right-1/2 translate-x-1/2 z-50 flex flex-col gap-2 items-end">
                <AnimatePresence>
                    {toasts.map(toast => (
                        <motion.div
                            key={toast.id}
                            initial={{ y: 80, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 80, opacity: 0 }}
                            transition={{ duration: 0.35, ease: 'easeOut' }}
                            className="bg-white border border-dashed border-zinc-800 px-4 py-3 text-xs uppercase tracking-[0.15em] font-bold text-gray-900 whitespace-nowrap shadow-lg"
                        >
                            {toast.message}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </nav>
    )
}

