'use client'
import React, { useState, useRef, useEffect, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useThemeStore } from '@/store/themeStore'
import { FiSend } from 'react-icons/fi'
import ThinkingDiv from '../_ui/ThinkingDiv'
import AnimatedBorder from '../_components/AnimatedBorder'
import gsap from 'gsap'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

type Message = {
  id: number
  text: string
  sender: 'user' | 'bot'
}

function ChatPage() {
  const { theme } = useThemeStore()
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, text: "Hello! I'm your AI assistant. How can I help you explore Sahil's portfolio today?", sender: 'bot' }
  ])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [thinking, setThinking] = useState(false)
  const borderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (borderRef.current) {
        gsap.to(borderRef.current, {
            "--border-progress": 100,
            duration: 6,
            ease: "none",
            repeat: -1,
        });
    }
  }, [])

  const borderStyles = {
    "--border-progress": 0,
  } as React.CSSProperties;

  const sendMessage = async () => {
    if (!input.trim()) return

    setThinking(true)
    const userMsg: Message = { id: Date.now(), text: input, sender: 'user' }
    setMessages((prev) => [...prev, userMsg])
    const userInput = input
    setInput('')

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userInput }),
      })
      const data = await res.json()
      const botMsg: Message = {
        id: Date.now() + 1,
        text: data.reply || 'Error: No response from AI.',
        sender: 'bot',
      }
      setMessages((prev) => [...prev, botMsg])
    } catch (err) {
      const botMsg: Message = {
        id: Date.now() + 1,
        text: 'Connection error. Please try again.',
        sender: 'bot',
      }
      setMessages((prev) => [...prev, botMsg])
    }
    setThinking(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') sendMessage()
  }

  return (
    <div className={`min-h-screen w-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-12 relative overflow-hidden ${theme === 'light' ? 'bg-white' : 'bg-linear-to-br from-[#070707] to-[#030303] via-[#090909]'}`}>
      
      {/* Background "AI CHAT" */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
          <motion.span
              initial={{ opacity: 0, scale: 1.04 }}
              whileInView={{ opacity: theme === 'light' ? 0.05 : 0.03, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className={`text-[20vw] md:text-[18vw] lg:text-[16vw] font-black uppercase tracking-widest leading-none whitespace-nowrap ${theme === 'light' ? 'text-black' : 'text-white/50'}`}
          >
              AI CHAT
          </motion.span>
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col h-[85vh]">
        
        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-6 font-mono text-xs uppercase tracking-widest">
            <ChevronLeft size={14} /> Back to Portfolio
        </Link>

        <motion.div 
          ref={borderRef}
          style={borderStyles}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`relative flex-1 flex flex-col backdrop-blur-3xl overflow-hidden ${theme === 'light' ? 'bg-white/80 border border-gray-100 shadow-2xl' : 'bg-[#111]/40'}`}
        >
          {theme !== 'light' && <AnimatedBorder />}

          {/* Header */}
          <div className={`px-8 py-6 border-b flex items-center justify-between relative z-20 ${theme === 'light' ? 'border-gray-100 bg-gray-50' : 'border-white/5 bg-white/5'}`}>
            <h1 className={`text-xl font-mono tracking-widest uppercase ${theme === 'light' ? 'text-black' : 'text-white'}`}>
              Sahil Assistant
            </h1>
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">Live Engine</span>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-6 custom-scrollbar relative z-10">
            <AnimatePresence initial={false}>
              {messages.map((msg, i) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`p-4 font-mono text-sm max-w-[80%] border transition-all
                      ${msg.sender === 'user'
                        ? (theme === 'light' ? 'bg-black text-white border-black' : 'bg-white/10 border-white/20 text-white')
                        : (theme === 'light' ? 'bg-gray-50 text-black border-gray-100' : 'bg-white/5 border-white/5 text-gray-300')
                      }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {thinking && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                    <ThinkingDiv />
                </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className={`p-6 border-t relative z-20 ${theme === 'light' ? 'border-gray-100 bg-gray-50' : 'border-white/5 bg-white/5'}`}>
            <div className="flex gap-4">
              <input
                type='text'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder='Ask anything about Sahil...'
                className={`flex-1 p-4 text-xs font-mono outline-none transition-all duration-300 border
                  ${theme === 'light'
                      ? 'bg-white border-gray-200 text-black focus:border-black'
                      : 'bg-black/40 border-white/10 text-white placeholder:text-gray-600 focus:border-white/30'
                  }`}
              />
              <button
                onClick={sendMessage}
                disabled={thinking || !input.trim()}
                className={`px-6 transition-all duration-300 flex items-center justify-center
                  ${theme === 'light' 
                      ? 'bg-black text-white hover:bg-neutral-800 disabled:bg-gray-200' 
                      : 'bg-white text-black hover:bg-neutral-200 disabled:opacity-50'}`}
              >
                <FiSend size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default memo(ChatPage)

