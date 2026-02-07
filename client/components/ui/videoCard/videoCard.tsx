'use client'

interface VideoCardProps {
    title: string;
    thumbnail: string;
}

export const VideoCard = ({title, thumbnail}: VideoCardProps) => {
    return (
        <div 
            className="group cursor-pointer rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-purple-500/50 hover:scale-105 transition-all duration-300 shadow-lg"
            >
            <div className="relative aspect-video overflow-hidden">
                <img 
                    src={thumbnail} 
                    alt={title} 
                    className="w-full h-full object-cover group-hover:opacity-80 transition-opacity" 
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div 
                        className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                        style={{ clipPath: 'circle(50% at 50% 50%)' }}
                    >
                        <div 
                            className="w-4 h-4 bg-white"
                            style={{ clipPath: 'polygon(0% 0%, 0% 100%, 100% 50%)' }}
                        />
                    </div>
                </div>
            </div>

            <div className="p-4">
                <h3 className="text-zinc-200 font-semibold truncate group-hover:bg-linear-to-r group-hover:from-pink-500 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                    {title}
                </h3>
                <p className="text-xs text-zinc-500 mt-1">Assistir agora</p>
            </div>
        </div>
    )
}