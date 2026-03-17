'use client'
import React from 'react'
import { motion } from 'framer-motion'

export default function ComponentsIndex() {
    return (
        <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md"
            >
                <h2 className="text-2xl font-mono uppercase tracking-widest text-gray-500 mb-4 text-white">Select a Component</h2>
                <p className="text-sm text-gray-500 font-mono leading-relaxed">
                    Explore individual UI modules from the sidebar. Each component is isolated for performance and includes source code visibility.
                </p>
            </motion.div>
        </div>
    )
}
