'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { BiSolidFoodMenu } from 'react-icons/bi'
import { RiRobot2Line } from 'react-icons/ri'
import { TbHorseToy } from 'react-icons/tb'

export default function BottomSideMenu() {
  const [menuVisible, setMenuVisible] = useState(false)
  
  const [isClicked, setisClicked] = useState(false);
  
  return (
    <div className='fixed bottom-5 right-5 flex flex-col items-end z-50 '>
      

      {/* Submenu */}
      <div 
        className={`mb-2 bg-[#111] text-white gap-3 border border-white/30 shadow-lg flex flex-col items-center rounded-full transition ${
          !menuVisible ? 'h-0 p-0 overflow-hidden border-none' : 'p-2 py-3'
        }`}
      >
        <Link href='/playground' className='p-3 hover:bg-white/5 hover:text-green-500 rounded-full'><TbHorseToy size={20}/></Link>
        <Link href='/chatbot' className='p-3 hover:bg-white/5  hover:text-sky-500 rounded-full'><RiRobot2Line size={20} /></Link>
      </div>

      {/* Menu Button */}
      <button
        className='p-4 rounded-full bg-[#111] hover:bg-[#222] cursor-pointer text-white border border-white/30 transition'
        onClick={() =>{
            setMenuVisible(!menuVisible)
            if(isClicked === false){
              setisClicked(true);
            }
          }}
      >
        <BiSolidFoodMenu size={20} className={`${!isClicked && 'animate-ping'}`}/>
      </button>
    </div>
  )
}