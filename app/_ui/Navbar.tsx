'use client'

import Link from "next/link";
import { memo } from "react";
import { useThemeStore } from "@/store/themeStore";

import { FaGithub, FaLinkedin, FaRobot, FaFileAlt, FaSun, FaMoon } from "react-icons/fa";
import { LuBlocks, LuLibrary } from "react-icons/lu";

const navbarOptions = [
  { name: <LuLibrary size={20} />, link: '/components', hoverText: 'Components' },
  { name: <FaGithub size={20} />, link: 'https://github.com/SahilSharma1212', hoverText: 'GitHub' },
  { name: <FaLinkedin size={20} />, link: 'https://www.linkedin.com/in/sahil-sharma-822a752a9/', hoverText: 'LinkedIn' },
  {
    name: (
      <FaFileAlt size={20}
        onClick={() => {
          const link = document.createElement('a');
          link.href = '/Sahil_Sharma_Fullstack_Resume.pdf';
          link.download = 'Sahil_Sharma_Resume.pdf';
          link.click();
        }}
      />
    ),
    link: '#',
    hoverText: 'Download Resume'
  },
  { name: <FaRobot size={20} />, link: '/chatbot', hoverText: 'Chatbot' },
];

function NavbarComponent() {

  const { theme, setTheme } = useThemeStore();

  return (
    <nav
      className={`p-2 max-w-md fixed top-5 left-1/2 -translate-x-1/2 -translate-y-3 
      ${theme === 'dark'
          ? 'bg-black text-white border border-neutral-800'
          : 'bg-white text-black border border-neutral-200'}
      z-50 shadow-2xl shadow-black`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">

          {navbarOptions.map((option, index) => (
            <Link
              key={index}
              href={option.link}
              target={option.link.startsWith('http') ? '_blank' : '_self'}
              className="text-sm font-medium hover:mx-3 transition-all duration-300 hover:bg-white/10 rounded-full cursor-pointer p-2 relative group"
            >
              {option.name}

              <span
                className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs px-2 py-1 rounded-md text-center
                ${theme === 'dark'
                    ? 'bg-white text-black'
                    : 'bg-black text-white'}`}
              >
                {option.hoverText}
              </span>
            </Link>
          ))}

          {theme === 'light' ? (
            <div className="text-sm font-medium hover:mx-3 transition-all duration-300 hover:bg-white/10 rounded-full cursor-pointer p-2">
              <FaSun onClick={() => setTheme('dark')} size={18} />
            </div>
          ) : (
            <div className="text-sm font-medium hover:mx-3 transition-all duration-300 hover:bg-white/10 rounded-full cursor-pointer p-2">
              <FaMoon onClick={() => setTheme('light')} size={18} />
            </div>
          )}

        </div>
      </div>
    </nav>
  );
}

export default memo(NavbarComponent);

