'use client'
import HeroSection from './_components/HeroSection'
import Navbar from './_ui/Navbar'
import { useThemeStore } from '@/store/themeStore'
import MouseFollower from './_components/MouseFollower'
import { Toaster } from 'react-hot-toast'
export default function page() {
  const { theme } = useThemeStore();
  return (

    <div className={`${theme === 'light' ? 'bg-white bg-grid-light' : 'bg-black bg-grid'} `}>
      <div className='relative chat-container max-w-3xl mx-auto'>
        <Navbar />
        <HeroSection />
        <MouseFollower />
        <Toaster toastOptions={{
          style: {
            backgroundColor: theme === 'light' ? '#ffffff' : '#000000',
            color: theme === 'light' ? '#000000' : '#ffffff',
            border: theme === 'light' ? '1px solid #00000030' : '1px solid #ffffff30'
          }
        }} />
      </div>
    </div>
  )
}
