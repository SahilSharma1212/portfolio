'use client'
import { useThemeStore } from '@/store/themeStore'
import { Toaster } from 'react-hot-toast'
import dynamic from 'next/dynamic'
import Navbar from './_ui/Navbar'

const Landing = dynamic(() => import('./_components/Landing'), { ssr: false })
const Details = dynamic(() => import('./_components/Details'), { ssr: false })
const Skills = dynamic(() => import('./_components/Skills'), { ssr: false })
const Projects = dynamic(() => import('./_components/Projects'), { ssr: false })
const Contacts = dynamic(() => import('./_components/Contacts'), { ssr: false })

export default function page() {
    const { theme } = useThemeStore();
    return (

        <div className={`${theme === 'light' ? 'bg-white custom-scrollbar-light' : 'bg-[#070707] custom-scrollbar'} p-0 max-w-screen overflow-hidden`}>

            <Landing />
            <Details />
            <Skills />
            <Projects />
            <Contacts />
            <Toaster toastOptions={{
                style: {
                    backgroundColor: theme === 'light' ? '#ffffff' : '#000000',
                    color: theme === 'light' ? '#000000' : '#ffffff',
                    border: theme === 'light' ? '1px solid #00000030' : '1px solid #ffffff30',
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0,
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                }
            }} />
            <Navbar />
        </div>
    )
}
