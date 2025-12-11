import React from 'react'
import HeroSection from './_components/HeroSection'
import EducationalDetails from './_components/EducationalDetails'
import AboutSection from './_components/AboutSection'
import SkillsKeyboard from './_components/SkillsSection'
import ProjectSection from './_components/ProjectSection'
import ContactSection from './_components/ContactSection'
import BottomSideMenu from './_components/BottomSideMenu'
import FooterSection from './_components/Footer'
import Footer from './_components/Footer'

export default function page() {
  return (
    <div className='relative chat-container'>
        <HeroSection/>        

        <EducationalDetails/>

        <AboutSection/>

        <SkillsKeyboard/>

        <h2 className='text-7xl font-serif text-white py-10 text-center'>Projects</h2>

        <ProjectSection/>

        <BottomSideMenu/>
        <ContactSection/>
        <Footer/>
    </div>
  )
}
