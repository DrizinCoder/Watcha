'use client'

import { Search } from "lucide-react"
import { Input } from "../input/input"

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-black border-b border-zinc-800 sticky top-0 z-50">
      <div className="text-red-600 font-bold text-2xl tracking-tighter">WATCHA</div>
      
      <div className="flex-1 max-w-md mx-8 relative">
        <Input placeholder="Buscar vídeos..." />
        <Search className="absolute right-3 top-2.5 text-zinc-500 w-5 h-5" />
      </div>

      <div className="flex gap-4">
        <div className="w-10 h-10 rounded-full bg-linear-to-tr from-red-600 to-purple-600" />
      </div>
    </nav>
  )
}