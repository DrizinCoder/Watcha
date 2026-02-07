'use client'

import { Search } from "lucide-react"
import { Input } from "../input/input"

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-black border-b border-zinc-800 sticky top-0 z-50">
        <div className="text-3xl font-black tracking-tighter bg-linear-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            WATCHA
        </div>
        
        <div className="flex-1 max-w-md mx-8 relative">
            <Input placeholder="Buscar vídeos..." />
            <Search className="absolute right-3 top-2.5 text-zinc-500 w-5 h-5" />
        </div>

        <div className="flex gap-4">
            <div 
                className="w-10 h-10 bg-linear-to-tr from-pink-500 to-purple-600"
                style={{ clipPath: 'polygon(0% 0%, 0% 100%, 100% 50%)' }}
            />
        </div>
    </nav>
  )
}