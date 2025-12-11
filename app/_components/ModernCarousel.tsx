'use client'
import { motion } from 'motion/react'
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Code, PenTool, Brain, Lightbulb, Users, Copy } from "lucide-react";
const arr = [-2, -1, 0, 1, 2];

const cardData = [
  { title: "Full-Stack Dev", content: "I build scalable web apps with clean code.", icon: Code },
  { title: "UI/UX Designer", content: "I design intuitive and beautiful interfaces.", icon: PenTool },
  { title: "ML Learner", content: "I am learning machine learning and AI concepts.", icon: Brain },
  { title: "Problem Solver", content: "I love tackling complex challenges efficiently.", icon: Lightbulb },
  { title: "Team Player", content: "I collaborate effectively and communicate clearly.", icon: Users },
];

const rotationsArr = [12, -7, 0, -9, 10]

const notify = () => toast('Code Copied',{
  style:{
    border:'1px solid #ffffff20',
    backgroundColor:'#222',
    color:'white'
  }
});

const copyText = `

const copyText = 'use client'
import { motion } from 'motion/react'
import { useState } from 'react';

import { Code, PenTool, Brain, Lightbulb, Users, Copy } from "lucide-react";

const arr = [-2, -1, 0, 1, 2];

const cardData = [
  { title: "Full-Stack Dev", content: "I build scalable web apps with clean code.", icon: Code },
  { title: "UI/UX Designer", content: "I design intuitive and beautiful interfaces.", icon: PenTool },
  { title: "ML Learner", content: "I am learning machine learning and AI concepts.", icon: Brain },
  { title: "Problem Solver", content: "I love tackling complex challenges efficiently.", icon: Lightbulb },
  { title: "Team Player", content: "I collaborate effectively and communicate clearly.", icon: Users },
];

const rotationsArr = Array.from({ length: 5 }, () =>
  Math.floor(Math.random() * 30 - 15)
);


export default function AboutCardSection() {

  // activeIndex tracks which card is currently centered/active (0 to 4)
  const [activeIndex, setActiveIndex] = useState(2);

  return (
    <>
      <div className="h-[80vh] relative overflow-hidden flex items-center justify-center">

        {/* --- Card Stack Mapping --- */}
        {arr.map((num, idx) => {
          // 'flipped' index maps the card data correctly:
          // arr index 0 maps to card index 4
          // arr index 4 maps to card index 0
          const flipped = 4 - idx;
          const isActive = activeIndex === flipped;

          const Icon = cardData[flipped].icon;

          // The motion.div for each card
          return (
            <motion.div
              key={idx}
              className="absolute h-[300px] w-[280px] rounded-xl bg-[#222] shadow-2xl
              -translate-x-1/2 -translate-y-1/2 transition-all max-sm:scale-90 cursor-pointer"
              style={{
                // Dynamic positioning based on the current card's position (num) and the active card's position (arr[activeIndex])
                top: \`\${50 + num * 10 + arr[activeIndex] * 10}%\`,
                left: \`\${50 - num * 10 - arr[activeIndex] * 10}%\`,
                
                // Rotates inactive cards randomly, active card has 0 rotation
                rotate: isActive ? 0 : \`\${rotationsArr[idx]}deg\`,
                
                // Opacity reduces for cards further from the active one
                opacity: isActive ? 1 : (1 - Math.abs(activeIndex - flipped) * 0.49),
                
                // Scale is slightly larger for the active card
                scale: isActive ? 1.05 : 0.9,
                
                // Active card is on top (higher zIndex)
                zIndex: isActive ? 50 : 0,
                
                // Ensures the card is centered correctly regardless of its position
                transform: \`translate(-50%, -50%) scale(\${isActive ? 1.05 : 0.9})\`
              }}
              onClick={() => setActiveIndex(flipped)}
            >
              {/* Card Content */}
              <div className="p-5 text-white flex flex-col items-center justify-center h-full gap-4 text-center pointer-events-none">
                <Icon className="w-10 h-10 text-white opacity-90" />
                <h2 className="text-3xl font-bold font-serif">
                  {cardData[flipped].title}
                </h2>
                <p className="text-base mt-2 opacity-80 font-serif">
                  {cardData[flipped].content}
                </p>
              </div>

            </motion.div>
          )
        })}

        {/* --- Copy Button --- */}
        <button
          onClick={() => navigator.clipboard.writeText(copyText)}
          className='text-white bg-[#222] p-2 border border-white/20 flex items-center justify-center gap-2 top-5 right-5 absolute z-60 hover:bg-white/10 transition-colors'
        >
          Copy Code <Copy strokeWidth={1} />
        </button>

      </div>

      {/* --- Navigation Buttons --- */}
      <div className='flex items-center justify-center py-10 gap-4'>

        <button
          onClick={() => {
            if (activeIndex > 0) {
              setActiveIndex(activeIndex - 1);
            }
          }}
          disabled={activeIndex <= 0}
          className='bg-[#333] text-white border-white/30 border px-5 py-2 rounded-md disabled:opacity-50 hover:bg-[#444] transition-colors'>
          Prev
        </button>
        <button
          onClick={() => {
            if (activeIndex < 4) {
              setActiveIndex(activeIndex + 1);
            }
          }}
          disabled={activeIndex >= 4}
          className='bg-[#333] text-white border-white/30 border px-5 py-2 rounded-md disabled:opacity-50 hover:bg-[#444] transition-colors'>
          Next
        </button>
      </div>
    </>
  )
}
`

export default function AboutCardSection() {

  const [activeIndex, setActiveIndex] = useState(2);

  return (
    <>
      <div className="h-[80vh] relative overflow-hidden">

        {arr.map((num, idx) => {
          const flipped = 4 - idx;
          const isActive = activeIndex === flipped;

          const Icon = cardData[flipped].icon;

          return (
            <motion.div
              key={idx}
              className="absolute h-50 w-70 rounded-xl bg-[#222] shadow-2xl
            -translate-x-1/2 -translate-y-1/2 transition-all max-sm:scale-90"
              style={{
                top: `${50 + num * 10 + arr[activeIndex] * 10}%`,
                left: `${50 - num * 10 - arr[activeIndex] * 10}%`,
                rotate: isActive ? 0 : `${rotationsArr[idx]}deg`,
                opacity: isActive ? 1 : (1 - Math.abs(activeIndex - flipped) * 0.49),
                scale: isActive ? 1 : 0.9,
                zIndex: isActive ? 50 : 0,
                transform: `translate(-50%, -50%) scale(${isActive ? 1.05 : 1})`
              }}
              onClick={() => setActiveIndex(flipped)}
            >

              <div className="p-5 text-white flex flex-col items-center justify-center h-full gap-4 text-center pointer-events-none">

                <Icon className="w-10 h-10 text-white opacity-90" />

                <h2 className="text-3xl font-bold font-serif">
                  {cardData[flipped].title}
                </h2>

                <p className="text-base mt-2 opacity-80 font-serif">
                  {cardData[flipped].content}
                </p>

              </div>

            </motion.div>
          )
        })}

        <button
          onClick={() => {
            navigator.clipboard.writeText(copyText)
            notify();
          }}
          className='text-white bg-[#222] p-2 border border-white/20 flex items-center justify-center gap-2 top-5 right-5 absolute cursor-pointer hover:bg-[#333] rounded-md'

        >
          <span className='max-sm:hidden'>Code</span>
          <Copy strokeWidth={1} />
        </button>

        <button
          onClick={() => {
            window.history.back();
          }}
          className='text-white bg-[#222] p-2 border border-white/20 flex items-center justify-center gap-2 top-5 left-5 absolute cursor-pointer hover:bg-[#333] rounded-md'

        >
          {'<'}
          <span className='max-sm:hidden'>Back</span>
          
        </button>

      </div>

      <div className='flex items-center justify-center py-10 gap-4'>

        <button
          onClick={() => {
            if (activeIndex > 0) {
              setActiveIndex(activeIndex - 1);
            }
          }}
          disabled={activeIndex <= 0}
          className={`bg-[#333] text-white border-white/30 border px-5 py-2 rounded-md cursor-pointer hover:bg-[#222] ${activeIndex <= 0 && 'hidden'}`}>
          Prev
        </button>
        <button
          onClick={() => {
            if (activeIndex < 4) {
              setActiveIndex(activeIndex + 1);
            }
          }}
          disabled={activeIndex >= 4}
          className={`bg-[#333] text-white border-white/30 border px-5 py-2 rounded-md cursor-pointer hover:bg-[#222] ${activeIndex >= 4 && 'hidden'}`}>
          Next
        </button>
      </div>
      <Toaster/>
    </>
  )
}
