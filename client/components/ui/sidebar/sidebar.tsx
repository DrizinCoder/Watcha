'use client'
import { Home, Compass, Clock, Heart, UploadCloud } from "lucide-react"

const menuItems = [
  { id: 'home', label: 'Início', icon: Home },
  { id: 'explore', label: 'Explorar', icon: Compass },
  { id: 'favorites', label: 'Favoritos', icon: Heart },
  { id: 'history', label: 'Histórico', icon: Clock },
  { id: 'upload', label: 'Upload', icon: UploadCloud },
]

export const Sidebar = ({ activeSection, setActiveSection }: any) => {
  return (
    <aside className="w-64 bg-black border-r border-zinc-800 p-4 hidden md:flex flex-col gap-2">
      {menuItems.map((item) => {
        const Icon = item.icon
        const isActive = activeSection === item.id

        return (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`flex items-center gap-4 px-4 py-3 rounded-lg font-medium transition-all ${
              isActive 
                ? "bg-linear-to-r from-pink-500/10 to-purple-600/10 text-purple-500 border border-purple-500/20" 
                : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? "text-purple-500" : ""}`} />
            {item.label}
          </button>
        )
      })}
    </aside>
  )
}