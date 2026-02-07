'use client'

import { Navbar } from "@/components/ui/navbar/navbar"
import { VideoCard } from "@/components/ui/videoCard/videoCard"

export default function Home() {
  const videos = [
    { id: '1', title: 'Aventura nas Montanhas', thumb: 'https://picsum.photos/seed/1/400/225' },
    { id: '2', title: 'Review Tecnológico', thumb: 'https://picsum.photos/seed/2/400/225' },
    { id: '3', title: 'Culinária 5 Estrelas', thumb: 'https://picsum.photos/seed/3/400/225' },
  ]

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-zinc-100">
      <Navbar />
      
      <div className="p-8">
        <h2 className="text-xl font-semibold mb-6">Recomendados para você</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map(video => (
            <VideoCard 
              key={video.id}
              title={video.title}
              thumbnail={video.thumb}
              onClick={() => console.log('Abrir vídeo', video.id)}
            />
          ))}
        </div>
      </div>
    </main>
  )
}