'use client'
import React, { useState } from 'react'

export default function HoverGlow() {

    const [pos, setPos] = useState({ x: -100, y: -100 })
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

    // Responsive grid: more columns on larger screens
    const cols = typeof window !== 'undefined' && window.innerWidth < 640 ? 10 : 18
    const rows = typeof window !== 'undefined' && window.innerWidth < 640 ? 12 : 10
    const total = cols * rows

    // Beautiful color palette (feel free to add more)
    const colors = [
        '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57',
        '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#FF9FF3',
        '#54A0FF', '#48DBFB', '#1DD1A1', '#FF9F43', '#FD79A8'
    ]



    return (
        <div className='flex items-center justify-center h-screen relative'>
            <span className='absolute lg:text-5xl font-bold top-1/2 left-1/2 text-white/10 z-50'>
                Hover here
            </span>

            <div
                className="relative w-[80%] h-[80vh]  mx-auto rounded-3xl overflow-hidden  backdrop-blur-xl border border-gray-800 shadow-2xl"
                onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect()
                    setPos({
                        x: e.clientX - rect.left,
                        y: e.clientY - rect.top,
                    })
                }}
                onMouseLeave={() => setPos({ x: -100, y: -100 })}
            >
                {/* FULL-COVERAGE ZERO-GAP GRID */}
                <div
                    className="grid w-full h-full"
                    style={{
                        gridTemplateColumns: `repeat(${cols}, 1fr)`,
                        gridTemplateRows: `repeat(${rows}, 1fr)`,
                        aspectRatio: cols / rows,
                    }}
                >
                    {Array.from({ length: total }, (_, i) => {
                        const isHovered = hoveredIndex === i
                        const color = colors[i % colors.length]

                        return (
                            <div
                                key={i}
                                className="relative overflow-hidden transition-all duration-700 ease-out"
                                onMouseEnter={() => setHoveredIndex(i)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                style={{
                                    backgroundColor: isHovered ? color : '#111111',
                                    boxShadow: isHovered
                                        ? `0 0 40px ${color}80, inset 0 0 40px ${color}40`
                                        : 'none',
                                    transform: isHovered ? 'scale(1.4)' : 'scale(1)',
                                    zIndex: isHovered ? 10 : 1,
                                    borderRadius: isHovered ? '12px' : '0',
                                }}
                            >
                                {/* Subtle inner glow */}
                                {isHovered && (
                                    <div
                                        className="absolute inset-0 opacity-60"
                                        style={{
                                            background: `radial-gradient(circle at center, ${color}40 0%, transparent 70%)`,
                                        }}
                                    />
                                )}

                            </div>
                        )
                    })}
                    <p className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                        Hover</p>
                </div>


            </div>
        </div>

    )
}
