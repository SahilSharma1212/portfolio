'use client'
import HeroSection from './_components/HeroSection'
import Navbar from './_ui/Navbar'
import { useThemeStore } from '@/store/themeStore'

export default function page() {
  const { theme } = useThemeStore();
  return (

    <div className={`${theme === 'light' ? 'bg-white bg-grid-light' : 'bg-black bg-grid'} `}>
      <div className='relative chat-container max-w-3xl mx-auto'>
        <Navbar />
        <HeroSection />
      </div>
    </div>
  )
}
