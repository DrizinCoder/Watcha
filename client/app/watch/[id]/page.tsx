'use client'
import { useParams } from 'next/navigation'
import { Navbar } from '@/components/ui/navbar/navbar'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function WatchVideo() {
  const params = useParams()
  const videoId = params.id

  const videoUrl = `http://localhost:4000/video/${videoId}`

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      
      <main className="max-w-6xl mx-auto p-4 lg:p-8">
        {/* Botão de Voltar */}
        <Link 
          href="/" 
          className="flex items-center gap-2 text-zinc-400 hover:text-white mb-6 transition-colors w-fit"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar para a galeria</span>
        </Link>

        {/* Player de Vídeo */}
        <div className="bg-black rounded-2xl overflow-hidden shadow-2xl border border-zinc-800 aspect-video">
          <video 
            src={videoUrl} 
            controls 
            autoPlay 
            className="w-full h-full"
          />
        </div>

        {/* Detalhes do Vídeo */}
        <div className="mt-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Reproduzindo: {videoId}
          </h1>
          <div className="flex items-center gap-4 mt-4">
            <div>
              <p className="font-medium">Descrição do vídeo aqui</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}