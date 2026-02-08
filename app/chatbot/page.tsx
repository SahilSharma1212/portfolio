'use client'
import React, { useState, useRef, useEffect } from 'react'
import { useThemeStore } from '@/store/themeStore'
import { FiSend } from 'react-icons/fi'
import ThinkingDiv from '../_ui/ThinkingDiv'
type Message = {
  id: number
  text: string
  sender: 'user' | 'bot'
}



export default function ChatPage() {
  const { theme } = useThemeStore()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [thinking, setThinking] = useState(false);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // -------------------------
  // MAIN SEND FUNCTION
  // -------------------------
  const sendMessage = async () => {
    if (!input.trim()) return

    setThinking(true);

    // Add user message
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
        text: data.reply || 'Error: No response',
        sender: 'bot',
      }

      setMessages((prev) => [...prev, botMsg])
    } catch (err) {
      const botMsg: Message = {
        id: Date.now() + 1,
        text: 'Something went wrong.',
        sender: 'bot',
      }
      setMessages((prev) => [...prev, botMsg])
    }

    setThinking(false);
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') sendMessage()
  }

  return (
    <div className={`p-20 py-10 h-screen max-md:p-10 max-sm:p-3 ${theme === 'light' ? 'bg-white text-black' : 'bg-black text-white'}`}>
      <div className={`flex flex-col h-full border rounded-xl overflow-hidden ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-[#111] border-white/20'}`}>

        {/* Header */}
        <div className={`px-6 py-4 border-b text-xl font-semibold ${theme === 'light' ? 'border-gray-200 bg-gray-50 text-black' : 'border-white/20 bg-[#111] text-white'}`}>
          ChatBot (Gemini API)
        </div>

        {/* Messages */}
        <div className={`flex-1 overflow-y-auto p-6 flex flex-col gap-3 chat-container ${theme === 'light' ? 'bg-white' : 'bg-[#111]'}`}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-3 rounded-2xl max-w-[70%] ${msg.sender === 'user'
                ? theme === 'light' ? 'self-end bg-black text-white' : 'self-end bg-white text-black'
                : theme === 'light' ? 'self-start bg-gray-100 text-black' : 'self-start bg-gray-800 text-white'
                }`}
            >
              {msg.text}
            </div>
          ))}
          {
            thinking && <ThinkingDiv />
          }
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className={`flex p-4 border-t gap-3 ${theme === 'light' ? 'border-gray-200 bg-gray-50' : 'border-white/20 bg-[#111]'}`}>
          <input
            type='text'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder='Type your message...'
            className={`flex-1 p-3 rounded-2xl focus:outline-none ${theme === 'light' ? 'bg-white text-black placeholder-gray-500 border border-gray-200' : 'bg-gray-900 text-white placeholder-gray-400 border border-transparent'}`}
          />
          <button
            onClick={sendMessage}
            className={`p-3 rounded-2xl transition ${theme === 'light' ? 'bg-black text-white hover:bg-black/80' : 'bg-white text-black hover:bg-white/80'}`}
          >
            <FiSend size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}
