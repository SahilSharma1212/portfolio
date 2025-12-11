'use client'

import { PhoneCall } from "lucide-react";
import Link from "next/link";
import { useState, memo } from "react"

const navbarOptions = [
  { name: 'Home', link: '#home' },
  { name: 'About', link: '#about' },
  { name: 'Skills', link: '#skills' },
  { name: 'Projects', link: '#projects' },
]

function NavbarComponent() {
  const [selected, setSelected] = useState('Home');

  return (
    <nav className="fixed top-0 w-full flex justify-center gap-4 p-4 z-50 max-sm:scale-90">

      

      {/* Middle Nav */}
      <div className="cardgraybg px-8 py-3 flex gap-6 text-center text-white rounded-xl border border-[#454545] backdrop-blur-2xl shadow-lg max-md:px-3 max-md:gap-2 max-sm:px-1">
        {navbarOptions.map((item) => (
          <button
            key={item.name}
            onClick={() => setSelected(item.name)}
            className={`
              px-4 max-md:px-3 py-2 rounded-lg transition-all duration-200
              ${selected === item.name 
                ? "bg-white/15 text-white font-semibold shadow-inner" 
                : "text-gray-300 hover:text-gray-200"}
            `}
          >
            <a href={item.link}>{item.name}</a>
          </button>
        ))}
      </div>

      {/* Right Contact */}
      <Link href={'#contact'} className="
        bg-white flex items-center justify-center px-6 py-4 
        text-black rounded-xl border border-[#454545] backdrop-blur-2xl shadow-lg max-md:px-2 hover:bg-[#eee]
      ">
        <span className="hidden sm:block font-semibold tracking-wide">Contact</span>
        <PhoneCall className="sm:hidden h-5 w-5 opacity-90" />
      </Link>

    </nav>
  );
}

export default memo(NavbarComponent);
