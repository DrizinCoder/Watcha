'use client'
import { useParams } from 'next/navigation'
import { Navbar } from '@/components/ui/navbar/navbar'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { videoService } from '@/services/api'
import { stringify } from 'querystring'

interface VideoProps {
  id: string;
  title: string;
  description: string;
}


export default function WatchVideo() {
  const [video, setVideo] = useState<VideoProps | null>(null)
  
  const params = useParams()
  const videoId = params.id as string

  useEffect(() => {
        videoService.getById(videoId).then(data => {
          if (data.videos && data.videos.length > 0) {
            setVideo(data.videos[0]);
          } else {
            setVideo(data); 
          }
        }).catch(err => console.error("Erro ao carregar vídeo:", err));;
  }, [videoId])

  const videoUrl = `http://localhost:3030/api/video/${videoId}/play`

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      
      <main className="max-w-6xl mx-auto p-4 lg:p-8">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-zinc-400 hover:text-white mb-6 transition-colors w-fit"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar para a galeria</span>
        </Link>
        <div className="bg-black rounded-2xl overflow-hidden shadow-2xl border border-zinc-800 aspect-video">
          <video 
            src={videoUrl}
            controls 
            className="w-full h-full"
            preload="metadata"
          />
        </div>
        <div className="mt-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Reproduzindo: {video?.title}
          </h1>
          <div className="flex items-center gap-4 mt-4">
            <div>
              <p className="font-medium">{video?.description}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}