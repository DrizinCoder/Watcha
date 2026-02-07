'use client'

import { HomeSection } from "@/components/homeSection/homeSection"
import { Navbar } from "@/components/ui/navbar/navbar"
import { Sidebar } from "@/components/ui/sidebar/sidebar"
import { UploadSection } from "@/components/uploadSection/uploadSection"
import { useState } from "react"

export default function Home() {
  const [activeSection, setActiveSection] = useState('home')

  const renderSection = () => {
    switch(activeSection) {
      case 'home':
        return <HomeSection />
      case 'upload':
        return <UploadSection />
      default:
        return <div className="text-zinc-500 p-10 text-center">Em breve...</div>
    }
  }
  
  return (
    <div className="flex flex-col h-screen bg-[#0a0a0a]">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        <main className="flex-1 overflow-y-auto bg-[#0a0a0a] p-8">
          {renderSection()}
        </main>
      </div>
    </div>
  )
}

  