'use client'
import React, { useState, useRef, useEffect} from 'react'
import { FiSend } from 'react-icons/fi'
import ThinkingDiv from '../_ui/ThinkingDiv'
type Message = {
  id: number
  text: string
  sender: 'user' | 'bot'
}



export default function ChatPage() {
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
    <div className='p-20 py-10 h-screen max-md:p-10 max-sm:p-3'>
      <div className='flex flex-col h-full bg-[#111] text-white border border-white/30 rounded-xl overflow-hidden'>

        {/* Header */}
        <div className='px-6 py-4 border-b border-white/20 text-xl font-semibold'>
          ChatBot (Gemini API)
        </div>

        {/* Messages */}
        <div className='flex-1 overflow-y-auto p-6 flex flex-col gap-3 cardgraybg chat-container'>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-3 rounded-2xl max-w-[70%] ${
                msg.sender === 'user'
                  ? 'self-end bg-blue-600 text-white'
                  : 'self-start bg-gray-700 text-white'
              }`}
            >
              {msg.text}
            </div>
          ))}
          {
            thinking && <ThinkingDiv/>
          }
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className='flex p-4 border-t border-white/20 bg-[#111] gap-3'>
          <input
            type='text'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder='Type your message...'
            className='flex-1 p-3 rounded-2xl cardgraybg placeholder-gray-400 focus:outline-none text-white'
          />
          <button
            onClick={sendMessage}
            className='bg-gray-600 p-3 rounded-2xl hover:bg-gray-700 transition'
          >
            <FiSend size={20} className='text-white' />
          </button>
        </div>
      </div>
    </div>
  )
}
