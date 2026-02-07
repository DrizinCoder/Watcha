import Link from "next/link"
import { VideoCard } from "../ui/videoCard/videoCard"
import { useEffect, useState } from "react"
import { videoService } from "@/services/api"

interface VideoProps {
  id: string;
  title: string;
  thumb: string;
}

export const HomeSection = () => {
    const [videos, setVideos] = useState([])

    useEffect(() => {
      videoService.getAll().then(data => setVideos(data)).catch(err => console.error("Back-end ainda tá off", err))
    }, [])

    return (
    <div className="p-8">
        <h2 className="text-xl font-semibold mb-6">Recomendados para você</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((video:VideoProps)  => (
            <Link href={`/watch/${video.id}`} key={video.id}>
              <VideoCard 
                title={video.title}
                thumbnail={video.thumb}
              />
            </Link>
          ))}
        </div>
    </div>
  
    )
}