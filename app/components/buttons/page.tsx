'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useThemeStore } from '@/store/themeStore'
import { Copy, Eye, Code as CodeIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import ButtonShowcase from '../../_components/ButtonShowcase'

export default function ButtonsPage() {
    const { theme } = useThemeStore()
    const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview')

    const code = `// ButtonShowcase.tsx implementation...`

    return (
        <>
            {/* Toolbar */}
            <div className={`flex items-center justify-between p-4 border-b relative z-20 ${theme === 'light' ? 'border-gray-100 bg-gray-50' : 'border-white/5 bg-white/5'}`}>
                <div className="flex items-center gap-6">
                    <button 
                        onClick={() => setViewMode('preview')}
                        className={`flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold transition-colors ${viewMode === 'preview' ? (theme === 'light' ? 'text-black' : 'text-white') : 'text-gray-500 hover:text-gray-300'}`}
                    >
                        <Eye size={14} /> Preview
                    </button>
                    <button 
                        onClick={() => setViewMode('code')}
                        className={`flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold transition-colors ${viewMode === 'code' ? (theme === 'light' ? 'text-black' : 'text-white') : 'text-gray-500 hover:text-gray-300'}`}
                    >
                        <CodeIcon size={14} /> Source
                    </button>
                </div>
                <button 
                     onClick={() => {
                        navigator.clipboard.writeText(code);
                        toast.success('Code copied to clipboard');
                    }}
                    className={`p-2 transition-colors ${theme === 'light' ? 'text-gray-400 hover:text-black' : 'text-gray-500 hover:text-white'}`}
                    title="Copy Code"
                >
                    <Copy size={16} />
                </button>
            </div>

            {/* Display */}
            <div className="flex-1 relative overflow-auto custom-scrollbar p-6">
                <AnimatePresence mode="wait">
                    {viewMode === 'preview' ? (
                        <motion.div
                            key="preview"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="w-full h-full flex items-center justify-center p-4 sm:p-10"
                        >
                            <ButtonShowcase />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="code"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="w-full h-full font-mono text-xs text-gray-400 bg-black/20 p-6 rounded"
                        >
                            <pre className="whitespace-pre-wrap">{code}</pre>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    )
}
