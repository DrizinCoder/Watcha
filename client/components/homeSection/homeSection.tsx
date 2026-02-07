import Link from "next/link"
import { VideoCard } from "../ui/videoCard/videoCard"

const videos = [
    { id: '1', title: 'Aventura nas Montanhas', thumb: 'https://picsum.photos/seed/1/400/225' },
    { id: '2', title: 'Review Tecnológico', thumb: 'https://picsum.photos/seed/2/400/225' },
    { id: '3', title: 'Culinária 5 Estrelas', thumb: 'https://picsum.photos/seed/3/400/225' },
  ]

export const HomeSection = () => {
    return (
    <div className="p-8">
        <h2 className="text-xl font-semibold mb-6">Recomendados para você</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map(video => (
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