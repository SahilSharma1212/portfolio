'use client'

import { Blocks, Bot, Github, Linkedin, MoonIcon, NotepadText, SunIcon } from "lucide-react";
import Link from "next/link";
import { memo } from "react"
import { useThemeStore } from "@/store/themeStore";

const navbarOptions = [
  { name: <Blocks strokeWidth={1} />, link: '/playground', hoverText: 'Playground' },
  { name: <Github strokeWidth={1} />, link: 'https://github.com/SahilSharma1212', hoverText: 'GitHub' },
  { name: <Linkedin strokeWidth={1} />, link: 'https://www.linkedin.com/in/sahil-sharma-822a752a9/', hoverText: 'LinkedIn' },
  {
    name: <NotepadText strokeWidth={1} onClick={() => {
      const link = document.createElement('a');
      link.href = '/Sahil_Sharma_Fullstack_Resume.pdf';
      link.download = 'Sahil_Sharma_Resume.pdf';
      link.click();
    }} />, link: '#', hoverText: 'Download Resume'
  },
  { name: <Bot strokeWidth={1} />, link: '/chatbot', hoverText: 'Chatbot' },
]

function NavbarComponent() {

  const { theme, setTheme } = useThemeStore();
  return (
    <nav className={`p-2 rounded-full max-w-md fixed bottom-0 left-1/2 -translate-x-1/2 -translate-y-3 ${theme === 'dark' ? 'bg-black text-white border border-gray-800' : 'bg-white text-black border border-gray-200'} z-50 shadow-2xl shadow-black`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {navbarOptions.map((option, index) => (
            <Link
              key={index}
              href={option.link}
              target={option.link.startsWith('http') ? '_blank' : '_self'}
              className={`text-sm font-medium hover:mx-3 hover:-translate-y-2 hover:scale-110 transition-all duration-300 hover:bg-white/10 rounded-full cursor-pointer p-2 relative group`}
            >
              {option.name}
              <span className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs px-2 py-1 rounded-md text-center ${theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'}`}>
                {option.hoverText}
              </span>
            </Link>
          ))}
          {
            theme === 'light' ? (
              <div className="text-sm font-medium hover:mx-3 hover:-translate-y-2 hover:scale-110 transition-all duration-300 hover:bg-white/10 rounded-full cursor-pointer p-2">
                <SunIcon onClick={() => setTheme('dark')} strokeWidth={1} size={20} />
              </div>
            ) : (
              <div className="text-sm font-medium hover:mx-3 hover:-translate-y-2 hover:scale-110 transition-all duration-300 hover:bg-white/10 rounded-full cursor-pointer p-2">
                <MoonIcon onClick={() => setTheme('light')} strokeWidth={1} size={20} />
              </div>
            )
          }
        </div>
      </div>
    </nav>
  );
}

export default memo(NavbarComponent);
