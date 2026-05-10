"use client"

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FiSend, FiCpu, FiUser, FiTerminal, FiLoader } from "react-icons/fi";
import { CornerLines, BoxBorders } from "@/app/_components/Blueprint";

import { PERSONAL_INFO, SKILLS, PROJECTS } from "@/app/constants";

interface Message {
    role: "user" | "assistant" | "system_log";
    content: string;
}

export default function ChatbotPage() {
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: "Neural Bridge established. I am Sahil's digital delegate. How can I assist you with project intelligence today?" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showProjectModal, setShowProjectModal] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const quickQuestions = [
        {
            id: 'projects',
            label: "My Projects",
            answer: `I have worked on several high-impact projects including:\n\n` +
                PROJECTS.map(p => `• **${p.title}**: ${p.description.substring(0, 100)}...`).join('\n\n')
        },
        {
            id: 'hire',
            label: "Why hire me?",
            answer: `You should hire Sahil because he doesn't just write code; he builds scalable systems with a focus on performance and user experience. With a B.Tech CGPA of 8.70 and deep expertise in Next.js, LangChain, and AI integration, he brings both academic excellence and production-grade engineering to the table.`
        },
        {
            id: 'skills',
            label: "Main Skills",
            answer: `Sahil's primary power-stack includes:\n\n` +
                `• **Frontend**: Next.js, TypeScript, Framer Motion\n` +
                `• **Backend**: Node.js, Express, Supabase, PostgreSQL\n` +
                `• **AI**: LangChain, RAG architectures, Groq/Gemini integration`
        },
        {
            id: 'deep_dive',
            label: "Project Deep-Dive",
            action: () => setShowProjectModal(true)
        }
    ];

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    const addMessage = (role: Message['role'], content: string) => {
        setMessages(prev => [...prev, { role, content }]);
    };

    const handleQuickAction = (q: typeof quickQuestions[0]) => {
        if (q.action) {
            q.action();
            return;
        }

        addMessage("user", q.label);
        setTimeout(() => {
            addMessage("assistant", q.answer || "");
        }, 500);
    };

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMsg: Message = { role: "user", content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                body: JSON.stringify({ messages: [...messages, userMsg] }),
                headers: { "Content-Type": "application/json" }
            });

            const data = await res.json();
            if (data.text) {
                addMessage("assistant", data.text);
            }
        } catch (error) {
            addMessage("assistant", "Error: Neural Link disrupted. Please check your connection.");
        } finally {
            setIsLoading(false);
        }
    };

    const selectProject = (project: typeof PROJECTS[0]) => {
        setShowProjectModal(false);
        addMessage("user", `Tell me more about ${project.title}`);
        setTimeout(() => {
            addMessage("assistant", `**${project.title}**\n\n${project.description}\n\n**Tech Stack:** ${project.tech.join(', ')}\n\n**Key Features:**\n${project.features.map(f => `• ${f}`).join('\n')}`);
        }, 500);
    };

    return (
        <div className="h-[calc(100vh-64px)] w-full flex flex-col bg-white relative">

            {/* Project Selection Modal */}
            <AnimatePresence>
                {showProjectModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6"
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            className="max-w-2xl w-full bg-white relative p-[1px]"
                        >
                            <CornerLines />
                            <BoxBorders />
                            <div className="relative z-10 p-8 space-y-6">
                                <div className="flex justify-between items-center border-b border-dashed border-zinc-200 pb-4">
                                    <h3 className="text-xl font-normal text-black uppercase tracking-tighter">Select Project Hub</h3>
                                    <button
                                        onClick={() => setShowProjectModal(false)}
                                        className="text-[#635a5b] hover:opacity-70 transition-all text-2xl font-light"
                                    >
                                        ✕
                                    </button>
                                </div>
                                <div className="grid gap-4 custom-scrollbar max-h-[60vh] overflow-y-auto pr-2">
                                    {PROJECTS.map((p) => (
                                        <button
                                            key={p.title}
                                            onClick={() => selectProject(p)}
                                            className="w-full text-left p-4 border border-dashed border-zinc-200 hover:border-black hover:bg-zinc-50 transition-all group"
                                        >
                                            <h4 className="text-sm font-bold text-black uppercase tracking-widest mb-1">{p.title}</h4>
                                            <p className="text-[10px] text-zinc-500 font-light truncate">{p.description}</p>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex-1 flex flex-col h-full relative">
                <div className="relative z-10 flex flex-col h-full bg-white overflow-hidden">

                    {/* Chat Area */}
                    <div
                        ref={scrollRef}
                        className="flex-1 overflow-y-auto p-6 md:p-12 space-y-12 scroll-smooth custom-scrollbar"
                    >
                        <div className="max-w-5xl mx-auto w-full space-y-12">
                            <AnimatePresence initial={false}>
                                {messages.map((msg, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                    >
                                        <div className={`max-w-[80%] flex gap-6 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                                            <div className={`w-10 h-10 flex-shrink-0 flex items-center justify-center border border-dashed transition-colors duration-500 ${msg.role === "user" ? "border-zinc-800 bg-[#352b2b] text-white" : "border-zinc-300 bg-zinc-50 text-zinc-400"}`}>
                                                {msg.role === "user" ? <FiUser size={16} /> : <FiTerminal size={16} />}
                                            </div>
                                            <div className={`p-6 text-sm font-light leading-relaxed border shadow-sm transition-all duration-500 whitespace-pre-wrap ${msg.role === "user" ? "bg-[#352b2b] text-white border-zinc-800" : "bg-white text-zinc-800 border-zinc-100"}`}>
                                                {msg.content.split('\n').map((line, idx) => (
                                                    <div key={idx}>
                                                        {line.startsWith('•') || line.startsWith('**') ?
                                                            <span dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                                                            : line}
                                                        {idx !== msg.content.split('\n').length - 1 && <br />}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {isLoading && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex justify-start"
                                >
                                    <div className="max-w-[80%] flex gap-6">
                                        <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center border border-dashed border-zinc-300 bg-zinc-50 text-zinc-400">
                                            <FiLoader className="animate-spin" size={16} />
                                        </div>
                                        <div className="p-6 bg-zinc-50 border border-zinc-100 flex items-center gap-4 shadow-sm">
                                            <div className="flex gap-1.5">
                                                <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1, delay: 0 }} className="w-2 h-2 bg-[#896b6b] rounded-full" />
                                                <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-2 h-2 bg-[#896b6b] rounded-full" />
                                                <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-2 h-2 bg-[#896b6b] rounded-full" />
                                            </div>
                                            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-400">Neural Sync in Progress...</span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>

                    {/* Quick Actions & Input Area */}
                    <div className="p-8 md:px-12 border-t border-dashed border-zinc-200 bg-white">
                        <div className="max-w-5xl mx-auto w-full space-y-6">
                            {/* Quick Questions Row */}
                            <div className="flex flex-wrap gap-4">
                                {quickQuestions.map((q) => (
                                    <button
                                        key={q.id}
                                        onClick={() => handleQuickAction(q)}
                                        className="px-4 py-2 border border-dashed border-zinc-300 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 hover:border-rose-800 hover:text-rose-800 hover:bg-rose-50/30 transition-all duration-300"
                                    >
                                        {q.label}
                                    </button>
                                ))}
                            </div>

                            <form onSubmit={handleSend} className="relative group">
                                <input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    disabled={isLoading}
                                    placeholder={isLoading ? "Neural processor calculating..." : "Direct interface query..."}
                                    className="w-full bg-zinc-50 border border-dashed border-zinc-200 p-5 pr-20 outline-none focus:border-rose-800 focus:bg-white transition-all duration-500 font-light text-zinc-800 disabled:opacity-50 text-base"
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading || !input.trim()}
                                    className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-zinc-400 hover:text-rose-800 transition-colors disabled:opacity-0"
                                >
                                    <FiSend size={24} />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

