'use client'
import Image from 'next/image'
import { memo } from 'react'
import { motion } from 'motion/react'
import SwappingTexts from './SwappingTexts'


function ProfileCards() {

    return (
        <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="relative w-full md:w-5/12 flex items-center justify-center px-10 max-md:mt-10 max-md:scale-95 max-sm:scale-90 h-120 ">

            {/* Back Card */}
            <motion.div
                initial={{ x: 40, y: 30, opacity: 0.5, rotate: 45 }}
                animate={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
                className="
      absolute top-10 left-24 max-md:left-15
      w-95 h-105
      rounded-2xl border border-[#3f3f3f]
      cardgraybg backdrop-blur-xl
      shadow-[0_0_40px_rgba(0,0,0,0.3)]
      rotate-[-4deg]

      max-sm:hidden
      "
            />


            {/* Front Card */}
            <div
                className="
      w-95 h-105
      rounded-2xl border border-[#555555]
      cardgraybg backdrop-blur-xl
      shadow-[0_0_50px_rgba(0,0,0,0.4)]
      rotate-2 relative z-10 overflow-visible
      flex flex-col items-center p-6 gap-4 
      max-sm:rotate-0 
    "
            >

                {/* Image */}
                <div className="w-60 h-70 rounded-xl overflow-hidden border border-[#444]">
                    <Image
                        src="/linkedinimage.jpg"
                        alt="profile"
                        width={200}
                        height={200}
                        className="object-cover w-full h-full"
                    />
                </div>

                {/* Name */}
                <h2 className="text-xl font-semibold text-white tracking-wide">
                    Sahil Sharma
                </h2>

                {/* Title */}
                <div className="text-gray-300 h-10 text-sm tracking-wide">
                    <SwappingTexts />
                </div>

                {/* Short line */}
                <p className="text-gray-400 text-center text-sm px-4">
                    Building clean products with code, pixels, and patience.
                </p>

            </div>

        </motion.div>
    )
}

export default memo(ProfileCards);
