'use client'

import About from "./_components/About";
import Skills from "./_components/Skills";
import Hero from "./_components/Hero";
import Navbar from "./_components/Navbar";
import Projects from "./_components/Projects";
import Showcase from "./_components/Showcase";
import Contact from "./_components/Contact";
import Footer from "./_components/Footer";


export default function Home() {


  return (
    <div className="bg-[#fffafb] w-screen relative ">
      <Navbar />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Showcase />
        <Contact />

      </main>

      <Footer />
    </div>



  );
}