"use client"

import { useEffect, useRef } from "react"
import { useThemeStore } from "@/store/themeStore"

export default function MouseFollower() {
    const ref = useRef<HTMLDivElement>(null)
    const { theme } = useThemeStore()

    let mouseX = 0
    let mouseY = 0
    let x = 0
    let y = 0

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            mouseX = e.clientX
            mouseY = e.clientY
        }

        window.addEventListener("mousemove", onMove)

        const ease = 0.1
        const lag = 0.08

        const animate = () => {
            x += (mouseX - x) * ease
            y += (mouseY - y) * ease

            if (ref.current) {
                ref.current.style.transform = `translate(${x}px, ${y}px)`
            }

            requestAnimationFrame(animate)
        }

        animate()

        return () => window.removeEventListener("mousemove", onMove)
    }, [])

    return (
        <div
            ref={ref}
            className={`fixed top-0 left-0 pointer-events-none`}
        >
            <div
                className={`w-8 h-8 rounded-md flex items-center justify-center gap-1
        ${theme === "light" ? "bg-white border-black/50 border" : "bg-black border-white/50 border"}`}
            >
                <div className={`w-2 h-2 rounded-sm bg-black ${theme === "light" ? "bg-black" : "bg-white"} animate-pulse`} />
                <div className={`w-2 h-2 rounded-sm bg-black ${theme === "light" ? "bg-black" : "bg-white"} animate-pulse`} />
            </div>

            <div className="flex justify-center gap-1 mt-1">
                <div className={`w-1 h-4 ${theme === "light" ? "bg-black/50" : "bg-white/50"} animate-bounce [animation-delay:0ms]`} />
                <div className={`w-1 h-4 ${theme === "light" ? "bg-black/50" : "bg-white/50"} animate-bounce [animation-delay:150ms]`} />
                <div className={`w-1 h-4 ${theme === "light" ? "bg-black/50" : "bg-white/50"} animate-bounce [animation-delay:300ms]`} />
            </div>

        </div>
    )
}
